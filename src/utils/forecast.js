const request=require('request')
const forcast=(lattitude,longitude,callback)=>{
  url="http://api.weatherstack.com/current?access_key=c5b44c1ad5c18eeb134f2b19194d5627&query="+ encodeURIComponent(lattitude)+","+ encodeURIComponent(longitude)
  request({url,json:true},( error ,{ body })=>{
    if(error){
      callback("Network Problem",undefined)
    }
    else if(body.error){
      callback("Argument wrong",undefined)
    }
    else{
     callback(undefined,body.current.weather_descriptions[0]+" It is currently " +body.current.temperature +" degree out.There is a "+ body.current.feelslike+"% chance of rain"+"and the Cloud Cover is"+body.current.cloudcover)
    }


  })
}

//-75.7088, 44.1545
module.exports=forcast