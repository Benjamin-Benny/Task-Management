# Task-Management

Installation and Setup Guide

Prerequisites

Node.js and npm installed on your system.
Angular CLI installed globally.
Java Development Kit (JDK) installed.
PostgreSQL installed and running on your system.

Frontend Setup

Clone the repository:
bash
git clone https://github.com/Benjamin-Benny/Task-Management.git

Navigate to the frontend directory:
bash
cd Task-Management/frontend

Install dependencies:
bash
npm install

Start the Angular development server:
bash
ng serve

Access the frontend at http://localhost:4200 in your browser.

Backend Setup
Navigate to the backend directory:
bash
cd Task-Management/backend

Import the project into your IDE (e.g., IntelliJ IDEA, Eclipse).

Configure the database connection in application.properties:

properties

spring.datasource.url=jdbc:postgresql://localhost:5432/YOUR_DATABASE_NAME
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD

Run the Spring Boot application.

PostgreSQL Setup
Open your PostgreSQL command line interface.
Connect to your database server:
bash
psql -U YOUR_DATABASE_USERNAME

Create the necessary tables using the provided SQL queries:
sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    completed BOOLEAN DEFAULT FALSE,
    user_id BIGINT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
);

Running the Project
Ensure that both the frontend (Angular) and backend (Spring Boot) servers are running.
Open your web browser and navigate to http://localhost:4200 to access the Task Management application.
