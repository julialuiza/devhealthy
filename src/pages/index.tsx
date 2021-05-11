import { useContext, useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/pages/SignIn.module.css';


export default function SignIn() {
  const [name, setName] = useState('');
  const router = useRouter();

  function handleUserName(name: string){
    Cookies.set('name', name.toString());
    router.push('/home');
  }
  
  useEffect(() => {
    if(name != ''){
      router.push('/home');
    }
  },[])

  return (
      <div className={styles.container}>
        <Head>
          <title>Bem-vinde | devHealthy</title>
        </Head>
        <section>
          <div className={styles.containerLogo}>
            <img src="apresentation.svg" alt="screenshoots das telas do sistema" height="200px" width="200px"/>
          </div>
          <div>
            <p>Bem-vinde</p>
            <span>Insira seu nome abaixo para começar</span>
            <div className={styles.containerLogin}>
              <input 
                type="text"
                placeholder="Digite seu nome"
                onChange={event => setName(event.target.value)}>  
              </input>
              <button onClick={() => handleUserName(name)}>
                <img src="arrow.svg" alt="seta para confirmar entrada" width="15px"/>
              </button>
            </div>
          </div>
        </section>
      </div>
  )
}
