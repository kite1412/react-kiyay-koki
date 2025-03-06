//Login Page Belum kelar nat

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
        <Content />
      </div>
    </div>
  );
}

const contentPadding = "absolute w-1/2 left-1/2 transform -translate-x-1/2";

function Content({ className = "" }) {
  return (
    <div
      className={`
      flex flex-col items-center justify-between top-[calc(40px*3+80px)] px-6
      ${contentPadding} gap-6 ${className}  
    `}>
      <LoginInfo />
      <LoginForm />
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
        terdaftar. Cukup masukkan nomor WhatsApp untuk melanjutkan.
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <form
      className={`
       flex flex-col items-center justify-center px-6
       gap-5`
      }>
      <label className="text-white  font-bold text-[18px]">
        Nomor WhatsApp
      </label>
      <input
        className="p-2 bg-black border-2 border-red-500 text-gray-500 rounded-md focus:outline-none"
        type="text"
        placeholder="0000 - 0000 - 0000"
      />
    </form>
  );
}
