CREATE TABLE users (
id serial PRIMARY KEY,
name varchar NOT NULL,
email varchar NOT NULL UNIQUE,
password varchar NOT NULL,
bio text,
location text,
applications int,
 );

CREATE TABLE jobApplications (
id serial PRIMARY KEY,
job_id integer NOT NULL REFERENCES jobs (id),
user_id integer NOT NULL REFERENCES users (id)
 );

CREATE TABLE savedJobs (
id serial PRIMARY KEY,
job_id integer NOT NULL REFERENCES jobs (id),
user_id integer NOT NULL REFERENCES users (id)
 );

CREATE TABLE employers (
id serial PRIMARY KEY,
contact_name varchar NOT NULL,
contact varchar NOT NULL,
email varchar NOT NULL UNIQUE,
password varchar NOT NULL,
businessName varchar NOT NULL,
bio text,
NoOfJobs int,
client_reviews text,
employee_reviews int
 );

CREATE TABLE companyReview (
id serial PRIMARY KEY,
review text NOT NULL,
rating int NOT NULL,
user_id integer NOT NULL REFERENCES users (id),
employer_id integer NOT NULL REFERENCES employers (id)
 );
 

CREATE TABLE jobs (
id serial PRIMARY KEY,
title varchar NOT NULL,
description text NOT NULL,
pay varchar,
time timestamp,
industry varchar,
location varchar,
closingDate date
employer_id integer NOT NULL REFERENCES employers (id)
 );

CREATE TABLE jobQn (
id serial PRIMARY KEY,
questions varchar NOT NULL,
job_id integer NOT NULL REFERENCES jobs (id)
 );

CREATE TABLE jobAns (
id serial PRIMARY KEY,
answers varchar NOT NULL,
jobQn_id integer NOT NULL REFERENCES jobQn (id)
 );

