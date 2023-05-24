const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// MongoDB Connection URI
const uri = 'mongodb://localhost:27017/mydatabase';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const users = db.collection('users');

    // Query MongoDB for user with matching username and password
    const user = await users.findOne({ username, password });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.json({ message: 'Login successful', user });
    }

    // Close MongoDB connection
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
