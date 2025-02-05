# 🚀 Fastify Chat API  

## 📌 Overview  
This is a **Fastify-based backend API** for a real-time chat application built using **TypeScript**. It follows a **feature-based architecture** and leverages:  
- **Drizzle ORM** for database management  
- **PostgreSQL** as the database  
- **Socket.io** for real-time messaging  

This API enables **real-time chat, chatroom management, message storage**, and more.  

---

## ✨ Features  
- ✅ **User Authentication** (JWT-based login)  
- ✅ **Real-time Chat Messaging** using Socket.io  
- ✅ **Chatroom Management** (Create, Join, Leave)  
- ✅ **Message History** stored in PostgreSQL  
- ✅ **Typing Indicators & Read Receipts**  
- ✅ **Optimized API Performance** with Fastify  

---

## ⚙️ Tech Stack  
| Technology  | Description |
|-------------|------------|
| **Fastify**  | Fast & lightweight Node.js framework |
| **TypeScript** | Type safety & better maintainability |
| **Drizzle ORM** | SQL query builder & migrations |
| **PostgreSQL** | Scalable relational database |
| **Socket.io** | Real-time bi-directional communication |
| **@fastify/jwt** | Authentication using JSON Web Tokens |

---

## 📥 Installation & Setup  

### **1️⃣ Prerequisites**  
Ensure you have the following installed:  
- **Node.js** (v18+)  
- **PostgreSQL** (latest recommended version)  

### **2️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-repo/chat-fastify-api.git  
cd chat-fastify-api  
```

### **3️⃣ Install Dependencies**  
```sh
npm install  
```

### **4️⃣ Configure Environment Variables**  
Create a `.env` file in the root directory and add:  
```
DATABASE_URL=postgres://user:password@localhost:5432/chatdb  
JWT_SECRET=your_secret_key  
SOCKET_PORT=5000  
```

### **5️⃣ Run Database Migrations**  
```sh
npm run db:migrate  
```

### **6️⃣ Start the Server**  
```sh
npm run dev  
```

If everything is set up correctly, the Fastify server will start on **http://localhost:3000** 🚀

---

## 🔥 API Endpoints  

### **1️⃣ Authentication**  
| Method | Endpoint | Description |
|--------|----------|------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Authenticate user and return JWT |

### **2️⃣ Chatrooms**  
| Method | Endpoint | Description |
|--------|----------|------------|
| `GET`  | `/chatrooms` | Get all chatrooms |
| `POST` | `/chatrooms` | Create a new chatroom |

### **3️⃣ Messages**  
| Method | Endpoint | Description |
|--------|----------|------------|
| `GET`  | `/chatrooms/:id/messages` | Get messages from a chatroom |
| `POST` | `/chatrooms/:id/messages` | Send a message |

---

## 📡 WebSocket Events  

### **Client → Server Events**  
| Event | Description |
|-------|------------|
| `join_room` | Join a chatroom |
| `leave_room` | Leave a chatroom |
| `send_message` | Send a message |

### **Server → Client Events**  
| Event | Description |
|-------|------------|
| `new_message` | Receive a new message |
| `user_typing` | Notify when a user is typing |
| `message_read` | Acknowledge message read |

---

## 🗂️ Project Structure  
```
/src  
  ├── features  
  │   ├── auth          # Authentication logic  
  │   ├── chatrooms     # Chatroom management  
  │   ├── messages      # Message storage & retrieval  
  ├── plugins  
  │   ├── drizzle.ts    # Database connection  
  │   ├── socket.ts     # WebSocket (Socket.io)  
  ├── config  
  ├── server.ts        # Fastify server setup  
```

---

## 🚀 Running in Production  

For a **stable deployment**, use **PM2**:  
```sh
npm install -g pm2  
pm2 start npm --name "chat-api" -- run start  
```

To **monitor logs**:  
```sh
pm2 logs chat-api  
```

For **automatic restarts** on failure:  
```sh
pm2 restart chat-api  
```

---

## 🎯 Contributing  
1. **Fork the repo**  
2. **Create a new branch** (`git checkout -b feature-name`)  
3. **Commit changes** (`git commit -m "Add new feature"`)  
4. **Push to branch** (`git push origin feature-name`)  
5. **Create a Pull Request**  

---

## 📜 License  
This project is licensed under the **MIT License**.  

---

Let me know if you want any modifications! 🚀🔥
