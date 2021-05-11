import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';


interface HomeProps{
  name: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      name={props.name}
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | devHealthy</title>
        </Head>
        
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const {name, level, currentExperience, challengesCompleted} = ctx.req.cookies;

  if (!name) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props:{
      name: name,
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}