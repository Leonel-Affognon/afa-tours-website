-- Keep each approved visitor submission linked to exactly one public gallery record.
-- The FK is nullable so existing public media remain valid.
alter table public.public_media
  add column if not exists source_submission_id uuid
  references public.media_submissions(id) on delete set null;

create unique index if not exists public_media_source_submission_uidx
  on public.public_media(source_submission_id)
  where source_submission_id is not null;
