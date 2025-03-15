import React from "react";
import PageLayout from "../layouts/PageLayout";
import instagramLogo from "../assets/instagram.svg"
import tiktokLogo from "../assets/tiktok.svg"
import facebookLogo from "../assets/facebook.svg"

export default function ContactPage() {
  return <PageLayout content={
    <div className="flex">

      <iframe src="https://www.google.com/maps/embed?pb=!3m2!1sid!2sid!4v1741716968495!5m2!1sid!2sid!6m8!1m7!1sEmcyoivpJeZCplfaKnNkvA!2m2!1d-5.391047928710606!2d104.9607980924525!3f100.511314!4f0!5f0.7820865974627469" className="w-[28rem] max-md:w-[7rem] max-md:h-[7rem] h-[23rem] rounded-[5px] max-md:ml-[10rem] ml-[2rem]"></iframe>

      <div className="px-[2rem] text-justify max-md:text-[80%]">
        <p className="text-red-500 font-bold text-4xl max-md:text-xl">Hubungi Kami</p>
        <p className="max-md:w-[18ch]">Anda dapat menghubungi kami melalui whatapp, email, atau kunjungi sosial media Kami.</p> <br />
        <div className="flex gap-9 max-md:relative max-md:top-[2rem] max-md:right-[8rem]">
          <p>
            <span className="font-bold">Email</span> <br />
            kiyaygoldfish@gmail.com <br /> <br />
            <span className="font-bold">Sosial Media</span> <br />
            <div className="leading-[2.5rem]">
              <div className="flex">
                <img src={facebookLogo} alt="Facebook Logo" /> Kiyay_koki
              </div>
              <div className="flex">
                <img src={tiktokLogo} alt="Tiktok Logo"/> kiyay_koki
              </div>
              <div className="flex">
                <img src={instagramLogo} alt="Instagram Logo" /> Kiyay_koki
              </div>
            </div>
          </p>
          <div>
            <span className="font-bold">Nomor Whatsapp</span> <br />
            0895 4444 4444 <br /> <br />
            <span className="font-bold">Alamat</span> <br />
            Kiyay Koki Lampung, Pringsewu, 
            Bandar Lampung
          </div>
        </div>
      </div>
    </div>
  }/>
};