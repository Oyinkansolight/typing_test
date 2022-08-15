import { createContext } from 'react'
import { generateWords } from '../helpers';

const AppContext = createContext({
    time: 0,
    words: generateWords(40),
    wordLength: 0,
    setTime: (time: number | ((time: number) => string | number)) => { },
    setWords: (text: string) => { },
    setWordLength: (number: number) => { }
});

export default AppContext;