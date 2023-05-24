const express = require("express");
require("./DBConnection/conn");
const employee = require("./Routers/employeeRoute");
const user = require("./Routers/userRoute");
const employeepay = require("./Routers/emppay");
const attendance = require("./Routers/attendanceRoute");
const app = express();




const port = process.env.PORT || 8000;

app.use(express.json());
app.use(employee);
app.use(user);
app.use(employeepay);
app.use(attendance);


app.listen(port, () => {
    console.log(`Connection is setup at ${port}`);
});

