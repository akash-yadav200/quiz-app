# **Quiz App**

A simple full-stack quiz application built with Node.js.

---

## **Folder Structure**

```plaintext
.
├── backend/                # Contains backend code and APIs
    ├── prisma/             # Prisma schema and migrations for the database
    ├── node_modules/       # Project dependencies (not pushed to the repo)
    ├── package.json 
├── frontend/               # Contains frontend code and UI components
    ├── node_modules/       # Project dependencies (not pushed to the repo)
    ├── package.json
└── README.md               # Project documentation

```


## **#Getting Started**


Prerequisites
Ensure you have the following installed:

```plaintext
Node.js (v16 or higher recommended)
npm or yarn
Prisma CLI
Installation

```

# Clone the repository:
```plaintext
bash
Copy code
git clone <repository-url>
cd <project-directory>

```

# Install dependencies:

bash
Copy code
# For backend
```plaintext
cd backend
npm install
```

# For frontend
```plaintext
cd ../frontend
npm install
```
# #Set up your environment:

Create a .env file in the backend and frontend directories.

Add the required environment variables as per the .env.example file.

Run database migrations:

bash
Copy code
cd backend
npx prisma migrate deploy
Usage
Backend
Start the backend server:

bash
Copy code
cd backend
npm run dev
Default URL: http://localhost:5000
Frontend
### Start the frontend application:

bash
```plaintext
Copy code
cd frontend
npm start
```
Default URL: http://localhost:3000


## Built With

Backend: Node.js, Express, Prisma
Frontend: React, TypeScript
Database: PostgreSQL (or your chosen database)



# License
This project is licensed under the MIT License.

