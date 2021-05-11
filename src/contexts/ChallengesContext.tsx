import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from "../components/LevelUpModal";


interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData{
  name: String;
  level: number;
  currentExperience: number; 
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
  children: ReactNode;
  name: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [name, setName] = useState(rest.name ?? '');
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level +1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  },[])

  useEffect(() => {
    Cookies.set('name', name.toString());
    Cookies.set('level', level.toString());
    Cookies.set('currentExperience', currentExperience.toString());
    Cookies.set('challengesCompleted', challengesCompleted.toString());
  }, [name, level, currentExperience, challengesCompleted])

  function levelUp(){
    setLevel(level+1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('./notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp`
      });
    }
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completeChallenge(){
     if (!activeChallenge){
       return ;
     }

     const {amount} = activeChallenge;
     let finalExperience = currentExperience + amount;
     if (finalExperience >= experienceToNextLevel){
       finalExperience = finalExperience - experienceToNextLevel;
       levelUp();
     }
     setChallengesCompleted(challengesCompleted+1);
     setCurrentExperience(finalExperience);
     setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider 
    value = {{ 
      name,
      level, 
      currentExperience, 
      challengesCompleted, 
      experienceToNextLevel,
      activeChallenge,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal
    }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal></LevelUpModal>}
    </ChallengesContext.Provider>
  );
}