import React, { useState, useEffect } from "react";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../database/Firebase";
import { auth } from "../database/Firebase";
import FileUpload from "../database/FileUpload";
import '../styles/Taskbar.css';

function Taskbar({ onSelectFile }) {
  const [fileList, setFileList] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Introduce selectedFile state

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
  // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleFileSelect = (file) => {
    const fileUrl = file.url;
    setSelectedFile(file); // Set selectedFile state when a file is selected
    onSelectFile(fileUrl);
  };

  return (
    <div className="taskbar">
      <h3>Redhat</h3>
      <p>Uploaded Files</p>
      <div className="fileListWrapper">
        <ul className="fileList">
        {fileList.map((file) => (
          <li key={file.name} className={file === selectedFile ? 'selected' : ''}>
            <input 
              type="radio" 
              id={file.name} 
              name="selectedFile" 
              value={file.name}
              onChange={() => handleFileSelect(file)} 
              checked={file === selectedFile} // Check if the current file is selected
            />
            <label htmlFor={file.name}>{file.name}</label> {/* Make sure label is clickable */}
          </li>
        ))}
      </ul>
        <FileUpload onFileUpload={fetchFileList} />
      </div>
    </div>
  );
}

export default Taskbar;
