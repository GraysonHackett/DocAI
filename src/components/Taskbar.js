import React, { useState, useEffect } from "react";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../database/Firebase"; // Import Firebase storage
import { auth } from "../database/Firebase"; // Import Firebase auth
import FileUpload from "../database/FileUpload"; // Import FileUpload component
import '../styles/Taskbar.css'

function Taskbar() {
  const [fileList, setFileList] = useState([]);
  const [user, setUser] = useState(null);

  // Function to fetch file list
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

  // useEffect to fetch file list
  useEffect(() => {
    fetchFileList();
  }, [user]); // Trigger the effect when the user state changes

  // useEffect to update user state on authentication change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []); // Only run once when the component mounts

  // Callback function to handle file upload
  const handleFileUpload = () => {
    fetchFileList(); // Trigger the effect to fetch the updated file list
  };

// TODO: add styling to 

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul className="fileList">
        {fileList.map((file) => (
          <li key={file.name}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  );
}

export default Taskbar;
