'use client'

import Image from 'next/image';
import {
  AtSymbolIcon,
  BriefcaseIcon, CalendarDaysIcon,
  ChevronRightIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import ExchangeContactForm from '@/components/exchange-contact-form';
import {useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import { data } from '@/data';

export default function Home() {

  const [isExchangeContactOpen, setExchangeContactOpen] = useState(false)

  const onExchangeContactFormClose = (success?: boolean) => {
    if (undefined === success) {
      setExchangeContactOpen(false)
      return;
    }
    if (success) {
      toast.success('Contact shared!', { icon: '🚀' })
      setExchangeContactOpen(false)
    }
    else {
      toast.error('Failed to send email...')
      setExchangeContactOpen(true)
    }
  }

  return (
    <main className={`px-4 pt-10 max-w-xl mx-auto`}>
      {/* Hero */}
      <div className='relative flex rounded-2xl overflow-hidden drop-shadow-lg'>
        <Image src={data.image} width={100} height={100} alt={`Image of ${data.name}`} className='w-5/12 max-h-80 object-cover' />
        <div className='bg-blue-200 w-7/12 flex justify-center flex-col px-4 bg-black'>
          <h1 className='text-white text-2xl font-bold font-title mb-6'>
            { data.name }
          </h1>
          <p className='text-gray-400 font-light'>
            <BriefcaseIcon className='w-4 h-4 inline-block mr-1 align-middle' />
            <span className='align-middle'>{data.position}</span>
          </p>
          <p className='text-gray-400 font-light'>
            <MapPinIcon className='w-4 h-4 inline-block mr-1 align-middle' />
            <span className='align-middle'>{data.location}</span>
          </p>
        </div>
        {/* shine box */}
        <div className="animate-shinny absolute top-0 -inset-full h-full w-1/6 z-5 block transform -skew-x-20 bg-gradient-to-r from-transparent to-white opacity-30" />
      </div>

      {/* CTA */}
      <div className='mt-6 grid grid-cols-12 gap-2'>
        <Link href={data.vcard}
          className="col-span-5 text-center rounded-md border border-gray-300 bg-white py-3 font-bold text-gray-700"
        >
          Save Contact
        </Link>
        <button type="button" onClick={() => setExchangeContactOpen(true)}
          className="col-span-7 text-center rounded-md bg-primary py-3 font-bold text-white"
        >
          Exchange Contact
        </button>
      </div>

      {/* About */}
      <div className='mt-8'>
        <h1 className='text-xl font-bold'>Hi there 👋</h1>
        <p className='text-gray-500' dangerouslySetInnerHTML={{ __html: data.about }}
        />
      </div>

      {/* Social networks */}
      <div className='mt-8'>
        <h1 className='text-xl font-bold'>Social networks</h1>
        <div className='mx-auto grid grid-cols-3'>
          { data.socials.map((social, idx) => (
            <span key={idx} className='mx-auto'>
              <Link className='mx-4 mt-4 p-4 inline-block bg-gray-100 rounded-lg' href={social.link} target='_blank'>
                <Image src={`/social/${social.type}.svg`} width={10} height={10} alt={``} className='w-8 h-8' />
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className='mt-8'>
        <h1 className='text-xl font-bold'>Links</h1>
        <div className='grid grid-cols-1 mt-2 gap-y-3 divide-y'>
          { data.links.map((work, idx) => (
            <div key={idx} className='flex text-sm font-semibold pt-3'>
              <Image src={`/links/${work.thumbnail}`} width={10} height={10} alt={``} className='w-10 h-10 inline-block mr-2' />
              <Link href={work.link} className={`my-auto grow ${'#' !== work.link ? '' : 'text-gray-500 hover:cursor-default'}`} target='_blank'>{ work.title }</Link>
              { '#' !== work.link && <Link href={work.link} target='_blank' className='my-auto'><ChevronRightIcon className='w-6 h-6' /></Link>}
            </div>
          ))}
        </div>
      </div>

      {/* Video */}
      { data.video && <div className='mt-8'>
          <h1 className='text-xl font-bold'>Video</h1>
          <div className='mt-4'>
            <iframe src={data.video} className='w-full h-80 rounded-lg overflow-hidden' />
          </div>
        </div>
      }

      {/* Contact information */}
      <div className='mt-8'>
        <h1 className='text-xl font-bold'>Contact information</h1>
        <div className='grid grid-cols-1 mt-2 gap-y-3 divide-y'>
          <div className='flex text-sm font-semibold pt-3'>
            <Image src={`/icons/website.svg`} width={10} height={10} alt={``} className='w-6 h-6 inline-block mr-2' />
            <Link href={data.website} target='_blank' className='grow'>{ data.website.replace(/https:\/\/www\.|\//gi, '') }</Link>
            <Link href={data.website} target='_blank'><ChevronRightIcon className='w-6 h-6' /></Link>
          </div>
          <div className='flex text-sm font-semibold pt-3'>
            <AtSymbolIcon className='w-6 h-6 inline-block mr-2' />
            <Link href={`mailto:${data.email}`} className='grow'>{ data.email }</Link>
            <Link href={`mailto:${data.email}`}><ChevronRightIcon className='w-6 h-6' /></Link>
          </div>
          <div className='flex text-sm font-semibold pt-3'>
            <MapPinIcon className='w-6 h-6 inline-block mr-2' />
            <Link href={`https://maps.google.com/?q=${encodeURIComponent(data.location)}`} target='_blank' className='grow'>
              { data.location }
            </Link>
            <Link href={`https://maps.google.com/?q=${encodeURIComponent(data.location)}`} target='_blank'>
              <ChevronRightIcon className='w-6 h-6' />
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className='mt-6' />
      <div className="sticky bottom-0 w-[calc(100% + 32px)] h-20 -mx-4 px-4 bg-black">
        <div className='mt-6 grid grid-cols-5 gap-2'>
          <button type="button" onClick={() => setExchangeContactOpen(true)}
            className="col-span-4 mt-4 text-center rounded-md bg-primary py-3 font-bold text-white">
            Exchange Contact
          </button>
          <Link href={data.calendar}>
            <CalendarDaysIcon className="col-span-1 text-white w-12 h-12 mx-auto mt-4" />
          </Link>
        </div>
      </div>


      {/* BottomSheet */}
      <ExchangeContactForm
        isOpen={isExchangeContactOpen}
        onClose={onExchangeContactFormClose}
        title={`Share information with ${data.name.split(' ')[0]}`}
        image={data.image}
      />

      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </main>
  )
}
