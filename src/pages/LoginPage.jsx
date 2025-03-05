//Login Page Belum kelar nat

import RoundedButton from "../components/RoundedButton";

export default function LoginPage() {
  return (
    <div
      className={`
            h-full w-full
          `}>
      <div className="select-none relative">
        <div
          className={`
              absolute inset-0 bg-gradient-to-tr from-[rgb(40,40,40)] to-dark-teal-blue
              mix-blend-multiply
            `}
        />
        <Landing />
      </div>
    </div>
  );
}

const contentPadding = "absolute w-1/2 left-1/2 transform -translate-x-1/2";

function Landing({ className = "" }) {
  return (
    <div
      className={`
      flex flex-col items-center justify-between top-[calc(40px*3+80px)] px-6
      ${contentPadding} gap-6 ${className}  
    `}>
      <BrandIntroduction />
      <LoginForm />
    </div>
  );
}

function BrandIntroduction() {
  return (
    <div className="flex flex-col gap-6 text-center items-center">
      <div className="font-bold text-4pxl text-[32px]">
        <div className="text-primary">Masuk & Daftar</div>
      </div>
      <div>
        Anda tidak perlu membuat akun, nomor WhatsApp Anda akan otomatis
        terdaftar. Cukup masukkan nomor WhatsApp untuk melanjutkan.
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <form
      className={`flex flex-col items-center justify-center top-[calc(40px*3+240px)] px-6
       gap-5`}>
      <label className="text-white  font-bold text-[18px]">
        Nomor WhatsApp
      </label>
      <input
        //   classname doesnt work help
        className="p-2 bg-black border-2 border-red-500 text-gray-500 rounded-md focus:outline-none"
        type="text"
        placeholder="0000 - 0000 - 0000"
      />
    </form>
  );
}
