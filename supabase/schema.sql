create table if not exists users (
  id uuid primary key,
  email text unique not null
);

create table if not exists net_worth (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  assets numeric not null,
  liabilities numeric not null,
  net_worth numeric not null,
  income numeric not null,
  expenses numeric not null,
  created_at timestamptz not null default now()
);

create table if not exists actions (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  title text not null,
  status text not null default 'todo',
  created_at timestamptz not null default now()
);
