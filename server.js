require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('../middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');
const app = express();
app.use(express.json());
app.use(errorHandler);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: false,
    useUnifiedTopology: false,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });
});