const express = require('express');
const app = express();
const path=require('path');
const shortid = require('shortid');
const port = process.env.PORT || 5000;

const list = {};

app.use(express.json());

app.post("/", (req, res) => {
    const id = shortid.generate();
    list[id] = req.body.longUrl;
    res.send({url: req.protocol + "://" + req.get("host") + req.originalUrl + id});
    //console.log(list);
})

app.get("/api/", (req, res) => {
    res.send(list);
})

app.get("/:id",(req,res)=>{
     res.redirect(list[req.params.id]);
})

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
})