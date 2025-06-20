const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

const surveyRoutes = require("./src/routes/SurveyRoutes");
app.use("/survey", surveyRoutes);

const questionRoutes = require("./src/routes/QuestionRoutes");
app.use("/question", questionRoutes);

const responseRoutes = require("./src/routes/ResponseRoutes");
app.use("/responses", responseRoutes);

const surveydistributionRoutes = require("./src/routes/SurveyDistributionRoutes");
app.use("/survey-distribution", surveydistributionRoutes);

const notificationRoutes = require("./src/routes/NotificationRoutes");
app.use("/notification", notificationRoutes);

const analyticsreportsRoutes = require("./src/routes/AnalyticsReportsRoutes");
app.use("/analytics", analyticsreportsRoutes);

const reportRoutes = require("./src/routes/ReportRoutes");
app.use("/report", reportRoutes);

const shareRoutes = require("./src/routes/ShareRoutes");
app.use("/share", shareRoutes);

const paymentRoutes = require("./src/routes/PaymentRoutes");
app.use("/payment", paymentRoutes);

const adminreportRoutes = require("./src/routes/AdminReportRoutes");
app.use("/adminreport", adminreportRoutes);

const path = require("path");

// Serve static files from the frontend dist folder located one level up and inside 'SurveySnap Frontend/dist'
// app.use(
//   express.static(path.join(__dirname, "..", "SurveySnap Frontend", "dist"))
// );

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "..", "SurveySnap Frontend", "dist", "index.html")
//   );
// });
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

mongoose
  .connect(
    "mongodb+srv://pateldevam6303:devam6303@surveysnap.recknue.mongodb.net/?retryWrites=true&w=majority&appName=SurveySnap"
  )
  .then(() => {
    console.log("database connected....");
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server started on port number ", PORT);
});

// Example for Express.js backend
const allowedOrigins = [
  "https://survey-snap-omega.vercel.app", // Replace with your actual Vercel frontend URL
  "http://localhost:5173" // For local development
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
