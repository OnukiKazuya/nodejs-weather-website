const request = require("request")

const forecast = ({longtitude, latitude}, callback)=>{
    const weatherstack_token = 'cf11cad48b8db0d3be1fdc8d85d3e4b7'
    const url = `http://api.weatherstack.com/current?access_key=${weatherstack_token}&query=${latitude},${longtitude}&units=F`
    console.log("URL", url)
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback(error, undefined, undefined)
        }
        else if(body.success===false){
            callback("Oops...Unable to connect to network...", undefined, undefined)
        }
        else{
            const data_json = body
            callback(
                undefined, 
                `It is currently ${data_json.current.temperature} degrees out. 
                 It feels lile ${data_json.current.feelslike} degrees out.
                 Humidity : ${data_json.current.humidity}`,
                 data_json.current.weather_icons[0]
            )
        }
    })
}

module.exports = forecast