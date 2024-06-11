# Task-Management

The Task Management application is an application implementing CRUD operations basically providing features for creating, updating, and deleting tasks, as well as marking tasks as completed. Additionally, user authentication and authorization functionalities are also implemented. There are login, register and logout functionalities to seamlessly showcase it.

## Installation and Setup Guide

### Prerequisites

1. Node.js and npm installed on your system.
2. Angular CLI installed globally.
3. Java Development Kit (JDK) installed.
4. PostgreSQL installed and running on your system.

## Frontend Setup

Clone the repository:

bash
```
git clone https://github.com/Benjamin-Benny/Task-Management.git
```


Navigate to the frontend directory:

bash
```
cd Task-Management/frontend
```


Install dependencies:

bash
```
npm install
```


Start the Angular development server:

bash
```
ng serve
```


Access the frontend at http://localhost:4200 in your browser.

## Backend Setup

Navigate to the backend directory:

bash
```
cd Task-Management/backend
```


Import the project into your IDE (e.g., IntelliJ IDEA, Eclipse).

Configure the database connection in application.properties:
properties
```
spring.datasource.url=jdbc:postgresql://localhost:5432/YOUR_DATABASE_NAME
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD
```


Run the Spring Boot application.

## PostgreSQL Setup

Open your PostgreSQL command line interface.
Connect to your database server:

bash
```
psql -U YOUR_DATABASE_USERNAME
```


Create the necessary tables using the provided SQL queries:

sql
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

```
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
```

### Running the Project

Ensure that both the frontend (Angular) and backend (Spring Boot) servers are running.
Open your web browser and navigate to http://localhost:4200 to access the Task Management application.



# Technologies Used


## Frontend (Angular TypeScript)

#### Angular: 
Angular is a TypeScript-based open-source web application framework developed by Google. It is widely used for building single-page applications (SPAs) with a rich user interface.

#### HTML/CSS: 
HTML (Hypertext Markup Language) is used for structuring the web pages, while CSS (Cascading Style Sheets) is used for styling and formatting the visual presentation.

#### Bootstrap: 
Bootstrap is a popular CSS framework that provides pre-designed components and styles for building responsive web applications.


## Backend (Java Spring Boot)

#### Spring Boot: 
Spring Boot is a powerful framework for building Java-based web applications. It simplifies the setup and configuration of Spring-based applications by providing defaults for many configurations.

#### Spring Security:
Spring Security is a powerful and customizable authentication and access control framework for Java applications. It provides robust authentication mechanisms and supports various authentication providers.

#### JWT (JSON Web Tokens): 
JWT is a compact, URL-safe means of representing claims to be transferred between two parties. In this application, JWT is used for implementing stateless authentication, where the user's identity is stored in a token.

#### PostgreSQL: 
PostgreSQL is a powerful, open-source relational database management system. It is used to store and manage task-related data, as well as user authentication information.

## Additional Tools and Libraries

#### HttpClient (Angular): 
The HttpClient module in Angular is used for making HTTP requests to the backend server to perform CRUD operations on tasks.

#### HttpClientModule (Angular): 
The HttpClientModule is used to configure the Angular application to use HttpClient for sending requests and receiving responses from the server.

#### Spring Data JPA: 
Spring Data JPA is a part of the larger Spring Data project that makes it easy to implement JPA-based repositories. It simplifies data access layer implementation by providing automatic repository implementations.

#### Lombok: 
Lombok is a Java library that helps to reduce boilerplate code by providing annotations to generate common code such as getters, setters, constructors, etc.

#### Postman: 
Postman is a popular API client that is used for testing API endpoints during development.

.
.
.

### Thank You and Happy Coding
