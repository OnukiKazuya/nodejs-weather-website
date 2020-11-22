const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000  // ここはまだわからない．．．

// Define paths for Express config
const public_dir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(public_dir))  // = localhost:3000/ 以降に、public下の内容を置くということ
app.get("", (req,res)=>{
    res.render("index",{
        title : "Home Page",
        name : "onuki"
    })
})
app.get("/weather", (req, res)=>{
    const address = req.query.address
    if(!address){
        res.send({error:"You must provide a address"})
    }
    else{
        geocode(address, (error, data)=>{
            if (error){
                return res.send({error})
            }
            else{
                forecast(data, (error, fc_data, weather_icon) => {
                    if (error){
                        return res.send({error})
                    }
                    return res.send({
                        forecast : fc_data,
                        location : data.location,
                        weather_icon
                    })
                })
            }    
        })
    }
})

app.get("/about", (req, res)=>{
    res.render("about", {
        title : "About Me",
        name : "Onuki"
    })
})
app.get("/help", (req, res)=>{
    res.render("help", {
        title: "HELP Page",
        name : "onuki",
    })
})
app.get("/help/*", (req, res)=>{
    res.render("404", {
        title : "404",
        name : "onuki",
        err : "Help article not found"
    })
})
app.get("*", (req, res)=>{
    res.render("404",{
        title : "404",
        name : "onuki",
        err : "Page not found"
    })
})
app.listen(port, ()=>{
    console.log("Server is up on port 3000.")
})
