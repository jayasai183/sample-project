const express = require('express');
const app = express();
const shortid = require('shortid');
const port = 5000;

const list = {};

app.use(express.json());

app.post("/", (req, res) => {
    const id = shortid.generate();
    list[id] = req.body.longUrl;
    res.send({url: req.protocol + "://" + req.get("host") + req.originalUrl + id});
    //console.log(list);
})

app.get("/", (req, res) => {
    res.send(list);
})

app.get("/:id",(req,res)=>{
     res.redirect(list[req.params.id]);
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})