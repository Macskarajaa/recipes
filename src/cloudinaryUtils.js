import axios from "axios";
import imageCompression from "browser-image-compression";


//const API_URL = "http://localhost:5000/api/"
const API_URL = "https://recipesbackend-theta.vercel.app/api/";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Upload
export const uploadImage = async (file) => {
  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    });

    const base64 = await convertToBase64(compressed);

    const resp = await axios.post(API_URL + "uploadImage", { image: base64 });
    return resp.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Delete
export const deleteImage = async (public_id) => {
  try {
    const resp = await axios.post(API_URL + "deleteImage", { public_id });
    return resp.data;
  } catch (error) {
    console.log("Error deleting Cloudinary image:", error);
  }
};
