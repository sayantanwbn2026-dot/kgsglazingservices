-- Social links for the footer, editable from the CMS (Admin → Footer).
-- Empty string = icon hidden on the site, so these are safe to leave blank.
alter table public.footer add column if not exists instagram_url text not null default '';
alter table public.footer add column if not exists facebook_url  text not null default '';

-- Let PostgREST pick up the new columns immediately.
notify pgrst, 'reload schema';
