# ECommerce Fullstack Project | Microservice Architecture                                                                                                                                                                                                       

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) 	![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

This project is an **E-commerce platform** built using a combination of **modular monolithic** and **microservices architectures**. The application is designed to **handle** key e-commerce operations such as **user management**, **product management**, **shopping cart operations**, **payment processing**, **order creation**, and **invoice generation**. The system is developed with a focus on **scalability**, **performance**, and **asynchronous communication** between services.

# Table of Contents
- [Project Overview](#project-overview) :mag_right:

  * [Coding Strategy](#data-layer) 

  * [Service Responsibilities](#data-layer)

  * [Architecture Overview](#data-layer)

- [Project Planning and Flow on Miro](#project-overview) :wrench:
- [Project Demo Video](#project-overview) :movie_camera:
- [Getting Started](#using) :rocket:

# Coding Strategy

************ Common Schema for All Services ************

**Database Layer**
Uses Redis or MongoDB for data persistence, depending on the service requirements.

:arrow_down:
 
**Repository Layer**
Encapsulates database operations, ensuring clean and testable code.

:arrow_down:
 
**Service Layer**
Implements business logic, using a standardized ServiceMessage type to handle operations.

:arrow_down:
 
**Controller Layer**
Manages HTTP requests and responses, delegating logic to the service layer.

:arrow_down:

**Middlewares**
Global Error Handling ( Winston for logging ), Async Handler Typescript, JWT Authentication etc.

:arrow_down:
 
**Router**
Defines clear and RESTful API endpoints for client interaction.
________________________________________________________________________________________________________________________
************ Technology Stack ************

Messaging:
**Apache Kafka** for event **streaming** and **asynchronous communication**. **Socket.io** for **real-time notification**.

Database:
**MongoDB** for persistent data storage.
**Redis** for **caching** and session management.

Search Engine:
**Elasticsearch** for advanced product search.

Security:
**JWT** for user authentication.

Containerization:
**Docker** for **deploying** services as containers.

Queue Management:
**Redis** Streams or **Kafka topics** for handling **real-time updates**.
________________________________________________________________________________________________________________________


  **[⬆ Back to Table of Contents](#table-of-contents)**
