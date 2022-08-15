import AppContext from '../context';
import { Layout } from '../components'
import { WORD_LENGTH } from '../constants';
import { countWords, generateWords } from '../helpers';
import React, { useContext, useEffect, useState } from 'react';

export default function Start() {
    const { time, setTime, words, setWords, wordLength, setWordLength } = useContext(AppContext);
    const [score, setScore] = useState(0);
    const [started, setStarted] = useState(false);
    const [typedWords, setTypedWords] = useState('');
    const [completed, setCompleted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wrongIndexes, setWrongIndexes] = useState<number[]>([]);
    const [correctIndexes, setCorrectIndexes] = useState<number[]>([]);

    useEffect(() => {
        if (!words) {
            setWordLength(WORD_LENGTH);
            const new_words = generateWords(WORD_LENGTH);
            setWords(new_words);
        }

        console.log(completed);
        console.log(currentIndex, words.length);
    }, [time, words, wordLength, setWordLength, setWords, currentIndex, wrongIndexes, correctIndexes, typedWords, completed, setCompleted])

    const handleStart = () => {
        setStarted(true);

        let refreshIntervalId = setInterval(() => {
            setTime((time: number) => {
                // if (all_done) {
                //     clearInterval(refreshIntervalId);
                //     return time;
                // }

                if (time === 0) {
                    clearInterval(refreshIntervalId)
                    return 'Time Up!';
                }
                else if (time && completed) {
                    clearInterval(refreshIntervalId)
                    return 'Completed!';
                }
                else {
                    return time - 1
                }
            })
        }, 1000)
    }

    const handleTyping = (e: any) => {
        check_ignored_keys(e);
        
        if (e.key === 'Backspace') {
            currentIndex > 0 && setCurrentIndex(currentIndex - 1);
            setTypedWords(typedWords.slice(0, -1));
            return;
        }

        if (currentIndex === words.length || completed) {
            setCompleted(true);
        }

        currentIndex < words.length && setCurrentIndex(currentIndex + 1);

        setTypedWords(typedWords + e.key);
        words[currentIndex] === e.key ? (
            setCorrectIndexes([...correctIndexes, currentIndex]),
            (!wrongIndexes.includes(currentIndex) && e.keyCode !== 32) && setScore(score + 1)
        ) : setWrongIndexes([...wrongIndexes, currentIndex]);
    }

    const check_ignored_keys = (e: any) => {
        const ignored_keys =
            [13, 16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];

        if (ignored_keys.includes(e.keyCode)) return;
    }

    return (
        <Layout>
            <div className='flex flex-col gap-y-10 px-60 m-auto w-screen'>
                <div className={`text-5xl text-purple-800 ${time <= 5 && 'text-red-500'} font-bold text-right`}>
                    {time}
                </div>

                {(completed || String(time) === 'Time Up!') &&
                    <div>
                        <div className='text-6xl text-purple-800 font-bold text-right'>
                            Score: {score}
                        </div>
                    </div>
                }

                <div className='w-full'>
                    <textarea
                        cols={20}
                        rows={10}
                        onKeyDown={handleTyping}
                        placeholder='Start Test To Begin Typing....'
                        disabled={
                            !started ||
                            completed ||
                            String(time) === 'Time Up!' ||
                            wordLength + 1 === countWords(typedWords)}
                        className='rounded-lg py-6 px-4 border-2 border-purple-800 w-full text-xl'
                    />
                </div>

                <div className='text-xl font-medium shadow-2xl rounded-xl p-10 leading-loose'>
                    {words.split("").map((word, index) => (
                        <span
                            key={index}
                            className={`
                        ${correctIndexes.includes(index) && 'text-green-500'}
                        ${wrongIndexes.includes(index) && 'text-red-500'}
                        ${currentIndex === index && 'text-purple-500'}
                        `}>
                            {word}
                        </span>
                    ))}
                </div>

                <div className=''>
                    <button
                        onClick={handleStart}
                        className='bg-purple-800 hover:bg-purple-700 rounded-xl py-2 w-full text-2xl text-white'
                        disabled={started || completed || String(time) === 'Time Up!' || wordLength + 1 === countWords(typedWords)}
                    >
                        Start Test
                    </button>
                </div>
            </div>
        </Layout>
    )
}
