alter table public.tours
  add column if not exists video_url text,
  add column if not exists pricing_options jsonb not null default '[]'::jsonb;

alter table public.tours
  drop constraint if exists tours_pricing_options_array_check;
alter table public.tours
  add constraint tours_pricing_options_array_check
  check (jsonb_typeof(pricing_options) = 'array');

create index if not exists tours_vodun_days_slug_idx
  on public.tours (slug)
  where slug = 'vodun-days-2027';
