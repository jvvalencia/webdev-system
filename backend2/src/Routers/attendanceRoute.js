const express = require("express")
const attendance = require("./../models/attendance")
const cors = require("cors")

const router = express.Router();
router.use(cors())

// here we create our Route
router.post("/attendance", async (req, res) => {

    console.log(req.body)
    const data = new attendance(req.body)
    const result = await data.save()

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Attendance failed to saved...."
        })
    }
    else {
        res.json({
            status: "SUCCESS",
            message: "Attendance has been saved successfully....",
            data: result
        })
    }
})

//get records
router.get("/attendance", async (req, res) => {
    try {
        const result = await attendance.find()
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

router.get("/attendance/search", async (req, res) => {
    try {
        const searchTerm = req.query.name;
        const result = await attendance.find({ name: new RegExp(searchTerm, 'i') });

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



//get single record
router.get("/attendance/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await attendance.findById(_id);
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
router.put("/attendance/:id", async (req, res) => {
  try {
      const _id = req.params.id;
      const { name, date, timein, timeout } = req.body;
      const updateFields = {};
      if (name) updateFields.name = name;
      if (date) updateFields.date = date;
      if (timein) updateFields.timein = timein;
      if (timeout) updateFields.timeout = timeout;

      const result = await attendance.findByIdAndUpdate(_id, updateFields, { new: true });
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
router.delete("/attendance/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await attendance.findByIdAndDelete(_id);
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
