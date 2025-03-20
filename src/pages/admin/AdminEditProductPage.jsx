import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import RoundedButton from "../../components/RoundedButton";
import ChevronLeft from "../../assets/chevron-left.svg?react";
import Add from "../../assets/add.svg?react";
import Video from "../../assets/video.svg?react";
import { useState } from "react";

export default function AdminEditProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

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
            !product ? "Tambah Koleksi" : "Edit Koleksi"
          }
        </h2>
      </div>
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