-- Adds brand-aware compare support fields for project popups.
-- Safe to run multiple times.

alter table if exists public.projects
  add column if not exists brand_color text;

alter table if exists public.projects
  add column if not exists before_image text;

-- Optional format guard for hex brand colors.
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'projects_brand_color_hex_check'
  ) then
    alter table public.projects
      add constraint projects_brand_color_hex_check
      check (
        brand_color is null
        or brand_color ~* '^#([0-9A-F]{3}|[0-9A-F]{6})$'
      );
  end if;
end $$;
