const express = require("express")
const employeepays = require("./../models/emppay")
const cors = require("cors")

const router = express.Router();
router.use(cors())

// here we create our Route
router.post("/employeepay", async (req, res) => {
    console.log(req.body)
    const data = new employeepays(req.body)
    const result = await data.save()

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Payment failed to saved...."
        })
    }
    else {
        res.json({
            status: "SUCCESS",
            message: "Payment successfully saved....",
            data: result
        })
    }
})

//get records
router.get("/employeepay", async (req, res) => {
    try {
        const result = await employeepays.find()
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
router.get("/employeepay/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await employeepays.findById(_id);
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
router.put("/employeepay/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const { name, ratePerDay, numberOfDays, deduction, totalsalary } = req.body;
        const updateFields = {};
        if (name) updateFields.name = name;
        if (ratePerDay) updateFields.ratePerDay = ratePerDay;
        if (numberOfDays) updateFields.numberOfDays = numberOfDays;
        if (deduction) updateFields.deduction = deduction;
        if (totalsalary) updateFields.totalsalary = totalsalary;

        const result = await employeepays.findByIdAndUpdate(_id, updateFields, { new: true });
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
router.delete("/employeepay/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await employeepays.findByIdAndDelete(_id);
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

router.get("/employeepay/search", async (req, res) => {
    try {
        const searchTerm = req.query.name;
        const result = await employeepays.find({ name: new RegExp(searchTerm, 'i') });

        if (!result.length) {
            res.json({
                status: "FAILED",
                message: "No record found"
            });
        } else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            });
        }
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;
