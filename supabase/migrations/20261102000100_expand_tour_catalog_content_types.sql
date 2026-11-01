alter table public.tours
 add column if not exists content_type text not null default 'tour',
 add column if not exists country text not null default 'Bénin',
 add column if not exists city text,
 add column if not exists itinerary text,
 add column if not exists inclusions text,
 add column if not exists exclusions text,
 add column if not exists meeting_point text,
 add column if not exists organizer text,
 add column if not exists event_start_date date,
 add column if not exists event_end_date date,
 add column if not exists registration_url text,
 add column if not exists contact_whatsapp text,
 add column if not exists max_capacity integer,
 add column if not exists ticket_price numeric,
 add column if not exists booking_mode text not null default 'request',
 add column if not exists seo_title text,
 add column if not exists seo_description text;
alter table public.tours drop constraint if exists tours_content_type_check;
alter table public.tours add constraint tours_content_type_check check(content_type in ('tour','excursion','experience','festival','event'));
alter table public.tours drop constraint if exists tours_booking_mode_check;
alter table public.tours add constraint tours_booking_mode_check check(booking_mode in ('request','external','information'));
alter table public.tours drop constraint if exists tours_event_dates_check;
alter table public.tours add constraint tours_event_dates_check check(event_end_date is null or event_start_date is null or event_end_date>=event_start_date);
alter table public.tours drop constraint if exists tours_capacity_check;
alter table public.tours add constraint tours_capacity_check check(max_capacity is null or max_capacity>=0);
create index if not exists tours_content_type_status_sort_idx on public.tours(content_type,status,sort_order);
create index if not exists tours_event_dates_idx on public.tours(event_start_date,event_end_date) where content_type in ('festival','event');
