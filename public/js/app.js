

console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const msgOne = document.querySelector("#msg1")
const msgTwo = document.querySelector("#msg2")

msgTwo.textContent = "From Client-Side JavaScript"

weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()  // ページ更新防ぐ
    const location = search.value
    msgOne.textContent = "Loading...."
    msgTwo.textContent = ""
    fetch(`/weather?address=${location}`)
    .then((res)=>res.json())
    .then((data)=>{
        if(data.error){
            msgOne.textContent = data.error
        }
        else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }
    })
})