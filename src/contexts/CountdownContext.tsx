import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";


interface CountdownContextData{
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps{
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}: CountdownProviderProps){
  const {startNewChallenge, finishRestTime} = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isRest, setIsRest] = useState(true);
  const [hasFinished, setHasFinished] = useState(false);


  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown(){
    setIsActive(true); 
  }
  
  function resetCountdown(){
    clearTimeout(countdownTimeout);
    setIsRest(true);
    setIsActive(false);
    setTime(25 * 60);
    setHasFinished(false);
  }

  function restCountdown(){
    clearTimeout(countdownTimeout);
    setIsRest(false);
    setTime(5 * 60);
    startCountdown();
  }
  
  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time-1);
      }, 990)
    }
    else if(isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
      if(isRest){
        restCountdown();
        startNewChallenge();
      }
      else{
        finishRestTime();
      }
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}