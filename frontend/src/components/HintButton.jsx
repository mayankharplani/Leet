import { BotIcon,Send } from 'lucide-react'
import React,{useState} from 'react'




const HintButton = () => {
  return (
    <div className='bg-[var(--steel)] rounded-2xl px-6 py-4'>
      <div className='flex gap-3 items-center'>
        <BotIcon className='w-5 h-5 text-[var(--cream)]' />
        <h1 className='text-lg'   style={{color: "var(--cream)"}}>Gemini Bot</h1>
        <span className='text-xs text-gray-400'>(This Bot Provides you Only Hints) </span>
      </div>
      <hr className='mt-2 text-gray-400' />
      <div className='mt-30 flex flex-col gap-2 py-10 justify-center items-center opacity-40'>
        <BotIcon className='w-10 h-10'  />
        <h1 style={{color: "var(--cream)"}}>Ask Me Anything About Problem</h1>
      </div>
      <div className='mt-40'>
        <hr className='text-gray-400' />
        <div className='flex gap-2'>
          <input type="text" className='input mt-3 w-[85%] bg-[var(--navy)] text-[var(--cream)] rounded-lg opacity-100 py-1' 
        placeholder='Ask About Problem, Get Hints...'
        />
        <button className='flex gap-1 items-center justify-center mt-3 bg-[var(--beige)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-[var(--cream)] rounded-lg px-2 text-md w-20 h-9'>
          <Send className='w-5 h-5' />
          Ask
        </button>
        </div>
      </div>
    </div>
  )
}

export default HintButton