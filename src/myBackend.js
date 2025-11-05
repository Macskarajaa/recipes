import axios from "axios"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseApp"

const apikey = import.meta.env.VITE_IMGBB_API_KEY;

const imgUrl = "https://api.imgbb.com/1/upload?key=" + apikey
const uploadToIMGBB = async (file) => {
    const myFormData = new FormData()
    myFormData.append("image", file)
    try {
        const response = await axios.post(imgUrl, myFormData)
        const { url, delete_url } = response.data.data
        return { url, delete_url }
    } catch (error) {
        console.log("Képfeltöltési hiba: " + error);

    }
}


export const addRecipe = async (recipe, file) => {
    try {
        let imgUrl = ""
        let deleteUrl = ""
        const result = await uploadToIMGBB(file)
        if (result) {
            imgUrl = result.url
            deleteUrl = result.delete_url
            console.log(result);


            const collectionref = collection(db, "recipes")
            console.log(recipe);
            
            await addDoc(collectionref, { ...recipe, imgUrl, deleteUrl, timestamp: serverTimestamp() })
        }
    } catch (error) {
        console.log("Nem sikerült hozzáadni " + error);

    }
}