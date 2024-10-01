const fs = require("fs");
// const http = require("http");
const express = require("express");

const app = express();

// middleware untuk membaca
app.use(express.json());

// default url = healt check
app.get('/', (req, res) => {
    res.status(200).json({
        "status" : "Success",
        "message " : "Application is running good...."
    })
})

app.get('/zainal', (req, res) => {
    res.status(200).json({
        "message " : "ping succesfuly"
    })
})

const cars = JSON.parse (fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8"));

// /api/v1/(collectionnya) => collectionya harus jamak (s)
app.get('/api/v1/cars', (req, res) => {
    res.status(200).json({
        status : "success",
        message  : "Success get cars data",
        isSuccess : true,
        totalData : cars.length,
        data : {cars,}
    })
})

app.post('/api/v1/cars', (req, res) => {
    // insert into ......

    const newCar = req.body;

    cars.push(newCar);

    fs.writeFile(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            status : "success",
            message  : "Success add cars data",
            isSuccess : true,
            data : {
                car : newCar,
            }
        })
    })
})

// response.data.cars

// middleware / handler url yang tidak dapat diakses  karena memang tidak ada di aplikasi
// membuat middleware sendiri = our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        "status" : "Failed",
        "message" : " API not exist "
    })
})




app.listen("3000", () => {
    console.log("start aplikasi kita diport 3000")
})