# 💬 Quick Chat

> A modern **real-time chat application** built with the MERN stack, designed for fast, secure, and seamless communication.

🌐 **Live Application:** https://quick-chat-teal.vercel.app/

---

## 📌 About The Project

**Quick Chat** is a full-stack real-time messaging application that allows users to communicate instantly through a clean and responsive interface.

The project was built to gain practical experience in **full-stack development, real-time communication, authentication, REST APIs, database management, and cloud services**.

The application uses **Socket.io** to provide real-time messaging, **JWT** for authentication, **MongoDB** for data persistence, and **Cloudinary** for media handling.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcryptjs
- Protected routes

### 💬 Real-Time Messaging
- Instant message delivery
- Real-time communication using Socket.io
- Persistent conversations
- User-to-user messaging

### 🖼️ Media Support
- Image/media uploads
- Cloudinary integration
- Secure cloud-based media storage

### 🎨 User Experience
- Responsive design
- Clean and modern interface
- Mobile-friendly layout
- Smooth chat experience

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | User interface |
| JavaScript | Application logic |
| Tailwind CSS | Styling |
| Axios | API communication |
| React Router | Client-side routing |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| Socket.io | Real-time communication |

### Authentication & Cloud

| Technology | Purpose |
|---|---|
| JWT | Authentication |
| bcryptjs | Password hashing |
| Cloudinary | Media storage |

---

## 🏗️ Architecture

```text
                    ┌─────────────────┐
                    │   React Client  │
                    │   + Tailwind    │
                    └────────┬────────┘
                             │
                    REST APIs / Socket.io
                             │
                             ▼
                    ┌─────────────────┐
                    │ Node + Express  │
                    │     Server      │
                    └───────┬─────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       ┌─────────────┐             ┌─────────────┐
       │   MongoDB   │             │  Cloudinary │
       │   Database  │             │    Media    │
       └─────────────┘             └─────────────┘
```

---

## 🔄 How Real-Time Messaging Works

```text
User A
   │
   │ Send Message
   ▼
React Client
   │
   │ Socket.io
   ▼
Node.js Server
   │
   ├──────────────► MongoDB
   │                 │
   │                 │ Store Message
   │                 ▼
   │
   └──────────────► Socket.io
                     │
                     ▼
                  User B
```

Messages are delivered in real time through **Socket.io**, while MongoDB maintains persistent chat data.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB

### Clone the repository

```bash
git clone https://github.com/Sourabh-ctrl/Quick-Chat.git

cd Quick-Chat
```

### Install dependencies

```bash
npm install
```

If the project has separate frontend and backend applications:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### Environment Variables

Create a `.env` file and configure the required environment variables.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ Never commit your `.env` file or expose API keys and secrets in your repository.



## 🧠 Key Concepts Implemented

This project helped me gain practical experience with:

- Full-stack MERN development
- REST API development
- JWT authentication
- Password hashing
- Real-time communication
- WebSocket-based architecture
- MongoDB data modeling
- Cloudinary integration
- React state management
- Client-server communication
- Responsive UI development
- Deployment and production configuration

---

## 📈 Future Improvements

Some features planned for future versions:

- ✍️ Typing indicators
- ✓✓ Read receipts
- 👥 Group chats
- 🔔 Notifications
- 🔍 Message search
- 🎙️ Voice messages
- 📎 File sharing

---

## 🌐 Live Demo

### 🚀 Try Quick Chat

**https://quick-chat-teal.vercel.app/**

---

## 👨‍💻 Author

### Saurabh Lathi

**Full Stack Developer | MERN | TypeScript | Next.js**

I'm passionate about building scalable web applications and solving complex problems through software.

- 🌐 Portfolio: https://sourabhlathi.vercel.app/
- 💻 GitHub: https://github.com/Sourabh-ctrl

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐.

It helps support the project and motivates me to keep building!
