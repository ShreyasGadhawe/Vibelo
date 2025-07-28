DROP DATABASE IF EXISTS vibelo;
create database vibelo;
use vibelo;

create table categories(
    id int primary key auto_increment,
    category_name varchar(255) not null
);

create table genders(
    id int primary key auto_increment,
    gender_name varchar(255) not null
);

insert into genders (gender_name) values ('male'), ('female');

create table address(
    id int primary key auto_increment,
    address_line1 varchar(255) not null,
    city varchar(255) not null,
    state varchar(255) not null,
    zip_code varchar(255) not null,
    country varchar(255) not null
);

create table products(
    id int primary key auto_increment,
    name varchar(255) not null,
    price decimal(10,2) not null,
    description text,
    image_url varchar(255),
    category_id int,
    size_large_quantity int,
    size_medium_quantity int,
    size_small_quantity int,
    gender_id int,
    foreign key (gender_id) references genders(id),
    foreign key (category_id) references categories(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);


create table users(
    id int primary key auto_increment,
    name varchar(255) not null,
    phone_number char(10) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    age int,
    gender_id int,
    address_id int,
    foreign key (gender_id) references genders(id),
    foreign key (address_id) references address(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);


create table orders(
    id int primary key auto_increment,
    user_id int,
    product_id int,
    quantity int,
    total_price decimal(10,2) not null,
    order_date timestamp default current_timestamp,
    foreign key (user_id) references users(id),
    foreign key (product_id) references products(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);