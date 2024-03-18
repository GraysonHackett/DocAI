// FileUpload.js 
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../database/Firebase";
import '../styles/Upload.css'

function FileUpload({ onFileUpload }) {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `${auth.currentUser.uid}/${file.name}`); // Adds the UID to each file to be uniquely accessed & displayed in taskbar 

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      onFileUpload(downloadURL); // Pass the download URL to the parent component
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="fileUpload">
      <input  // styling for choose file button needs to be inline not css page 
        className="fileSelection"
        type="file"
        accept=".md"
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
      />
      <button className="uploadButton" onClick={handleFileUpload}>Upload File</button>
    </div>
  );
}

export default FileUpload;
