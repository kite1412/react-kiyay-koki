import AppLogo from "./AppLogo";
import { JSX } from "react";
import FacebookLogo from "../assets/facebook.svg?react";
import TiktokLogo from "../assets/tiktok.svg?react";
import InstagramLogo from "../assets/instagram.svg?react";
import WhatsappLogo from "../assets/whatsapp.svg?react";

const iconSize = "h-[20px] w-[20px]";

const ourInformation = [
  { data: "kiyay_koki", icon:  <FacebookLogo className={iconSize} />},
  { data: "kiyay_koki", icon:  <TiktokLogo className={iconSize} />},
  { data: "kiyay_koki", icon:  <InstagramLogo className={iconSize} />},
  { data: "0895 4444 4444", icon:  <WhatsappLogo className={iconSize} />},
];

export default function Footer({ className = "" }) {
  return (
    <div className={`
      px-12 pt-12 pb-4 flex flex-col gap-8 items-center bg-black
      ${className} rounded-[10px]
    `}>
      <div className="flex justify-evenly w-full">
        <InformationSection 
          title={"Informasi Kami"}
          fields={
            ourInformation.map((v, _) => {
              return <Field value={v.data} leadingIcon={v.icon} />
            })
          }
        />
        <InformationSection 
          title={"Koleksi Produk"}
          fields={
            [
              <Field value={"Ikan Koki"} />,
              <Field value={"Akuarium"} />,
              <Field value={"Pakan Ikan"} />,
            ]
          }
        />
        <InformationSection 
          title={"Kiyay Koki"}
          fields={
            [
              <Field value={"-"} />,
              <span>
                Kiyay Koki Lampung,<br />Pringsewu, Bandar Lampung
              </span>,
              <Field value={"Copyright © 2025 Kiyay Koki"} />,
            ]
          }
        />
        <InformationSection 
          title={"Halaman"}
          fields={
            [
              <Field value={"Beranda"} />,
              <Field value={"Koleksi"} />,
              <Field value={"Kontak"} />,
              <Field value={"Tentang"} />,
            ]
          }
        />
      </div>
      <AppLogo className="py-4" />
    </div>
  );
}

/**
 * An individual information section inside the footer.
 * @param {string} title - the title of the section.
 * @param {Array<JSX.Element>} fields - fields/information contained in the section,
 *  typically use {@link Field} to define each field.
 */
function InformationSection({
  title,
  fields
}) {
  return (
    <div className="flex flex-col gap-4">
      <b className="text-[18px]">{title}</b>
      <div className="flex flex-col gap-3">
        {fields}
      </div>
    </div>
  );
}

/**
 * A field for {@link InformationSection}'s fields.
 * @param {string} value - the information itself. 
 * @param {JSX.Element} leadingIcon - an icon appear before the {@link value}.
 */
function Field({
  value,
  leadingIcon = <></>
}) {
  return (
    <div className="flex gap-2 items-center">
      {leadingIcon}
      {value}
    </div>
  );
}