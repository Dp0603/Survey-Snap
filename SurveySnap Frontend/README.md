# 🖥️ SurveySnap Frontend

Welcome to the frontend client of **SurveySnap**, a full-stack survey management platform. Built with **React.js** and **Vite**, it provides a responsive and user-friendly interface for survey creators, respondents, and admins.

---

## 🛠️ Setup Instructions

### ✅ Prerequisites

- **Node.js** (v14 or higher)
- **Yarn** or **npm**
- Access to the SurveySnap backend API

---

### 🚀 Installation & Running the Client

1. **Navigate to the frontend directory:**

   cd frontend

2. **Install dependencies:**

   npm install
   # or
   yarn install

3. **Create a `.env` file in the `frontend/` directory with the following variables:**

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```

   > Adjust `VITE_API_BASE_URL` if your backend server runs on a different host or port.

4. **Start the development server:**

   npm run dev
   # or
   yarn dev

   The frontend will be available at [http://localhost:5173](http://localhost:5173) by default.


## 📦 Dependencies

| Package             | Purpose                             |
|---------------------|-------------------------------------|
| react               | UI library                          |
| react-router-dom    | Routing                             |
| axios               | HTTP client                         |
| @mui/material       | Material UI component library       |
| chart.js            | Charts and analytics visualization  |
| react-hook-form     | Form handling                       |
| yup                 | Schema validation                   |
| dotenv              | Load environment variables          |
| qs                  | Query string parsing                |


## 📁 Folder Structure

frontend/
├── public/                  # Static assets
├── src/                     # Source code
│   ├── assets/              # Additional images/media
│   ├── components/          # Reusable UI components
│   ├── contexts/            # React context providers
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Route-based pages
│   ├── App.css              # App-specific styling
│   ├── App.jsx              # Main App component
│   ├── index.css            # Global styles
│   └── main.jsx             # App entry point (Vite + React)
├── .env                     # Environment variables
└── package.json             # Project dependencies and scripts

## 🔐 Security

- Environment variables are used to store sensitive API URLs and keys.
- Authentication tokens are stored securely in HTTP-only cookies or local storage with proper precautions.
- Input validation and sanitization are implemented on forms.

---

## 📬 Contact & Contributions

For questions, support, or contributions, please reach out.

Thank you for using **SurveySnap** — Happy surveying! 🎉
