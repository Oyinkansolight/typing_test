import type { NextPage } from 'next'
import { useContext } from 'react';
import AppContext from '../context';
import { Layout } from '../components';
import { useRouter } from 'next/router';
import { TimeCard } from '../components/Cards';
import { countWords, generateWords } from '../helpers';

const Home: NextPage = () => {
  const router = useRouter();
  const {time, setTime, words, setWords, setWordLength} = useContext(AppContext)

  const handleSetTime = (time: number) => {
    setTime(time);
  }

  const handleSetCustomTime = (time: number) => {
    if (time <= 0) return
    if (time === NaN || '') setTime(60)

    const custom_time = time * 60;
    setTime(custom_time);
  }

  const handleCustomWords = (custom_words: string) => {
    setWords(custom_words);
    setWordLength(countWords(custom_words));
  }

  const handleStart = () => {
    if (words === '') {
      setWordLength(40);
      const new_words = generateWords(40);
      setWords(new_words);
    }
    router.push('/start');
  }

  const one_minute = time === 60;
  const two_minutes = time === 120;
  const five_minutes = time === 300;

  return (
    <Layout>
      <main className="m-auto">
        <div className='flex flex-col justify-center gap-y-2 w-full'>
          <div className='text-9xl text-purple-800 font-bold'>Welcome!</div>
          <div className='text-2xl text-center font-light -mt-4'>To Your Typing Test!</div>

          <div className='text-center animate-bounce font-serif text-lg mt-4'>Select Duration</div>

          <div className='flex flex-row justify-center gap-x-10'>
            <TimeCard time={1} setTime={handleSetTime} selected={one_minute} />
            <TimeCard time={2} setTime={handleSetTime} selected={two_minutes} />
            <TimeCard time={5} setTime={handleSetTime} selected={five_minutes} />
          </div>

          <div className='flex flex-row my-6 mx-auto gap-x-4'>
            <div className='my-auto font-medium'>Enter Custom Time (In Minutes)</div>
            <div>
              <input
                type="number"
                // value={time / 60 || 1}
                onChange={(e) => {
                  let custom_time = e.target.value;
                  custom_time === '' && (custom_time = '1');
                  handleSetCustomTime(parseInt(custom_time))
                }}
                className='border-2 border-purple-800 rounded-lg p-2 text-xl'
              />
            </div>
          </div>

          <div className='flex flex-col gap-y-4 mb-6 mx-auto'>
            <div className='my-auto font-medium'>Enter Custom Challenge:</div>
            <div>
              <textarea
                rows={5}
                cols={55}
                // value={words}
                onChange={(e) => handleCustomWords(e.target.value)}
                className='border-2 border-purple-800 rounded-lg px-2 py-4'
              />
            </div>
          </div>

          <div className='flex flex-row gap-x-10 mx-auto mt-6'>
            <button
              onClick={handleStart}
              className='px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg'>
              Click Here To Get Started
            </button>
          </div>
        </div>
      </main>

    </Layout>
  )
}

export default Home
