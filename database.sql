CREATE TABLE users (
id serial PRIMARY KEY,
name varchar(255) NOT NULL,
email varchar(255) NOT NULL UNIQUE,
password varchar(255) NOT NULL,
bio text,
location text,
applications int,
 );

CREATE TABLE jobApplications (
id serial PRIMARY KEY,
job_id integer NOT NULL REFERENCES jobs (id) ON DELETE CASCADE,
user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
 );

CREATE TABLE savedJobs (
id serial PRIMARY KEY,
job_id integer NOT NULL REFERENCES jobs (id) ON DELETE CASCADE,
user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
 );

CREATE TABLE employers (
id serial PRIMARY KEY,
contact_name varchar(255) NOT NULL,
contact varchar NOT NULL,
email varchar(255) NOT NULL UNIQUE,
password varchar(255) NOT NULL,
businessName varchar(255) NOT NULL,
bio text,
NoOfJobs int,
client_reviews text,
employee_reviews int
 );

CREATE TABLE companyReview (
id serial PRIMARY KEY,
review text NOT NULL,
rating int NOT NULL,
user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
employer_id integer NOT NULL REFERENCES employers (id) ON DELETE CASCADE
 );
 

CREATE TABLE jobs (
id serial PRIMARY KEY,
title varchar(255) NOT NULL,
description text NOT NULL,
pay varchar,
time timestamp,
industry varchar(255),
location varchar(255),
closingDate date
employer_id integer NOT NULL REFERENCES employers (id) ON DELETE CASCADE
 );

ALTER TABLE jobs
ADD level varchar;

CREATE TABLE applicants (
id serial PRIMARY KEY,
experience text NOT NULL,
expectedPay varchar,
job_id integer NOT NULL REFERENCES employers (id) ON DELETE CASCADE
user_id integer NOT NULL REFERENCES employers (id) ON DELETE CASCADE
 );

CREATE TABLE jobQn (
id serial PRIMARY KEY,
questions varchar NOT NULL,
job_id integer NOT NULL REFERENCES jobs (id) ON DELETE CASCADE
 );

CREATE TABLE jobAns (
id serial PRIMARY KEY,
answers varchar NOT NULL,
jobQn_id integer NOT NULL REFERENCES jobQn (id) ON DELETE CASCADE
 );

