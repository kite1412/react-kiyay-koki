import PageLayout from "../layouts/PageLayout";
import User from "../assets/user.svg?react";
import { mockUser } from "../data/mocks";
import RoundedButton from "../components/RoundedButton";
import SignOut from "../assets/sign-out.svg?react";
import { ModalType, useModal } from "../contexts/ModalContext";

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

function ProfileBox({ user }) {
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