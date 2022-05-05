const request=require('request')
const geocode=(address,callback)=>{
  const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic3VjaGV0YW5hc2Fya2FyIiwiYSI6ImNsMmxxcG9heDA5N2MzZW1hb3BhanhpdWQifQ.Be9xYim5_2-hjqzTeG3ASw&limit=1"
  request({url,json:true},(error, {body})=>{
    if(error){
      callback('unable to connect to ',undefined)
    }else if(body.features.lenght===0){
      callback("No location provided",undefined)
    }
    else if(body.features===undefined){
      callback("Argument wrong",undefined)
    }

    else{
      callback(undefined,{
        lattitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        location:body.features[0].place_name
      })

    }

  })

}




// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


module.exports=geocode