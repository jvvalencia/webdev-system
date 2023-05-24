const express = require("express")
const user = require("../models/users")
const cors = require("cors")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const router = express.Router();
router.use(cors())

router.post("/user", async (req, res) => {
    console.log(req.body);

    try {
      const { username, email, birthday, password } = req.body;
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        return res.json({
          status: "FAILED",
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new user({
        username,
        email,
        birthday,
        password: hashedPassword,
      });
      const result = await newUser.save();

      res.json({
        status: "SUCCESS",
        message: "User has been registered successfully....",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "User failed to registered....",
        error: error.message,
      });
    }
  });


router.get("/user", async (req, res) => {
    try {
        const result = await user.find()
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            })
        }
    }
    catch (e) {
        console.log(e)
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await user.findById(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record not found on this ID"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})

router.put("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await user.findByIdAndUpdate(_id,req.body,{new: true});
        console.log(result)
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Records failed to update....",
                data: result
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record is updated successfully...",
                data: result
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})

router.delete("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await user.findByIdAndDelete(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "User not deleted..."
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "User is deleted successfully..."
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

      const result = await user.findOne({ email });

      if (!result) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, result.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }


      const token = jwt.sign({ userId: result._id }, 'your-secret-key-here');

      res.json({
        status: "SUCCESS",
        message: 'Logged in successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;
