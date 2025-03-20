import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import RoundedButton from "../../components/RoundedButton";
import ChevronLeft from "../../assets/chevron-left.svg?react";
import Add from "../../assets/add.svg?react";
import Video from "../../assets/video.svg?react";
import { useState } from "react";
import TextField, { Accessory } from "../../components/TextField";
import DropdownMenu from "../../components/DropdownMenu";
import ProductType from "../../models/ProductType";
import { AnimatePresence, motion } from "framer-motion";
import OutlinedButton from "../../components/OutlinedButton";

const collectionTypes = ProductType.values;
const statuses = ["Terdaftar", "Tidak Terdaftar"];

export default function AdminEditProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const product = data?.product;
  const [descEdit, setDescEdit] = useState(product?.description);
  const [typeIndex, setTypeIndex] = useState(product ? collectionTypes.indexOf(product?.type) : 0);
  const [statusIndex, setStatusIndex] = useState(0);
  const dismissedFieldStyle = {
    opacity: 0,
    marginTop: "-50px",
    scaleY: 0
  };
  const animateFieldStyle = {
    opacity: 1,
    marginTop: "0px",
    scaleY: 1
  };

  return <AdminPageLayout>
    <div className="size-full flex flex-col gap-10">
      <div className="flex gap-6 items-center">
        <RoundedButton 
          action={
            <ChevronLeft className="size-[40px]" />
          }
          onClick={() => navigate("/", { replace: true })}
          verticalPadding={0}
          horizontalPadding={0}
        />
        <h2 className="font-bold">
          {
            !data ? "Tambah Koleksi" : "Edit Koleksi"
          }
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="flex flex-col flex-3/4 gap-4">
            <b>Tambahkan Gambar</b>
            <div className="flex gap-6">
              {
                Array.from({ length: 3 }).map((_, i) => (
                  <MediaForm
                    inputLabel={i} 
                    className="flex-1/3" 
                  />
                ))
              }
            </div>
          </div>
          <div className="flex flex-col gap-4 flex-1/4">
            <b>Tambahkan Video</b>
            <MediaForm
              inputLabel={"video"} 
              acceptType="video/*" 
            />
          </div>
        </div>
        <TwoColumns 
          first={
            <TextField 
              label="Nama Koleksi"
              placeholder="Masukkan nama produk"
            />
          }
          second={
            <TextField 
              label="Harga Koleksi"
              placeholder="Contoh: 250.000"
              leading={
                <Accessory 
                  text="Rp"
                  className="px-5"
                />
              }
            />
          }
        />
        <TwoColumns 
          first={
            <TextField 
              label="Stok Koleksi"
              placeholder="Masukkan jumlah produk. Contoh: 20"
            />
          }
          second={
            <div className="flex gap-4">
              <TextField 
                label="Harga Diskon"
                placeholder="Contoh: 0-100"
                trailing={
                  <Accessory 
                    text="%"
                    className="px-6 text-[18px]"
                  />
                }
                className="flex-1/2"
              />
              <TextField 
                label="Harga Akhir"
                placeholder="Dihitung otomatis"
              />
            </div>
          }
        />
        <TwoColumns 
          first={
            <div className="flex flex-col gap-2">
              <b>Deskripsi</b>
              <textarea 
                value={descEdit}
                onChange={e => setDescEdit(e.target.value)}
                placeholder="Masukkan deskripsi lebih lanjut dari produk"
                className={`
                  p-4 rounded-[8px] border-2 border-primary min-h-[130px] ${
                    descEdit ? "text-white" : "italic text-secondary-text"
                  }
                `}
              />
            </div>
          }
          second={
            <div className="flex gap-4 justify-between">
              <div className="flex flex-col gap-2 flex-1/2">
                <b>Kategori Koleksi</b>
                <DropdownMenu 
                  selections={collectionTypes}
                  selectedIndex={typeIndex}
                  setSelectedIndex={setTypeIndex}
                  borderColor="#f73138"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1/2">
                <b>Status Koleksi</b>
                <DropdownMenu 
                  selections={statuses}
                  selectedIndex={statusIndex}
                  setSelectedIndex={setStatusIndex}
                  borderColor="#f73138"
                  className="w-full"
                />
              </div>
            </div>
          }
        />
        <AnimatePresence>
          {
            typeIndex === 0 && <motion.div
              initial={dismissedFieldStyle}
              animate={animateFieldStyle}
              exit={dismissedFieldStyle}
            >
              <TwoColumns 
                first={
                  <TextField 
                    label="Warna"
                    placeholder="Masukkan jenis ikan"
                  />
                }
                second={
                  <TextField 
                    label="Ukuran"
                    placeholder="Masukkan ukuran ikan"
                  />
                }
              />
            </motion.div>
          }
        </AnimatePresence>
        <TextField 
          label={`${
            typeIndex === 0 ? "Jenis" :
            typeIndex === 1 ? "Dimensi Akuarium" :
            typeIndex === 2 ? "Berat Pakan Ikan" : ""
          }`}
          placeholder={`Masukkan ${
            typeIndex === 0 ? "jenis ikan" :
            typeIndex === 1 ? "dimensi akuarium" :
            typeIndex === 2 ? "berat pakan ikan" : ""
          }`}
        />
      </div>
      <div className="flex gap-6 ml-auto">
        <OutlinedButton 
          action="Batal"
        />
        <RoundedButton 
          action="Simpan Koleksi"
          fullyRounded={false}
          horizontalPadding={28}
        />
      </div>
    </div>
  </AdminPageLayout>
}

function MediaForm({
  media,
  inputLabel,
  acceptType = "image/*",
  className = ""
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const onFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className={`
        rounded-[8px] border-1 border-primary relative
        text-primary w-full h-[150px] select-none
      `}>
        <label 
          htmlFor={inputLabel} 
          className={`
            cursor-pointer size-full flex items-center justify-center absolute
            z-10  
          `}
        >
          {
            !previewUrl && <Add className="size-[40px]" />
          }
        </label>
        <input 
          id={inputLabel}
          className="hidden size-full cursor-pointer"
          type="file"
          accept={acceptType}
          onChange={onFileChange}
        />
        {
          previewUrl && !acceptType.startsWith("video") && <img 
            src={previewUrl}
            className="size-full object-cover absolute rounded-[8px]"
          />
        }
        {
          acceptType.startsWith("video") && file && <div 
            className="size-full flex flex-col items-center justify-center gap-2"
          >
            <Video className="size-[20px]" />
            {file.name}
          </div>
        }
      </div>
      {
        previewUrl || media ? <label
          className={`
            border-1 border-primary rounded-[4px] font-bold w-full py-2
            flex justify-center text-primary select-none cursor-pointer
          `}
          htmlFor={inputLabel}
        >
          Ubah {
            acceptType.startsWith("image") ? "Gambar" :
            acceptType.startsWith("video") ? "Video" : ""
          }
        </label> : <></>
      }
    </div>
  );
}

function TwoColumns({
  first,
  second
}) {
  return (
    <div className="flex gap-4 justify-between w-full">
      <div className="flex-1/2">
        {first}
      </div>
      <div className="flex-1/2">
        {second}
      </div>
    </div>
  );
}