const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:"1a",
        username: "Nitesh",
        content: "Mern"
    },
    {
        id:"2b",
        username: "Satya",
        content: "Hard work is imp"
    },
    {
        id:"3c",
        username: "Tapasya",
        content: "full stack"
    }
];

app.get("/posts", (req, res) => {
    res.render("index",{posts}); // No need to add .ejs
});

app.get("/posts/new",(req,res)=>{
    res.render("new");
})

app.post("/posts", (req,res)=>{
    let{username,content} = req.body;
    posts.push({username,content})
    res.redirect("/posts")
})

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show",{post})
})

app.listen(port, () => {
    console.log("Listening on port 8080");
});
