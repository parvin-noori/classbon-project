import { useEffect, useReducer, useRef } from "react";

interface VideoState{
    isPlaying:boolean,
    currentTime:number,
    duration:number,
    isFinished:boolean,
    progress:number,
    isVideoLoaded:boolean,
    isVideoWaited:boolean,
}

type VideoAction=
    | { type: "PLAY" }
    | { type: "PAUSE" }
    | { type: "TIME_UPDATE"; currentTime: number }
    | { type: "DURATION_CHANGE"; duration: number }
    | { type: "SET_FINISHED"; isFinished: boolean }
    | { type: "SET_PROGRESS"; progress: number }
    | { type: "SET_VIDEO_LOADED"; isVideoLoaded: boolean }
    | { type: "SET_VIDEO_WAITED"; isVideoWaited: boolean };


    const videoReducer=(state:VideoState,action:VideoAction):VideoState=>{
switch(action.type){
    case "PLAY":
    return {...state, isPlaying: true,isFinished: false,isVideoWaited:false};
    case "PAUSE":
        return { ...state, isPlaying: false };
    case "TIME_UPDATE":
        return { ...state, currentTime: action.currentTime };
    case "DURATION_CHANGE":
        return { ...state, duration: action.duration };
    case "SET_FINISHED":
        return { ...state, isFinished: action.isFinished };
    case "SET_PROGRESS":
        return { ...state, progress: action.progress };
    case "SET_VIDEO_LOADED":
        return { ...state, isVideoLoaded: action.isVideoLoaded };
    case "SET_VIDEO_WAITED":
        return { ...state, isVideoWaited: action.isVideoWaited };
    default:
        return state;
}
    }


    const useVideo=(src:string)=>{
        const videoRef=useRef<HTMLVideoElement>(null);
        const [state,dispatch]=useReducer(videoReducer,{
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            isFinished: false,
            progress: 0,
            isVideoLoaded: false,
            isVideoWaited: false
        })


        useEffect(()=>{
            const updateProgress=()=>{
const {currentTime,duration}=videoRef.current!;
const progress=duration>0?(currentTime/duration)*100:0;
dispatch({type:"SET_PROGRESS", progress});
            }
            const handlePlay=()=>{dispatch({type:"PLAY"})}
            const handlePause=()=>{dispatch({type:"PAUSE"})}
            const handleEnded=()=>{dispatch({type:"SET_FINISHED", isFinished: true})}

            const handleTimeUpdate=()=>{ 
                dispatch({type: "TIME_UPDATE", currentTime: videoRef.current!.currentTime });
                updateProgress()
            }
            const handleDurationChange=()=>{
                dispatch({type:"DURATION_CHANGE",duration:videoRef.current!.duration});
                updateProgress()
            }

            const handleLoadedData = () => {
                dispatch({ type: "SET_VIDEO_LOADED", isVideoLoaded: true });
            };
    
            const handleWaiting = () => {
                dispatch({ type: "SET_VIDEO_WAITED", isVideoWaited: true });
            };
            const handlePlaying = () => {
                dispatch({ type: "SET_VIDEO_WAITED", isVideoWaited: false });
            };

            const handleEvent=(eventName:string,handler:()=>void)=>{
                const video=videoRef.current!
                video.addEventListener(eventName, handler);
                return () => video.removeEventListener(eventName, handler);
            }

            const cleanUpPlay=handleEvent("play",handlePlay)
            const cleanUpPause=handleEvent("pause",handlePause)
            const cleanUpEnded=handleEvent("ended",handleEnded)
            const cleanUpTimeUpdate=handleEvent("timeupdate",handleTimeUpdate)
            const cleanUpDurationChange=handleEvent("durationchange",handleDurationChange)
            const cleanupLoadedData = handleEvent("loadeddata", handleLoadedData);
            const cleanupWaiting = handleEvent('waiting', handleWaiting);
            const cleanupPlaying = handleEvent('playing', handlePlaying);


            return()=>{
cleanUpPlay()
cleanUpPause()
cleanUpTimeUpdate()
cleanUpEnded()
cleanUpDurationChange()
cleanupLoadedData();
cleanupWaiting();
cleanupPlaying();
            }
        },[src]);

        const play=()=>videoRef.current!.play();
        const pause=()=>videoRef.current!.pause();
        const seek=(time:number)=>(videoRef.current!.currentTime=time);
        const fullScreen=()=>videoRef.current!.requestFullscreen();
        const stop=()=>{
            const video=videoRef.current!;
            video.currentTime=0;
            video.pause();
        }


        return{
            videoRef,
            state,
            play,
            pause,
            seek,
            fullScreen,
            stop
        }
    }

    export default useVideo;