import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
  const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
  const {resetCountdown} = useContext(CountdownContext);

  function handleChallengeSucceeded(){
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed(){
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`}/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button type="button" className={styles.challengeFailureButton} onClick={handleChallengeFailed}>
             deu ruim
            </button>
            
            <button type="button"  className={styles.challengeSucceededButton} onClick={handleChallengeSucceeded}>
              deu bom
            </button>
            
          </footer>

        </div>
      ):(
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="level=up"></img>
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  )
}