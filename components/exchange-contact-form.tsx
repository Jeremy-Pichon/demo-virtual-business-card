'use client'
import BottomSheet from '@/components/bottom-sheet';
import React, {useState} from 'react';
import InputField from '@/components/input-field';
import {ArrowPathIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';

const emailRegex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)

export default function ExchangeContactForm({
  isOpen,
  onClose,
  image,
  title
}: {
  isOpen: boolean
  onClose: (success?: boolean) => void
  image?: string
  title: string
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [content, setContent] = useState('')

  const [sending, setSending] = useState(false)

  const closeWithData = () => {
    setSending(true)
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, company, content })
    }).then((res) => {
      setSending(false)
      if (204 !== res.status) {
        onClose(false)
        return
      }
      setName('')
      setCompany('')
      setEmail('')
      setContent('')
      onClose(true)
    })
  }
  const isFormInvalid = () => name.trim().length < 5 || company.trim().length < 3 || !emailRegex.test(email.trim())

  return <BottomSheet
    isOpen={isOpen}
    onClose={() => onClose(undefined)}
    title={title}
    className='sticky bottom-0 w-[calc(100% + 32px)] -mx-4 pt-10'
  >
    { image && <div className='absolute top-0 w-full -mt-10 -ml-4'>
        <Image src={image} alt={`My profile picture`} width={100} height={100} className='w-20 h-20 border-8 border-white object-cover rounded-full overflow-hidden mx-auto' />
      </div>
    }

    <InputField name={'name'} label={'Name*'} onValue={setName} type={'text'} value={name} placeholder={'John Doe'} required={true} />
    <InputField name={'email'} label={'Email*'} onValue={setEmail} type={'email'} value={email} placeholder={'john.doe@your-company.com'} required={true} />
    <InputField name={'company'} label={'Company*'} onValue={setCompany} type={'text'} value={company} placeholder={'Google'} required={true} />
    <InputField name={'content'} label={'Content'} onValue={setContent} type={'text'} value={content} placeholder={'Optional custom message here.'} />

    <button type="button"
      className="w-full text-center rounded-md bg-primary mt-8 py-3 font-bold text-white disabled:bg-gray-500"
      disabled={sending || isFormInvalid()}
      onClick={closeWithData}
    >
      { sending
        ? <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block" role="status">
            <ArrowPathIcon className='w-8 h-8' />
          </div>
        </div>
        : 'Connect'
      }
    </button>
  </BottomSheet>
}
