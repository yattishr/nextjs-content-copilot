'use client'
import { FeatureFlag } from '@/features/flags'
import React from 'react'
import { useSchematicEntitlement, useSchematicIsPending } from '@schematichq/schematic-react'
import { Progress } from "@/components/ui/progress"

function Usage({
    featureFlag,
    title,
}: {
    featureFlag: FeatureFlag,
    title: string,
}) {

    const isPending = useSchematicIsPending()
    const {
        featureAllocation,
        featureUsage,
        value: isFeatureEnabled, 
    } = useSchematicEntitlement(featureFlag)

    const hasUsedAllTokens = featureUsage && featureAllocation && featureUsage >= featureAllocation

    if (isPending) {
        return <div className='text-gray-500 text-center py-4'>Loading...</div>
    }

    if (hasUsedAllTokens) { 
        return (
            
        <div className='bg-white rounded-2xl shadow-sm border border-red-100 p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
                <div className='px-4 py-2 bg-red-50 rounded-lg'>
                    <span className='font-medium text-red-700'>{featureUsage}</span>
                    <span className=' text-red-400 mx-2'>/</span>
                    <span className='font-medium text-red-700'>{featureAllocation}</span>

                </div>
            </div>

            <div className='relative'>
                <Progress value={featureUsage} max={featureAllocation} className='h-3 rounded-full bg-gray [&>*]:bg-red-600'/>
                <h2 className='text-xl font-semibold text-red-500'>{title} Limit Reached</h2>
                <p className='text-gray-500'>You have reached the limit of {title} for this billing cycle. Please Upgrade your plan.</p>
            </div>
        </div>
        )
    }

    if (!isFeatureEnabled) {
        return (
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-50'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
                    <div className='px-4 py-2 bg-gray-50 rounded-lg'>
                        <span className='text-gray-500'>Feature Disabled</span>
                    </div>
                </div>
                <div className='relative'>
                    <Progress value={0} className='h-3 rounded-full bg-gray-100'/>
                    <p className='text-sm text-gray-500 mt-2'>
                        Upgrade to use this feature
                    </p>

                </div>

            </div>
        )
    }

    const progress = ((featureUsage || 0)) / (featureAllocation || 1) * 100;

    const getProgressColor = (percent: number) => {
        if (percent >= 80) return "[&>*]:bg-red-600"
        if (percent >= 50) return "[&>*]:bg-yellow-500"
        return "[&>*]:bg-green-500"
    }

    const progressColor = getProgressColor(progress)

  return (
    <div>
        <div className='flex justify-between items-center mb-4 gap-4'>
            <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
            <div className='px-4 py-2 bg-gray-50 rounded-lg'>
                <span className='font-medium text-gray-700'>{featureUsage}</span>
                <span className=' text-gray-400 mx-2'>/</span>
                <span className='font-medium text-gray-700'>{featureAllocation}</span>
            </div>
        </div>

        <div className='relative'>
            <Progress 
                value={progress}
                className={`h-3 rounded-full bg-gray-100 ${progressColor}`}
            />

            {progress >= 100 ? (
                <p className='text-sm text-red-600 mt-2'>You have reached your usage limit.</p>
            ) : progress >= 80 ? (
                <p className='text-sm text-red-600 mt-2'>Warning: You are approaching your usage limit</p>
            ): null}
        </div>
    </div>
  )
}

export default Usage