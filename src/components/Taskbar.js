import React, { useState, useEffect } from "react";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../database/Firebase";
import { auth } from "../database/Firebase";
import FileUpload from "../database/FileUpload";
import '../styles/Taskbar.css';

function Taskbar({ onSelectFile }) {
  const [fileList, setFileList] = useState([]);
  const [user, setUser] = useState(null);

  const fetchFileList = async () => {
    try {
      if (!user) {
        setFileList([]);
        return;
      }

      const filesRef = ref(storage, `${user.uid}/`);
      const filesList = await listAll(filesRef);
      const fileURLs = await Promise.all(
        filesList.items.map(async (fileRef) => {
          const url = await getDownloadURL(fileRef);
          return { name: fileRef.name, url };
        })
      );
      setFileList(fileURLs);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  useEffect(() => {
    fetchFileList();
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleFileSelect = (file) => {
    const fileUrl = file.url; 
    onSelectFile(fileUrl); 
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul className="fileList">
        {fileList.map((file) => (
          <li key={file.name}>
            <button onClick={() => handleFileSelect(file)}>{file.name}</button>
          </li>
        ))}
      </ul>
      <FileUpload onFileUpload={fetchFileList} />
    </div>
  );
}

export default Taskbar;