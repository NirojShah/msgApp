let send = document.getElementById("send")
let inp = document.getElementById("msginp")
let chatbox = document.querySelector(".chatbox")


if (sessionStorage.getItem('name')===null) {
    let userName = prompt("enter your name")
    window.sessionStorage.setItem('name', userName)
}

let nameHead = document.getElementById("nameHead")
nameHead.innerText=sessionStorage.getItem("name")

let msgFetch = async () => {
    let msgs = await fetch("http://localhost:5000/msgjson")
    let finalMsg = await msgs.json()

    finalMsg.map((eachMSG) => {
        if (sessionStorage.getItem("name") === eachMSG.userName) {
            let div = document.createElement("div")
            let span = document.createElement("span")
            div.className="right"
            span.innerHTML="you"
            div.innerText=eachMSG.msg
            div.append(span)
            chatbox.append(div)
        }
        else{
            let div = document.createElement("div")
            let span = document.createElement("span")
            div.className="left"
            span.innerText=eachMSG.userName
            div.innerText=eachMSG.msg
            div.append(span)
            chatbox.append(div)
        }
    })
}

msgFetch()

// send.addEventListener("click",()=>{
//     if(userName != ""){
//     let msgdiv = document.createElement("div")
//     msgdiv.className="right"
//     let msg = inp.value
//     msgdiv.innerText=msg
//     chatbox.append(msgdiv)
//     }
// })