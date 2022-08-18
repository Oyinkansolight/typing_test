import AppContext from '../context';
import { Layout } from '../components'
import { WORD_LENGTH } from '../constants';
import { countWords, generateWords } from '../helpers';
import React, { useContext, useEffect, useRef, useState } from 'react';

export default function Start() {
    const { time, setTime, words, setWords, wordLength, setWordLength } = useContext(AppContext);

    const words_array = words.split(' ');

    const all_done = useRef(false);
    const [score, setScore] = useState(0);
    const [started, setStarted] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [typedWords, setTypedWords] = useState('');
    const [completed, setCompleted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPreloading, setIsPreloading] = useState(true);
    const [wrongIndexes, setWrongIndexes] = useState<{ [key: number]: number[] }>({});
    const [correctIndexes, setCorrectIndexes] = useState<{ [key: number]: number[] }>({});

    let split_words = words.split(' ');
    let mapped_index: { [key: number]: string } = {};
    let word_indexes: { [key: number]: string } = {};
    const maxScore = words.split(' ').join('').length;

    for (let index = 0; index < words.length; index++) {
        mapped_index[index] = words[index];
    }

    for (let index = 0; index < words.split(' ').length; index++) {
        const element = split_words[index];

        word_indexes[index] = element;
    }

    useEffect(() => {
        if (!words) {
            setWordLength(WORD_LENGTH);
            const new_words = generateWords(WORD_LENGTH);
            setWords(new_words);
        }

        if (words && isPreloading) {
            for (let index = 0; index < words.split(' ').length; index++) {
                setCorrectIndexes((correctIndexes) => {
                    return {
                        ...correctIndexes,
                        [index]: []
                    }
                })

                setWrongIndexes((wrongIndexes) => {
                    return {
                        ...wrongIndexes,
                        [index]: []
                    }
                })
            }

            setIsPreloading(false);
        }

        all_done.current = completed;

    }, [time, words, wordLength, setWordLength, setWords, currentIndex, typedWords, completed, setCompleted, isPreloading])

    const handleStart = () => {
        setStarted(true);

        let refreshIntervalId = setInterval(() => {
            setTime((time: number) => {
                if (all_done.current) {
                    clearInterval(refreshIntervalId);
                    return time;
                }

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
        if(check_ignored_keys(e)) return

        if (e.keyCode === 32 && typedWords[typedWords.length - 1] === ' ') return

        if (e.key === 'Backspace' && typedWords[typedWords.length - 1] !== ' ') {
            currentIndex > 0 && setCurrentIndex(currentIndex - 1);
            setTypedWords(typedWords.slice(0, -1));
            return;
        }

        if (e.key === 'Backspace' && typedWords[typedWords.length - 1] === ' ') return;

        if (wordIndex === words_array.length -1 && currentIndex === word_indexes[words_array.length -1].length -1 || completed) {
            setCompleted(true);
        }

        if (e.keyCode === 32) {
            setCurrentIndex(0)
            setWordIndex(wordIndex + 1)
        } else {
            setCurrentIndex(currentIndex + 1)
        }

        setTypedWords(typedWords + e.key);

        words_array[wordIndex][currentIndex] === e.key ? (
            setCorrectIndexes({ ...correctIndexes, [wordIndex]: [...correctIndexes[wordIndex], currentIndex] }),
            (!wrongIndexes[wordIndex].includes(currentIndex) && e.keyCode !== 32) && setScore(score + 1)
        ) : setWrongIndexes({ ...wrongIndexes, [wordIndex]: [...wrongIndexes[wordIndex], currentIndex] });

    }

    const check_ignored_keys = (e: any) => {
        const ignored_keys =
            [9,13, 16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];

        if (ignored_keys.includes(e.keyCode)) return true;
    }

    if (isPreloading) return <div>Preloading...</div>

    return (
        <Layout>
            <div className='flex flex-col gap-y-10 px-60 m-auto w-screen'>
                <div className={`text-5xl text-purple-800 ${time <= 5 && 'text-red-500'} font-bold text-right`}>
                    {time}
                </div>

                {(completed || String(time) === 'Time Up!') &&
                    <div>
                        <div className='text-6xl text-purple-800 font-bold text-right'>
                            Score: {score} / {maxScore}
                        </div>
                    </div>
                }

                <div className='w-full'>
                    <textarea
                        cols={20}
                        rows={10}
                        value={typedWords}
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
                    {words_array.map((word, index) => (
                        <span key={index}>
                            <span>
                                {word.split('').map((letter, i) => (
                                    <span key={i}
                                        className={`
                                    ${correctIndexes[index].includes(i) && 'text-green-500'}
                                    ${wrongIndexes[index].includes(i) && 'text-red-500'}
                                    ${index < wordIndex && !correctIndexes[index].includes(i) && 'text-red-500'}
                                    ${wordIndex === index && words_array[index][currentIndex] === letter && currentIndex === i && 'text-purple-500'}
                                    `}
                                    >
                                        {letter}
                                    </span>
                                ))}
                            </span>
                            <span> </span>
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
