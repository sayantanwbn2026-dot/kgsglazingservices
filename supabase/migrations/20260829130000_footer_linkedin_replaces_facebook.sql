-- The footer shows Instagram + LinkedIn (Facebook was dropped).
-- Rename keeps the existing column rather than leaving an orphan behind.
alter table public.footer rename column facebook_url to linkedin_url;

-- The old column held a copy of the Instagram link, which would make the
-- LinkedIn icon point at the wrong place. Clear it so the icon stays hidden
-- until a real LinkedIn URL is set in the CMS.
update public.footer set linkedin_url = '';

notify pgrst, 'reload schema';
