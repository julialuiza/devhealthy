import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){
  const {currentExperience, experienceToNextLevel} = useContext(ChallengesContext);
  
  const calcNextLevel = Math.round((currentExperience * 100 / experienceToNextLevel))
  const percentToNextLevel =  calcNextLevel > 0 ? calcNextLevel : 0;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience} xp</span>
      </div>
      <span>{experienceToNextLevel} px</span>
    </header>
  );
}