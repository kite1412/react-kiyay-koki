import React from 'react';
import PageLayout from '../layouts/PageLayout';
import orandaRoseTail from '../assets/oranda-rose-tail.png'
import fishSample2 from '../assets/fish-sample-2.png'
import Akuarium from '../assets/Akuarium.jpg'

export default function AboutPage() {
  return <PageLayout content={
    <div className='block  max-md:text-[100%]'>
      <div className='flex w-[90%]'>
        <div className='w-full px-[2rem] ml-[1rem] max-md:w-[15rem] max-md:ml-[3rem] py-[.8rem]'>
          <div className='overflow-hidden h-[9rem] max-md:h-[3rem] rounded-[1rem] relative right-4 bottom-2'>
            <img src={orandaRoseTail} alt="oranda-rose-tail.png" className=''/>
          </div>
          <div className='overflow-hidden h-[9rem] max-md:h-[3rem] rounded-[1rem] relative left-4'>
            <img src={Akuarium} alt="Akuarium" className='scale-x-[-1]'/>
          </div>
          <div className='overflow-hidden h-[9rem] max-md:h-[3rem] rounded-[1rem] relative right-4 top-2 '>
            <img src={fishSample2} alt="fish-sample-2.png"/>
          </div>
        </div>
        <div className='text-justify px-[.5rem] max-md:w-[35ch] max-md:text-[55%]'>
          <p className=' max-md:leading-[1.2rem]'>Selamat datang di <span className='text-red-500 font-bold'>Kiyay Goldfish</span>, destinasi terbaik untuk para pecinta ikan koki!</p> <br />
          <p className=' max-md:leading-[1.2rem]'>Kami menyediakan ikan koki berkualitas tinggi, akuarium modern, dan makanan ikan premium untuk memastikan ikan hias kesayangan tumbuh sehat dan indah.</p> <br />
          <div className='max-md:relative max-md:w-[55ch] max-md:right-[10rem]'>
            <p className='font-bold'>Mengapa Memilih Kami?</p> <br />
            <ul className='list-disc ml-[1.5rem]'>
              <li>Ikan Berkualitas – Dipilih langsung dari peternak terbaik dengan kesehatan terjamin.</li>
              <li>Akuarium – Desain estetis dan fungsional untuk habitat ideal ikan koki.</li>
              <li>Makanan Bergizi – Formula khusus untuk pertumbuhan optimal dan warna lebih cerah.</li>
              <li>Kemudahan Berbelanja – Tidak perlu membuat akun, cukup masukkan nomor WhatsApp!</li>
              <li>Gratis Pengiriman – Dapatkan pengiriman gratis ke lokasi tertentu (S&K berlaku).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  } />
};
