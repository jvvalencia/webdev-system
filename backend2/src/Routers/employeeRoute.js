const express = require("express")
const employee = require("./../models/employee")
const cors = require("cors")

const router = express.Router();
router.use(cors())

// here we create our Route
router.post("/employee", async (req, res) => {
    console.log(req.body)
    const data = new employee(req.body)
    const result = await data.save()

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Employee failed to registered...."
        })
    }
    else {
        res.json({
            status: "SUCCESS",
            message: "Employee has been registered successfully....",
            data: result
        })
    }
})

//get records
router.get("/employee", async (req, res) => {
    try {
        const result = await employee.find()
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

//get single record
router.get("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await employee.findById(_id);
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
// update records
router.put("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const { name, email, number, gender, address } = req.body;
        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (number) updateFields.number = number;
        if (gender) updateFields.gender = gender;
        if (address) updateFields.address = address;

        const result = await employee.findByIdAndUpdate(_id, updateFields, { new: true });
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


// Delete Records
router.delete("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await employee.findByIdAndDelete(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record not deleted..."
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record is deleted successfully..."
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})


module.exports = router;
