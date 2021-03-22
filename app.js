if ('serviceWorker' in navigator){
navigator.serviceWorker.register('sw.js')
.then((req)=>console.log("works",req))
.catch((err)=>console.log("not work",err))
}