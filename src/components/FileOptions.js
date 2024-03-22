// FileOptions.js
import React, { useState, useEffect } from "react";
import { listAll, getDownloadURL, ref, deleteObject } from "firebase/storage";
import { storage, auth } from "../database/Firebase";
import '../styles/FileOptions.css'; // Import your CSS file for styling
import { Link } from "react-router-dom";
import trashCanIcon from '../assets/trashcan.png'

function FileOptions() {
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
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchFileList();
    // eslint-disable-next-line
  }, [user]);


  const confirmDelete = (file) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${file.name}?`);

    if (isConfirmed) {
      handleDeleteFile(file);
    }
  };

  const handleDeleteFile = async (file) => {
    const fileRef = ref(storage, `${auth.currentUser.uid}/${file.name}`);
    deleteObject(fileRef).then(() => {
        fetchFileList(); 
    }).catch((error) => {
        console.error(error); 
    });

  };

  return (
    <div className="fileOptionsContainer">
      <div className="fileOptionsWrapper">
        <h2>My Files</h2>
        <ul className="fileList">
          {fileList.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
              <button className="deleteButton" onClick={() => confirmDelete(file)}>
                <img src={trashCanIcon} alt="Delete" />
              </button>
              {/* TODO: Find a way to trigger the fetch file list on the taskbar, after the user navigates back to the mainpage */}
            </li>
          ))}
        </ul>
        <Link className="mainPage" to="/">Back to main page</Link>
      </div>
    </div>
  );

}

export default FileOptions;
