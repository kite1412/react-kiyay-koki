import { useState } from "react";
import RoundedButton from "../components/RoundedButton";
import PageLayout from "../layouts/PageLayout";

/**
 * @param {(number) => void} onConfirm - confirm callback with phone number as parameter. 
 */
export default function LoginPage({ onConfirm }) {
  return <PageLayout 
    content={<Content onConfirm={onConfirm} />}
    useFooter={false} 
  />;
}

function Content({ onConfirm }) {
  return (
    <div
      className={`
        flex flex-col items-center top-[calc(40px*3+80px)] px-6
        gap-10 w-full h-full
      `}
    >
      <LoginInfo />
      <LoginForm onConfirm={onConfirm} />
    </div>
  );
}

function LoginInfo() {
  return (
    <div className="flex flex-col gap-6 text-center items-center">
      <div className="font-bold text-4pxl text-[32px]">
        <div className="text-primary">Masuk & Daftar</div>
      </div>
      <div>
        Anda tidak perlu membuat akun, nomor WhatsApp Anda akan otomatis
        terdaftar. <br /> Cukup masukkan nomor WhatsApp untuk melanjutkan.
      </div>
    </div>
  );
}

/**
 * @param {(number) => void} onConfirm - callback function when confirm button clicked 
 *  with phone number as the param. 
 */
function LoginForm({ onConfirm }) {
  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <form
      className={`
        flex flex-col gap-3 w-1/2
      `}
    >
      <label className="text-white font-bold text-[18px]">
        Nomor WhatsApp
      </label>
      <div className="flex gap-3 w-full">
        <b className="p-4 rounded-[8px] bg-primary">
          +62
        </b>
        <input
          className={`
            p-4 bg-black border-2 w-full border-red-500
            rounded-md focus:outline-none text-white  
          `}
          type="number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          placeholder="0000 - 0000 - 0000"
        />
      </div>
      <RoundedButton 
        action={"Konfirmasi Nomor"}
        onClick={() => onConfirm(phoneNumber)}
        className={"w-fit mt-6 mx-auto"}
        disabled={!phoneNumber || phoneNumber <= 0}
      />
    </form>
  );
}
