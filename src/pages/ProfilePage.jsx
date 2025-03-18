import PageLayout from "../layouts/PageLayout";
import User from "../assets/user.svg?react";
import { mockUser } from "../data/mocks";
import RoundedButton from "../components/RoundedButton";
import SignOut from "../assets/sign-out.svg?react";
import { ModalType, useModal } from "../contexts/ModalContext";
import Cancel from "../assets/cancel.svg?react";
import _TextField, { Accessory } from "../components/TextField";
import OutlinedButton from "../components/OutlinedButton";

export default function ProfilePage() {
  return <PageLayout 
    content={
      <div className="flex flex-col gap-8">
        <h2 className="font-bold">Profile</h2>
        <ProfileBox user={mockUser} />
        <SignOutButton className="ms-4 size-fit" />
      </div>
    }
  />;
}

/**
 * Form to fill address information.
 * @param {Object | null} address
 */
export function AddressForm({ address, onCancel }) {
  const buttonVerticalPadding = 4;

  return (
    <div className={`
      border-2 border-primary bg-black rounded-[8px]
      max-w-[1000px] w-[80%] h-[80%] overflow-y-auto
      flex flex-col gap-2 items-center p-8 pb-16
    `}>
      <RoundedButton 
        action={<Cancel className={"size-[18px]"} />}
        verticalPadding={12}
        horizontalPadding={12}
        className={`ml-auto`}
        onClick={onCancel}
      />
      <div className="flex flex-col gap-14 items-center text-center px-8">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-light-orange">
            {
              address ? "Edit Alamat Pengiriman" : "Masukkan Alamat Anda"
            }
          </h1>
          <p>
            {
              address ? "Perbarui informasi alamat jika ada perubahan. Pastikan semua data sudah benar sebelum menyimpan."
                : "Lengkapi detail alamat pengiriman dengan benar untuk memastikan pesanan tiba dengan tepat waktu. Pastikan nomor WhatsApp aktif untuk kemudahan konfirmasi pengiriman."
            }
          </p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <RowFields>
            <TextField 
              label={"Nama Penerima"}
              placeholder={"Masukkan nama pemilik alamat"}
            />
            <TextField 
              label={"Nomor Whatsapp"}
              placeholder={"0000 0000 0000"}
              leading={<Accessory text={"+62"} />}
            />
          </RowFields>
          <RowFields>
            <TextField 
              label={"Provinsi"}
              placeholder={"Masukkan Provinsi"}
            />
            <TextField 
              label={"Kota/Kabupaten"}
              placeholder={"Masukkan kota/kabupaten"}
            />
          </RowFields>
          <RowFields>
            <TextField 
              label={"Kecamatan"}
              placeholder={"Masukkan Kecamatan"}
            />
            <TextField 
              label={"Kode Pos"}
              placeholder={"Masukkan kode pos"}
            />
          </RowFields>
          <TextField 
            label={"Alamat Lengkap"}
            placeholder={"Masukkan Nama Jalan, Gedung, No. Rumah"}
            half={false}
          />
          <TextField 
            label={"Detail Tambahan"}
            placeholder={"Masukkan Detail Lainnya (Cth: Blok/Unit No., Patokan)"}
            half={false}
          />
        </div>
        <div className="flex gap-6 ml-auto">
          <OutlinedButton 
            action={"Batal"}
            onClick={onCancel}
            verticalPadding={buttonVerticalPadding}
          />
          <RoundedButton 
            action={"Simpan Alamat"}
            onClick={() => {}}
            fullyRounded={false}
            verticalPadding={buttonVerticalPadding}
          />
        </div>
      </div>
    </div>
  );
}

function RowFields({ children }) {
  return (
    <div className="flex justify-center gap-4 w-full flex-wrap">
      {children}          
    </div>
  );
}

function TextField({
  label,
  value,
  setValue,
  placeholder,
  leading,
  trailing,
  half = true
}) {
  return <_TextField 
    label={label}
    value={value}
    setValue={setValue}
    placeholder={placeholder}
    leading={leading}
    trailing={trailing}
    className={`
      ${half ? "w-[49%]" : "w-[100%]"} max-lg:w-[100%]  
    `}
  />;
}

function ProfileBox({ user }) {
  const { createModal } = useModal();

  return (
    <div className="flex flex-col bg-black rounded-[8px] p-8 gap-12">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <User 
            className="bg-primary rounded-full p-2 size-[42px]"
          />
          <b className="text-[18px]">{user.phoneNumber}</b>
        </div>
        <hr />
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between items-center">
          <b className="text-[18px]">Daftar Alamat</b>
          <RoundedButton 
            action={"Tambah Alamat"}
            fullyRounded={false}
            verticalPadding={4}
            horizontalPadding={12}
            onClick={() => {
              const { request, dismiss } = createModal(
                ModalType.ADDRESS_FORM,
                {
                  address: null,
                  onCancel: () => {
                    dismiss();
                  }
                }
              )
              request();
            }}
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {
            user.addresses.map(a => (
              <AddressCard 
                address={a}
                className="w-[49%] max-lg:w-full"
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

function AddressCard({ 
  address,
  className = ""
 }) {
  const { createModal } = useModal();

  return (
    <div className={`flex flex-col gap-4 p-6 outline-1 rounded-[8px] ${className}`}>
      <div className="font-bold flex flex-col">
        <i className="text-light-orange">{address.type}</i>
        <span>{address.name}</span>
      </div>
      <div className="flex flex-col gap-1">
        <p>{address.phoneNumber}</p>
        <p>{address.address}</p>
        {
          address.detail ? <i>({address.detail})</i> : <></>
        }
      </div>
      <div className="flex gap-6 ml-auto">
        <TextButton 
          action={"Edit Alamat"}
        />
        <TextButton 
          action={"Hapus Alamat"}
          onClick={() => {
            const { request, dismiss } = createModal(
              ModalType.ALERT_DIALOG,
              {
                title: "Hapus Alamat",
                desc: "Apakah Anda yakin untuk menghapus alamat? Alamat akan dihapus secara permanen dan tidak dapat dikembalikan",
                cancelText: "Batal",
                confirmText: "Hapus Alamat",
                onCancel: () => {
                  dismiss();
                },
                onConfirm: () => {

                  dismiss();
                }
              }
            );
            request();
          }}
        />
      </div>
    </div>
  );
}

function TextButton({
  action,
  onClick
}) {
  return (
    <div 
      className="text-light-orange hover:opacity-80 hover:cursor-pointer select-none font-bold"
      onClick={onClick}
    >
      {action}
    </div>
  );
}

function SignOutButton({
  onClick,
  className = ""
}) {
  return (
    <div 
      className={`
        flex items-center gap-4 font-bold hover:cursor-pointer
        hover:opacity-80 select-none ${className}
      `}
      onClick={onClick}
    >
      <SignOut className={"size-[20px]"} />
      Keluar
    </div>
  );
}