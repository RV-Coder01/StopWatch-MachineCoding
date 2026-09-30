import {useState,useEffect,useRef} from "react"

export default function StopWatch(){
    const [time, setTime]=useState(0)
    let startWatchRef=useRef(0)
    let intervalRef=useRef(0)

    useEffect(()=>{
        window.addEventListener("blur",handleBlurr)
        window.addEventListener("focus",handleFocus)

        return()=>{
            window.removeEventListener("blur",handleBlurr)
            window.removeEventListener("focus",handleFocus)
        }

    },[time])

    function handleBlurr(){
        clearInterval(intervalRef.current)
    }

    function handleFocus(){
         handleStart()
    }

    function handleStart(){
        startWatchRef.current=new Date().getTime()-time
        intervalRef.current=setInterval(()=>{
            setTime(new Date().getTime()-startWatchRef.current)
        },10)
    }
    function handleStop(){
        clearInterval(intervalRef.current)
        setTime(0)
    }
    function handlePause(){
        clearInterval(intervalRef.current)
    }

    function handleTimeFormat(){
        const ms=Math.floor((time%1000)/10).toString().padStart(2,"0")
        const sec=Math.floor((time/1000)%60).toString().padStart(2,"0")
        const min=Math.floor((time/(1000*60))%60).toString().padStart(2,"0")
        const hour=Math.floor((time/(1000*60*60))/24).toString().padStart(2,"0")
        return `${hour}:${min}:${sec}:${ms}`
    }

    return(
        <>
        <h1>{handleTimeFormat()}</h1>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handlePause}>Pause</button>
        </>
    )
}