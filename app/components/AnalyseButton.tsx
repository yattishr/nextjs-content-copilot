'use client'
import {useFormStatus} from "react-dom"
import { Button } from '../../components/ui/button'


function AnalyseButton() {
    const { pending } = useFormStatus()


  return (
    <div>
        <Button disabled={pending} 
            type="submit" 
            className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium">
            {pending ? 'Analysing...' : 'Try it Free'}
        </Button>
    </div>
  )
}

export default AnalyseButton