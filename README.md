📰 MERN Blog Application

A simple MERN (MongoDB, Express.js, React, Node.js) blog application that allows users to:

Create and manage posts with categories and images.

View all posts with category filtering.

Upload and display post images.

Practice CRUD (Create, Read, Update, Delete) operations in a full-stack environment.

🧩 Features

✍️ Create blog posts with title, content, category, and image upload

📂 Manage categories dynamically from the backend

🖼️ Upload and display images using Multer

⚙️ RESTful API with Express and Mongoose

🎨 Frontend built with React and Axios

🔗 Full-stack integration between backend and frontend

🧠 Auto-generated slugs for posts (optional enhancement)

🗂️ Folder Structure
mern-blog/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── context/       # Global PostContext
│   │   ├── services/      # Axios service layer
│   │   ├── pages/         # Home, CreatePost pages
│   │   └── App.jsx        # Main app setup
│   └── package.json
│
├── server/                # Express backend
│   ├── controllers/       # API logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Route handlers
│   ├── uploads/           # Uploaded images
│   ├── .env               # Environment variables
│   └── server.js          # Server entry point
│
└── README.md

⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/<your-username>/mern-blog.git
cd mern-blog

2. Setup Backend
cd server
npm install


Create a .env file in the server folder:

MONGO_URI=mongodb://127.0.0.1:27017/mern_blog
PORT=5000


Run the server:

npm run dev


The API will start at: http://localhost:5000

3. Setup Frontend
cd ../client
npm install
npm run dev


The frontend will run at: http://localhost:5173

🧪 API Endpoints
Method	Endpoint	Description
GET	/api/categories	Get all categories
POST	/api/categories	Create new category
GET	/api/posts	Get all posts
POST	/api/posts	Create a new post (with image)
GET	/api/posts/:id	Get single post
PUT	/api/posts/:id	Update post
DELETE	/api/posts/:id	Delete post
🧰 Technologies Used

Frontend: React, Axios, Tailwind CSS (or plain CSS)

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Image Uploads: Multer

State Management: React Context API

📸 Screenshots (optional)

Add screenshots here once you deploy or test locally.

👨‍💻 Author
phillip  Kimonyi | CodeVirtuoso
Bachelor of Science in Computer Technology
Power Learn Project (PLP) Scholarship – Full Stack Development Track