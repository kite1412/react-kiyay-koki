import { useEffect, useRef, useState } from "react";
import RoundedButton from "../components/RoundedButton";
import PageLayout from "../layouts/PageLayout";

/**
 * @param {(number) => void} onPhoneNumberConfirm - confirm callback with phone number as parameter. 
 * @param {(number) => void} onOtpConfirm - confirm callback with otp code as parameter. 
 */
export default function LoginPage({ onPhoneNumberConfirm, onOtpConfirm }) {
  return <PageLayout 
    content={
      <Content 
        onPhoneNumberConfirm={onPhoneNumberConfirm}
        onOtpConfirm={onOtpConfirm}
      />
    }
    useFooter={false} 
  />;
}

function Content({ onPhoneNumberConfirm, onOtpConfirm }) {
  const [otpMode, setOtpMode] = useState(false);

  return (
    <div
      className={`
        flex flex-col items-center top-[calc(40px*3+80px)] px-6
        gap-10 w-full h-full
      `}
    >
      {
        !otpMode ? <>
          <Instruction 
            title={"Masuk & Daftar"}
            desc={
              <div>
                Anda tidak perlu membuat akun, nomor WhatsApp Anda akan otomatis
                terdaftar. <br /> Cukup masukkan nomor WhatsApp untuk melanjutkan.
              </div>
            }
          />
          <LoginForm 
            onConfirm={ n => {
              setOtpMode(true);
              onPhoneNumberConfirm(n);
            }} 
          />
        </> : <>
          <Instruction 
            title={"Verifikasi Nomor Whatsapp"}
            desc={
              <div>
                Kami telah mengirimkan kode OTP ke nomor WhatsApp Anda.
                <br />Masukkan kode tersebut untuk melanjutkan.
              </div>
            }
          />
          <OtpForm onConfirm={onOtpConfirm} />
        </>
      }
    </div>
  );
}

function Instruction({ title, desc }) {
  return (
    <div className="flex flex-col gap-6 text-center items-center">
      <div className="font-bold text-4pxl text-[32px]">
        <div className="text-primary">{title}</div>
      </div>
      <div>
        {desc}
      </div>
    </div>
  );
}

function handleEnterKeyDown(e, callback) {
  if (e.key === "Enter") callback();
}

function LoginForm({ onConfirm }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const onClick = () => onConfirm(phoneNumber);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div
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
            rounded-md focus:outline-none text-white ${ phoneNumber ? "not-italic" : "italic" }
          `}
          ref={el => (ref.current = el)}
          type="number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          placeholder="0000 0000 0000"
          onKeyDown={e => {
            if (phoneNumber && phoneNumber > 0) handleEnterKeyDown(e, onClick);
          }}
        />
      </div>
      <RoundedButton 
        action={"Konfirmasi Nomor"}
        onClick={onClick}
        className={"w-fit mt-6 mx-auto"}
        disabled={!phoneNumber || phoneNumber <= 0}
      />
    </div>
  );
}

function OtpForm({ onConfirm }) {
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(6).fill(""));
  const refs = useRef([]);

  const onValueChange = (index, value) => {
    if (!/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpLength - 1) refs.current[index + 1].focus();
  };

  const onBackspaceDown = (event, index) => {
    if (event.key === "Backspace") {
      const temp = [...otp];
      temp[index] = "";
      setOtp(temp);
      if (index > 0) refs.current[index - 1].focus();
    }
  };

  const onClick = () => {
    for (let i = 0; i < otpLength; i++) {
      if (!otp[i]) {
        refs.current[i].focus();
        break;
      }
    }
  };

  useEffect(() => {
    if (refs.current.length != 0) refs.current[0].focus();
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-col gap-2">
        <b>Masukkan OTP</b>
        <div className="flex gap-2">
          {
            otp.map((digit, index) => {
              return <SingleNumberInput
                key={index}
                ref={el => (refs.current[index] = el)}
                onValueChange={n => onValueChange(index, n)}
                value={digit}
                onKeyDown={e => onBackspaceDown(e, index)}
                onClick={onClick}
              />
            })
          }
        </div>
      </div>
      <RoundedButton 
        action={"Konfirmasi OTP"}
        onClick={onConfirm}
        className={"w-fit"}
      />
      <div className={`
        underline italic text-blue-500 hover:cursor-pointer hover:opacity-70 select-none
      `}>
        Kirim Ulang Kode OTP
      </div>
    </div>
  );
}

/**
 * @param {any} key - key of the input element. 
 * @param {(React.RefObject<HTMLInputElement>) => void} ref - ref of this component. 
 * @param {number} value - value of the input element. 
 * @param {(number) => void} onValueChange - callback function when {@link value} change. 
 */
function SingleNumberInput({
  key,
  ref,
  value,
  onValueChange,
  onKeyDown,
  onClick
}) {
  return (
    <input 
      value={value}
      onChange={e => onValueChange(e.target.value)}
      key={key}
      ref={ref}
      maxLength={1}
      className={`
        rounded-[8px] h-[60px] w-[60px] border-2 border-primary bg-black text-[30px] text-center
      `}
      onKeyDown={onKeyDown}
      type="text"
      onClick={onClick}
    />
  );
}