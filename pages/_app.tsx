import '../styles/globals.css';
import AppContext from '../context';
import type { AppProps } from 'next/app';
import { useMemo, useState } from 'react';
import { TIME_SELECTIONS, WORD_LENGTH } from '../constants';

function MyApp({ Component, pageProps }: AppProps) {
  const [time, setTime] = useState<any>(TIME_SELECTIONS[1]);
  const [words, setWords] = useState('');
  const [wordLength, setWordLength] = useState(WORD_LENGTH);

  const values = useMemo(
    () => ({ time, setTime, words, setWords, wordLength, setWordLength }),
    [time, words, wordLength]
  );

  return (
    <AppContext.Provider value={values}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
