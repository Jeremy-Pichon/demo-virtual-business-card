import React from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline';

export default function BottomSheet({
  children,
  className,
  isOpen,
  onClose,
  title
}: {
  children?: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
  title: string
}) {
  if (!isOpen) {
    return <></>
  }

  return <>
    <div className='absolute top-0 left-0 w-screen h-[1822px] bg-black/50 z-10' onClick={onClose} />
    <div className={`${className} z-20 bg-white rounded-t-2xl p-4 drop-shadow-xl  border border-2 border-gray-200`}>
      <div className='flex'>
        <h4 className='text-xl font-bold mb-4 grow'>{title}</h4>
        <XMarkIcon className='w-8 h-8' onClick={onClose} />
      </div>
      {children}
    </div>
  </>
}
