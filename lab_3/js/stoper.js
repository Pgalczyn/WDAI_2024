
const button1 = document.getElementById('button1')
const button2 = document.getElementById('button2')
const button3 = document.getElementById('button3')
button1.addEventListener('click',stoperFunction)
button2.addEventListener('click',()=> {clearInterval(intervalId)})
button3.addEventListener('click',()=> {seconds = 0 
    minutes = 0
})
const kontener = document.getElementById('clock')
const clock = document.createElement('h2')
kontener.appendChild(clock)
let seconds = 0
let minutes = 0
function stoperFunction(){

       intervalId =  setInterval(()=>{
            if (seconds == 60){
                seconds = 0
                minutes++
            } 
            seconds++;
            console.log(`minuty: ${minutes}; sekundy: ${seconds}`)
            if (minutes == 0){
                clock.textContent = `${seconds}s`
            }
            else{
                clock.textContent = `${minutes}min ${seconds}s`
            }
            

        },1000)


}
