-- Add enquirer contact fields so notifications and CMS records are actionable.
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '';
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS phone text NOT NULL DEFAULT '';

-- Recreate the public insert policy so it also bounds the new fields.
DROP POLICY IF EXISTS "public insert enquiries" ON public.enquiries;

CREATE POLICY "public insert enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 200
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
  AND char_length(org) <= 200
  AND char_length(project) <= 200
  AND char_length(location) <= 200
  AND char_length(budget) <= 100
  AND char_length(email) <= 200
  AND char_length(phone) <= 50
);
