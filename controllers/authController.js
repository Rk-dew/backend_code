const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/token');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    const token = createToken(user._id);
    res.status(201).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = createToken(user._id);
  res.status(200).json({ token, user: { name: user.name, email: user.email } });
};