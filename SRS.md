# Software Requirements Specification (SRS)

## Project: Spa Wellness

### 1. Introduction
#### 1.1 Purpose
This document specifies the software requirements for the Spa Wellness application. It is intended for developers, stakeholders, and testers to understand the functionality and constraints of the system.

#### 1.2 Scope
Spa Wellness is a comprehensive web platform for a spa and wellness center. It facilitates service discovery, appointment booking, and administrative management. The project uses the MERN (MongoDB, Express, React, Node.js) stack.

---

### 2. Overall Description
#### 2.1 Product Perspective
The system is a distributed application with a clear separation between the frontend (React/Vite) and backend (Node.js/Express/MongoDB).

#### 2.2 Product Functions
- **User Management**: Registration, Login, Profile management.
- **Service Catalog**: Displaying available spa services.
- **Booking System**: Selecting services, dates, and times for appointments.
- **Administrative Control**: Managing user bookings (Approve/Reject).
- **Feedback/Reviews**: Users can provide feedback on services.

#### 2.3 User Classes and Characteristics
- **Guest**: Unauthenticated users who can browse services.
- **Customer (User)**: Authenticated users who can book and track appointments.
- **Admin**: Staff members who manage the business operations and bookings.

---

### 3. System Features
#### 3.1 Authentication & Authorization
- **Registration**: Users can create an account using their name, email, and a secure password.
- **Login**: Secure login using JWT (JSON Web Tokens).
- **Role-Based Access**: Restricts certain pages (like Admin Dashboard) to users with the 'admin' role.

#### 3.2 Booking Module
- **Create Booking**: Users can choose a service, date, and time.
- **Status Tracking**: Bookings have statuses: `Pending`, `Accepted`, `Rejected`.
- **Validation**: Ensures all required fields are provided before submission.

#### 3.3 Admin Module
- **Dashboard**: A centralized view for admins to see all incoming requests.
- **Booking Management**: Tools to change the status of bookings.

---

### 4. External Interface Requirements
#### 4.1 User Interfaces
- **Frontend**: Built with React and Tailwind CSS for a modern, responsive UI.
- **Aesthetics**: Clean, "wellness-focused" design with intuitive navigation.

#### 4.2 Hardware Interfaces
- None (Standard web browser access).

#### 4.3 Software Interfaces
- **Database**: MongoDB (NoSQL) for flexible data storage.
- **Backend API**: RESTful services built with Express.js.

---

### 5. Non-functional Requirements
#### 5.1 Security
- Password encryption using `bcryptjs`.
- Secure API endpoints using middleware to verify JWT.
- CORS (Cross-Origin Resource Sharing) enabled for secure frontend-backend communication.

#### 5.2 Performance
- Fast page loads using Vite's optimized build process.
- Efficient database queries via Mongoose ODM.

#### 5.3 Scalability
- Modular backend structure (Models, Controllers, Routes) allows for easy feature expansion.

---

### 6. Technical Stack
- **Frontend**: React.js, Vite, Tailwind CSS, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas).
- **Authentication**: JWT, Bcrypt.js.
