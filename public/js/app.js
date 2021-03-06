

console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const msgOne = document.querySelector("#msg1")
const msgTwo = document.querySelector("#msg2")
const img = document.getElementById("image_place");
            

msgTwo.textContent = "From Client-Side JavaScript"

weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()  // ページ更新防ぐ
    const location = search.value
    msgOne.textContent = "Loading...."
    msgTwo.textContent = ""
    img.src=""
    fetch(`/weather?address=${location}`)
    .then((res)=>res.json())
    .then((data)=>{
        if(data.error){
            msgOne.textContent = data.error
            img.src=""
        }
        else{
            msgOne.textContent = "Location : " + data.location
            msgTwo.textContent = "Forecast : " + data.forecast
            img.src = data.weather_icon
        }
    })
})