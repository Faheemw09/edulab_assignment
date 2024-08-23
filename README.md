# Task Management API

This is a RESTful API designed for managing tasks with user authentication and role-based access control. It allows users to sign up, log in, create, update, and delete tasks. The API is built with Node.js, Express, MongoDB, and JWT for secure authentication.




## Features

- **User Registration and Authentication**
  - Users can register and log in to the system.
  - JWT-based authentication ensures secure access.
  - Role-based access control with roles like 'admin' and 'user'.

- **Task Management**
  - Create, update, delete, and retrieve tasks.
  - Task permissions are managed based on user roles.
  - Tasks can be filtered by priority, status.

- **Security**
  - Route guards ensure that only authorized users can access specific endpoints.
  - Input validation to prevent common security vulnerabilities.

- **Database Interaction**
  - Uses Mongoose for managing data with enforced data integrity.
  - Models are created for users, roles, and tasks.

## API Endpoints

### User Endpoints

- **Register User**
  - `POST /users/signup`
  - Registers a new user.
  - **Request Body:**
    
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password",
      "role": "user" // or "admin"
    }
 
  - **Response:**
 
    {
      "message": "User registered successfully",
      "data": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "user"
      }
    }
   

- **Login User**
  - `POST /users/login`
  - Authenticates a user and provides a JWT.
  - **Request Body:**
  
    {
      "email": "johndoe@example.com",
      "password": "password"
    }
    ```
  - **Response:**
 
    {
      "message": "Login successful",
      "token": "_jwt_token"
    }
    ```

### Task Endpoints

- **Create Task**
  - `POST /tasks/create`
  - Creates a new task. Requires `admin` role.
  - **Headers:**
    
    Authorization: Bearer your_jwt_token
  
  - **Request Body:**
    
    {
      "title": "New Task",
      "description": "Task description",
      "priority": "high",
      "status": "pending",
      "assignedTo": "user_id",
      "dueDate": "2024-12-31T23:59:59Z"
    }
 
  - **Response:**
 
    {
      "message": "Task created successfully",
      "data": {
        "_id": "task_id",
        "title": "New Task",
        "description": "Task description",
        "priority": "high",
        "status": "pending",
        "assignedTo": "user_id",
        "dueDate": "2024-12-31T23:59:59Z"
      }
    }
    ```

- **Get All Tasks**
  - `GET /tasks/get`
  - Retrieves all tasks. Requires `admin` role.
 
    Authorization: Bearer your_jwt_token
   
  - **Response:**

    {
      "tasks": [
        {
          "_id": "task_id",
          "title": "Task Title",
          "description": "Task Description",
          "priority": "high",
          "status": "pending",
          "assignedTo": "user_id",
          "dueDate": "2024-12-31T23:59:59Z"
        }
      ]
    }
    **Query Parameters:**

priority (optional) - Filter tasks by priority.
status (optional) - Filter tasks by status.

- **Update Task**
  - `PATCH /tasks/update/:id`
  - Updates an existing task. Requires `admin` or `user` role.
  - **Headers:**

    Authorization: Bearer your_jwt_token
 
  - **Request Body:**
  
    {
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "priority": "medium",
      "status": "in-progress"
    }
 
  - **Response:**
  
    {
      "message": "Task has been updated successfully",
      "data": {
        "_id": "task_id",
        "title": "Updated Task Title",
        "description": "Updated Task Description",
        "priority": "medium",
        "status": "in-progress",
        "assignedTo": "user_id",
        "dueDate": "2024-12-31T23:59:59Z"
      }
    }
    ```

- **Delete Task**
  - `DELETE /tasks/delete/:id`
  - Deletes a task. Requires `admin` role.
  - **Headers:**
  
    Authorization: Bearer your_jwt_token
  
  - **Response:**
 
    {
      "message": "Task has been deleted successfully",
      "data": {
        "_id": "task_id",
        "title": "Deleted Task Title",
        "description": "Deleted Task Description",
        "assignedTo": "user_id"
      }
    }
    ```

## Middleware

- **Auth Middleware**
  - Ensures the user is authenticated via JWT.

- **Rbac Middleware**
  - Restricts access to endpoints based on user roles.

