CREATE DATABASE apartments;

CREATE DATABASE apartments
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

create table main_apartments(
    apt_id serial primary key,
    building_name TEXT not null,
    apt_number text not null,
    total_rooms integer
);

create table rooms(
    room_id serial primary key,
    apt_id serial references main_apartments(apt_id),
    room_number text not null,
    room_type text,
    capacity integer
);

create table tenants(
    tenant_id text primary key,
    room_id serial references rooms(room_id),
    name text not null,
    emirates_id text not null,
    phone_number integer not null,
    email text,
    assigned_monthly_rent integer not null,
    date_settle_in text
);

create table rent_payments(
    payment_id text primary key,
    tenant_id text references tenants(tenant_id),
    month_year text not null,
    amount_paid integer not null,
    amount_due integer,
    notes text
);

create table apartment_expenses(
    expense_id serial primary key,
    apt_id serial references main_apartments(apt_id),
    month_year text not null,
    amount_paid integer not null,
    notes text
);

create table monthly_reports(
    report_id text primary key,
    apt_id serial references main_apartments(apt_id),
    month_year text not null,
    total_rent_due integer not null,
    total_rent_paid integer not null,
    total_expenses integer not null
);

-- TODO: make the apartment_history table

insert into main_apartments (building_name, apt_number, total_rooms)
values ('الاتحاد', 602, 5);

insert into tenants (tenant_id, room_id, name, emirates_id, phone_number, email, assigned_monthly_rent)
values  ($1, $2, $3, $4, $5, $6, $7)