import axios from "axios";
import { db } from "./firebaseApp";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import imageCompression from "browser-image-compression";

const apiKey = import.meta.env.VITE_IMGBB_API_KEY
const imgbbUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`

const uploadToImgBB = async(file)=>{
    const formData = new FormData()
    formData.append("image",file)
    try {
        const resp = await axios.post(imgbbUrl,formData)
        const {url,delete_url} = resp.data.data
        return {url, delete_url}
    } catch (error) {
        console.log("Képfeltöltési hiba: " + error);

        
    }
}

export const addRecipe = async(recipe,file)=>{
    try {
        let imageUrl= ""
        let deleteUrl = ""
        const compressed=await imageCompression(file,{maxSizeMB:1,maxWidthOrHeight:800,useWebWorker:true})
        const results = await uploadToImgBB(compressed)
        if(results){
            imageUrl= results.url
            deleteUrl = results.delete_url
            
            const collectionref = collection(db, "recipes")
            await addDoc(collectionref, {...recipe, imageUrl, deleteUrl, timestamp:serverTimestamp()})
        }
        console.log("Siker");
        
    } catch (error) {
        console.log("Nem sikreült hozzáadni! " + error);
        
    }
}

export const readRecipes = async (setRecipes)=>{
    const collectionRef=collection(db,"recipes")
    const q=query(collectionRef,orderBy("timestamp","desc"))
    const unsubscribe = onSnapshot(q,(snapshot)=>{
        setRecipes(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unsubscribe
}

export const deleteRecipe=async (id,deleteUrl)=>{
    //await axios.get(deleteUrl)
    const docRef = doc(db,"recipes",id)
    await deleteDoc(docRef)
}

export const readRecipe = async (id,setRecipe)=>{
    const docRef = doc(db,"recipes",id)
    const docData = await getDoc(docRef)
    setRecipe(docData.data())
}

export const updateRecipe=async (id,updatedData,file)=>{
    let imageUrl = updatedData.imageUrl || ""
    let deleteUrl = updatedData.deleteUrl || ""
    try {
        if(file){
            const compressed=await imageCompression(file,{maxSizeMB:1,maxWidthOrHeight:800,useWebWorker:true})
            const results = await uploadToImgBB(compressed)
            if(results){
                imageUrl= results.url
                deleteUrl = results.delete_url
            }
        }
        const docRef = doc(db,"recipes",id)
        await updateDoc(docRef,{...updatedData,imageUrl,deleteUrl,updatedAt:serverTimestamp()})
    } catch (error) {
        console.log("Hiba a módosításkor: ",error);
        
    }
}