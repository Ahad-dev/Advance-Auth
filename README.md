# Full Authentication System: A Secure User Management Platform

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb&logoColor=green&logoWidth=20)
![React](https://img.shields.io/badge/React-JS-blue?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-JS-green?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express-JS-black?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb&logoColor=white)

## Overview
This project is a **Full Authentication System** built using the **MERN Stack** (**MongoDB**, **Express.js**, **React**, and **Node.js**). The system is designed to provide a secure and user-friendly experience with features such as registration with password validation, email verification, login mechanism, and a personalized dashboard.

---

## Key Features
### 1. **Registration Page**
- **User Signup**: Users can register with their name, email, and password.
- **Password Strength Indicator**: Visual feedback (Weak, Medium, Strong) to encourage secure password creation.
- **Email Verification**:
  - Sends a verification email upon registration.
  - Users must verify their email before accessing the dashboard.

### 2. **Login Page**
- **Secure Login**:
  - Users log in with their email and password.
  - Form validation ensures proper input format.
- **Session Management**:
  - Secure handling using JSON Web Tokens (**JWT**).
  - Persistent login with token expiration and refresh mechanisms.
- **Login Feedback**:
  - Error messages for invalid credentials or unverified accounts.

### 3. **Forgot Password**
- **Password Recovery**:
  - Users can request a password reset via their registered email.
  - A secure, time-bound reset link is sent to the user.
- **Reset Password**:
  - Users create a new password using the reset link.
  - Strong password validation is enforced.

### 4. **Dashboard**
- **Personalized User Dashboard**:
  - Displays key user details like:
    - Name
    - Join Date
    - Last Login Time
  - Only accessible after successful authentication.
- **Dynamic Welcome Message**: Personalized greetings based on the time of day (e.g., “Good Morning, John!”).

---

## Technical Features and Tools
### **Frontend**
- **React**: Dynamic, responsive user interface.
- **Tailwind CSS**: Clean and modern styling.
- **React Router**: Secure routing for navigation.
- **React Hook Form**: Simplifies form handling and validation.

### **Backend**
- **Node.js & Express.js**: Server-side operations and API routing.
- **MongoDB with Mongoose**: Securely stores user data and metadata.
- **JWT (JSON Web Tokens)**: Manages secure authentication and sessions.
- **Nodemailer**: Sends verification and password recovery emails.
- **bcrypt.js**: Hashes and securely stores passwords.
- **Mailtrap**: For email testing and development.

---

## Workflow Highlights
### Registration Flow
1. User fills out the registration form with name, email, and password.
2. Password strength is checked in real-time.
3. After submission:
   - User details (hashed password, join date) are stored in the database.
   - A verification email is sent.
4. Users must verify their email before logging in.

### Login Flow
1. Users enter their email and password.
2. Authentication checks:
   - Email must be verified.
   - Password matches the hashed value in the database.
3. After successful login:
   - A JWT is issued and stored in the browser (e.g., cookies or local storage).
   - User is redirected to the dashboard.

### Forgot Password Flow
1. Users request a password reset via their registered email.
2. A secure, time-bound reset link is sent.
3. Users create a new password, which is hashed and updated in the database.

---

## Pages Overview
### **Register Page**
- Form for user signup with live password strength feedback.
- Displays a confirmation message upon successful registration.

### **Login Page**
- Form for secure login.
- Error messages for incorrect credentials or unverified accounts.

### **Forgot Password Page**
- Input field for registered email.
- Confirmation message upon sending the reset link.

### **Dashboard Page**
- Displays user details (name, join date, last login time).
- Logout button for session termination.

---

## Security Features
- **Password Hashing**: Ensures passwords are never stored in plain text.
- **Token Expiration**: Protects against long-term token misuse.
- **Rate Limiting**: Prevents brute force attacks on login and password recovery.
- **Email Verification**: Confirms legitimacy of user accounts.

---

## How to Run the Project
### Prerequisites
- Node.js & npm installed
- MongoDB installed locally or accessible remotely
- Mailtrap account for email testing

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/full-auth-system.git
   ```
2. Navigate to the project folder:
   ```bash
   cd full-auth-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the root folder.
   - Add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     MAILTRAP_USER=your_mailtrap_username
     MAILTRAP_PASS=your_mailtrap_password
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Access the application at `http://localhost:3000`.

---

## Screenshots
![Registration Page](https://ibb.co/SvQNsKr)
![Login Page](https://ibb.co/dbmXsq9)
![Dashboard](https://ibb.co/Fm23YgQ)

---

## Conclusion
This Full Authentication System provides a secure, scalable, and user-friendly solution for modern web applications. The robust features, built on the MERN Stack, ensure top-notch security while maintaining convenience for users.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

