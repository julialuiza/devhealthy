import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile(){
  const {level, name} = useContext(ChallengesContext);
  
  return(
    <div className={styles.profileContainer}>
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}