import { BotIcon } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <section className='py-20 px-4 md:px-0 bg-gradient-to-r from-purple-600 to-purple-400'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-white mb-6 flex items-center justify-center'>
          Prepare to meet your AI Content Agent <BotIcon className='ml-2' />
        </h2>
        <p className='text-xl text-blue-50'>Join thousands of creators already leveraging AI to unlock content insights.</p>
      </div>
    </section>
  )
}

export default Footer