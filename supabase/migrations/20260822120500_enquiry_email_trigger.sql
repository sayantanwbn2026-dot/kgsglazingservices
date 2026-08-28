-- Email every new enquiry to support@kolkataglazing.com — entirely in the database,
-- so it works with the live site as-is (no frontend deploy needed).
-- Uses FormSubmit (https://formsubmit.co) which needs no account or API key.

-- 1) Allow Postgres to make outbound HTTP calls (safe to re-run).
create extension if not exists pg_net;

-- 2) On each new enquiry, POST it to FormSubmit. Best-effort: any failure is
--    swallowed so it can never block or fail the enquiry insert itself.
create or replace function public.notify_enquiry_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  begin
    perform net.http_post(
      url := 'https://formsubmit.co/ajax/support@kolkataglazing.com',
      body := jsonb_build_object(
        '_subject',
          'New enquiry — ' || coalesce(nullif(new.name, ''), 'KGS website')
          || case when coalesce(new.project, '') <> '' then ' · ' || new.project else '' end,
        '_template', 'table',
        '_captcha', 'false',
        'Name', new.name,
        'Organization', new.org,
        'Project type', new.project,
        'Location', new.location,
        'Budget', new.budget,
        'Project brief', new.message
      )
    );
  exception when others then
    null; -- never let an email problem break the enquiry
  end;
  return new;
end;
$$;

-- 3) Fire it on every insert.
drop trigger if exists on_enquiry_created_email on public.enquiries;
create trigger on_enquiry_created_email
  after insert on public.enquiries
  for each row execute function public.notify_enquiry_email();
