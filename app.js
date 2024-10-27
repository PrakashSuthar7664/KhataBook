const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs") ;

app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir(`./hisaab` , (err , files)=>{
        if(err) throw err;
        res.render("index", {files});
    })
});


app.get("/create" , (req,res)=>{
    res.render("create");
})
app.post("/createhisaab" , (req,res)=>{

    

    const today = new Date();

    let day = today.getDate();       
    let month = today.getMonth() + 1;
    let year = today.getFullYear();   

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    const title = req.body.title || '' ; 
    let filename ; 

    if(title.length > 0 ) {
        filename =` ${title}.txt`; 
    }else {
        filename = `${day}-${month}-${year}.txt`;
    }
    
    //  const fn =   `${day}-${month}-${year}.txt` ; 

    
   
 


 fs.writeFile(`./hisaab/${filename}`, req.body.hisaab, (err) => {
        if (err) throw err;
        res.redirect("/");
    });


})

app.get("/edit/:filename" , (req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}` , "utf-8" , (err,filedata)=>{
        if(err) throw err;
        res.render("edit", {filename:req.params.filename, data:filedata});
    })

})

app.post("/update/:filename" , (req,res)=>{
    


 fs.writeFile(`./hisaab/${req.params.filename}`, req.body.hisaab, (err) => {
        if (err) throw err;
        res.redirect("/");
    });


})


app.get("/hisaab/:filename" , (req,res)=>{
    fs.readFile(`./hisaab/${req.params.filename}` , "utf-8" , (err ,filedata)=>{
        if(err) throw err;
        res.render("hisaab", {filename:req.params.filename, data:filedata});
    })
})

app.get("/delete/:filename" , (req,res)=>{
    fs.unlink(`./hisaab/${req.params.filename}` , (err)=>{
        if(err) throw err;
        res.redirect("/");
    })
})


app.listen("3000");
