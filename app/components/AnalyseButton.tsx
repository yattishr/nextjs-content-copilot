'use client'
import {useFormStatus} from "react-dom"
import { Button } from '@/components/ui/button'


function AnalyseButton() {
    const { pending } = useFormStatus()


  return (
    <div>
        <Button disabled={pending} 
            type="submit" 
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-8 py-6 text-lg rounded-full hover:opacity-90 transition-opacity">
            {pending ? 'Analysing...' : 'Get Started'}
        </Button>
    </div>
  )
}

export default AnalyseButton