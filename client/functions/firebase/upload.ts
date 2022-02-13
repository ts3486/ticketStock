  import app from "../../../firebase";
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  
  export const uploadFile = (file: File) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, "images");

    const metadata = {
      contentType: "image/jpeg",
      name: "images/" + file.name,
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        throw error;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };