# 🏡 Real Estate SaaS Platform

A modern **Real Estate Management System** built using the **MERN Stack**. This project consists of three applications:

- 🌐 Client Website
- 🛠️ Admin Dashboard
- ⚙️ REST API Backend

The platform allows users to browse properties while administrators can securely manage property listings, images, enquiries, and analytics.

---

# 🚀 Live Demo

### 🌐 Client Application

https://realestate-hszjlj9ji-praveens-projects-a615f209.vercel.app/

### 🛠️ Admin Dashboard

https://realestate-admin-git-main-praveens-projects-a615f209.vercel.app/

### ⚙️ Backend API

https://realestate-pro-fzvt.onrender.com

---

# ✨ Features

## Client Website

- Browse all properties
- Featured properties
- Property details page
- Property search
- Contact & enquiry form
- Responsive design
- Mobile friendly UI

---

## Admin Dashboard

- Secure Admin Login (JWT)
- Dashboard Overview
- Add Property
- Edit Property
- Delete Property
- Upload Multiple Images (Cloudinary)
- Manage Property Status
- Featured Property Management
- View Enquiries
- Analytics Dashboard

---

## Backend API

- RESTful API
- JWT Authentication
- MongoDB Database
- Cloudinary Image Upload
- Multer File Upload
- Property CRUD Operations
- Enquiry Management
- Secure API Endpoints

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary

## Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas
- Cloudinary

---

# 📂 Project Structure

```
RealEstate-SaaS/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── admin-panel/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/Praveen775D/realestate-pro.git

cd realestate-pro
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

CLOUDINARY_NAME=your_cloud_name

CLOUDINARY_KEY=your_api_key

CLOUDINARY_SECRET=your_api_secret
```

---

# Client Setup

```bash
cd client

npm install

npm run dev
```

Create:

```env
VITE_API_URL=http://localhost:5000/api

VITE_UPLOAD_URL=http://localhost:5000/uploads
```

---

# Admin Panel Setup

```bash
cd admin-panel

npm install

npm run dev
```

Create:

```env
VITE_API_URL=http://localhost:5000/api

VITE_UPLOAD_URL=http://localhost:5000/uploads
```

---

# API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Properties

```
GET    /api/properties

GET    /api/properties/:id

POST   /api/properties

PUT    /api/properties/:id

DELETE /api/properties/:id
```

---

## Upload

```
POST /api/upload/images
```

---

## Enquiries

```
GET    /api/enquiries

POST   /api/enquiries
```

---

# Screens

- Home Page
- Property Listing
- Property Details
- Admin Login
- Dashboard
- Add Property
- Edit Property
- Analytics
- Enquiries

---

# Future Improvements

- Google Maps Integration
- Property Wishlist
- Email Notifications
- Payment Gateway
- Property Booking
- User Authentication
- Role Based Access
- AI Property Recommendation
- Advanced Analytics

---

# 👨‍💻 Author

**Praveen Udugundla**

B.Tech CSM (AI & ML)

Full Stack MERN Developer

GitHub:
https://github.com/Praveen775D

LinkedIn:
https://www.linkedin.com/in/praveen-udugundla/

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ If you like this project, don't forget to Star the repository.
