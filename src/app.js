const path=require("path")
const express=require("express")
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode.js')
const forcast=require('./utils/forecast.js')
const port=process.env.PORT||3000

const { rmSync } = require("fs")
//console.log(path.join(__dirname,'../public'))
const app=express()
//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,"../template/partials")
//Setup handlebars engine and views location
app.set('view engine','hbs')

app.set('views',viewPath)

hbs.registerPartials(partialsPath)
//const AboutDirectoryPath=path.join(__dirname,'../public/About.html')
//const HelpDirectoryPath=path.join(__dirname,'../public/Help.html')
//Setup static directory to server

app.use(express.static(publicDirectoryPath))
//app.use(express.static(AboutDirectoryPath))
//app.use(express.static(HelpDirectoryPath))

/*app.get('/help',(req,res)=>{
  res.send({
    forcast:"Rainy",
    location:"Guwahati,Assam"
  })
})
app.get('/about',(req,res)=>{
  res.send("About Page")
})*/
app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather app',
    name:'Suchetana Sarkar'
  })
})

app.get("/about",(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Suchetana Sarkar'


  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    helpText:"Help",
    title:'Help You',
    name:'Suchetana Sarkar'

  })
})
app.get('/weather',(req,res)=>{
  if(!req.query.address){
   return  res.send({
      error:"No address provided"
    })
  }
  geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
    if(error){
     res.send(error)
    }
  
  
    forcast(lattitude,longitude, (error, forcastData) => {
      if(error){
        res.send(error)
        
      }
      //console.log(location)
      //console.log(forcastData)
      console.log(req.query.address)
  res.send({
    location:location,
    forcast:forcastData,
    address:req.query.address

  }
  )
  })

    
  
  })
})
app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })


  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})
app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:"404",
    name:"Suchetana Sarkar",
    errorMessage:"Help article  not found"

  })
})

app.get('*',(req,res)=>{

  res.render('404',{
    title:" 404 ",
    name:"Suchetana Sarkar",
    errorMessage:"Page not found"
  })
})

app.listen(port,()=>{
  console.log('Server is up on port '+port)
})

/*
const express=require('express')
const app=express()
app.get("",(req,res)=>{
  res.send("<h1>Initial Page</h1>")
})
app.get("/home",(req,res)=>{
  res.send({
    forcast:"Rainy",
    location:"Guwahati,Assam"
  })
})
app.get("/neighbour",(req,res)=>{
  res.send("Neighbour")
})
app.get("house",(req,res)=>{
  res.send("House")
})
app.listen(3001,()=>{console.log("Express Server Running")})*/