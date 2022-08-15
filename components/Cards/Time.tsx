import React from 'react'
import { TimeCardProps, TIMES } from '../../interface'
import { TIME_SELECTIONS } from '../../constants'

export default function TimeCard({ time, setTime, selected }: TimeCardProps) {
    const Times: TIMES = TIME_SELECTIONS;
    const selectedTime = Times[time];

    return (
        <div
            id='time_card'
            onClick={() => setTime(selectedTime)}
            className={`border-4 rounded-xl px-10 py-7 text-center cursor-pointer text-white font-bold text-3xl ${selected ? 'bg-purple-800 border-black' : 'bg-black border-purple-800'}`}
        >
            {time}
            <div className='text-white pt-2 text-xs'>Minute(s)</div>
        </div>
    )
}
