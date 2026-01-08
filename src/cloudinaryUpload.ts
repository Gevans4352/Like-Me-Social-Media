// cloudinaryUpload.js

export const uploadImageToCloudinary = async (file: string | Blob) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  console.log("Uploading to cloud:", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); 
  console.log("Using preset:", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: data,
  });

  const uploaded = await res.json();

  if (!res.ok) {
    throw new Error(uploaded.error?.message || "Image upload failed");
  }

  return uploaded.secure_url;
};
