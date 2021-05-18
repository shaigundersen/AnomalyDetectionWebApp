const express = require('express')
// const fileUpload = require('express-fileupload')
const model = require('../model/AnomalyDetecor.js')

const app = express()
app.use(express.urlencoded({
    extended:false
}))
app.use(express.static('../../frontend/public'))
// app.use(fileUpload())

app.get("/", (req, res)=>{
    res.sendFile("index.html")
})

app.post("/detect", (req,res)=>{
    if(req.files){
        const train = req.body.train
        const test = req.body.test
        const anomalies = model.detect(train, test)
        res.write(anomalies)
    }
    // res.write("detect")
    res.end()
})

app.listen(8080)