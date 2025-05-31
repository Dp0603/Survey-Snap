# SurveySnap Backend

Welcome to the backend server of **SurveySnap**, a full-stack survey management platform. Built with **Node.js**, **Express.js**, and **MongoDB**, it handles:

- 🔐 Authentication
- 📝 Survey creation
- 📥 Response collection
- 📊 Analytics
- 📤 Multi-channel sharing (Email, SMS, etc.)

---

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local or Atlas)
- *(Optional)* Twilio account (for SMS/WhatsApp sharing)
- *(Optional)* SMTP credentials (for email sharing)

---

### Installation & Running the Server

1. **Navigate to the backend directory:**
cd backend

2. **Install dependencies:**

npm install

3. **Create a `.env` file in the `backend/` directory with the following variables:**

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password

TWILIO_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret


4. **Start the development server:**

nodemon / nodemon app.js

---------------------------------

## 📦 Dependencies
This project uses the following key npm packages:

| Package        | Purpose                            |
|----------------|------------------------------------|
| express        | Web framework for Node.js          |
| mongoose       | MongoDB object modeling            |
| jsonwebtoken   | JWT-based authentication           |
| bcrypt         | Secure password hashing            |
| dotenv         | Load environment variables         |
| nodemailer     | Send emails for survey sharing     |
| twilio         | Send SMS and WhatsApp messages     |
| multer         | Handle file uploads                |
| cloudinary     | Host and manage uploaded media     |
| cors           | Enable cross-origin requests       |
| razorpay       | *(Optional)* Payment integration   |
| path           | File path resolution               |


## 📁 Folder Structure

backend/
├── controllers/       # Logic for each route
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── utils/             # Mail and Twilio utilities
├── middleware/        # Auth and custom middlewares
├── app.js             # Main server entry point
├── .env               # Environment variables
└── package.json       # Project metadata and dependencies


## 🔐 Security

- Sensitive data is secured via environment variables.
- Passwords are hashed using **bcrypt**.
- JWT tokens secure protected routes and user sessions.


## 📬 Contact & Contributions

For support, feature requests, or to contribute, feel free to reach out.  

Thank you for using **SurveySnap** — Happy surveying! 🎉