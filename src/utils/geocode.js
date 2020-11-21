const request = require("request")

const geocode = (address, callback)=>{
    const mapbox_token = 'pk.eyJ1Ijoib251a2kiLCJhIjoiY2tocGpjdWdpMG1xMTJ0bzF3dmFwbGNvZSJ9.3WCmYuOv2qrbvBYNJCz5dQ'
    const forward_geo = 'geocoding/v5/mapbox.places/'
    const url = `https://api.mapbox.com/${forward_geo}`+encodeURIComponent(address)+`.json?access_token=${mapbox_token}&limit=1`

    request({url, json:true}, (error,{body})=>{
        if (error){
            callback("Unable to connect to location services", undefined)
        }
        else if (body.features.length===0){
            callback("Unable to find location. Try another search.", undefined)
        }
        else{
            const center = body.features[0].center
            const longtitude = center[0]
            const latitude = center[1]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude,
                longtitude,
                location
            })
        }
    })
}

module.exports = geocode