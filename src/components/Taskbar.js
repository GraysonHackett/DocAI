// Taskbar.js
import React, { useState, useEffect, useRef } from "react";
import { listAll, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, auth } from "../database/Firebase";
import { Link } from "react-router-dom";
import '../styles/Taskbar.css';
import userIconLight from '../assets/userIconLight.png'
import userIconDark from '../assets/userIconDark.png'
import darkmodeIcon from '../assets/darkmode.png'
import lightmodeIcon from '../assets/lightmode.png'
import fileuploadLightIcon from '../assets/fileuploadLight.png'
import fileuploadDarkIcon from '../assets/fileuploadDark.png'
import choosefileIconLight from '../assets/choosefileLight.png'
import choosefileIconDark from '../assets/choosefileDark.png'

function Taskbar({ onSelectFile, darkMode, toggleDarkMode }) {
  const [fileList, setFileList] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // Reference to file input element

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
    // eslint-disable-next-line
    fetchFileList();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `${auth.currentUser.uid}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      fetchFileList(); // Refresh file list after upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileSelect = (file) => {
    const fileUrl = file.url;
    setSelectedFile(file);
    onSelectFile(fileUrl);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleClickUploadButton = () => {
    fileInputRef.current.click(); // Trigger file input click event
  };

  return (
    <div className="taskbar">
      <h3>Redhat</h3>
      <p>My Files</p>
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
                checked={file === selectedFile} 
              />
              <label htmlFor={file.name}>{file.name}</label>
            </li>
          ))}
        </ul>
        <h3>Selected Documentation: {selectedFile ? selectedFile.name.split('.').slice(0, -1).join('.') : ""}</h3>
        <input 
          type="file" 
          accept=".md" 
          ref={fileInputRef} 
          style={{ display: "none" }} // Hide the file input
          onChange={(event) => handleFileUpload(event.target.files[0])} // Call handleFileUpload when a file is selected
        />
      </div>
      <div className="actions">
        <button onClick={handleClickUploadButton}>
          <img src={darkMode ? fileuploadDarkIcon : fileuploadLightIcon} alt="File Upload" />
          <span className="hover-text">Upload File</span>
        </button><br></br>
        <Link to="/fileoptions">
          <button>
            <img src={darkMode ? choosefileIconDark : choosefileIconLight} alt="File Options" />
            <span className="hover-text">File Options</span>
          </button>
        </Link>
        <br></br>
        <hr className="divider" />
        {user ? (
          <button onClick={handleSignOut}><img src={darkMode ? userIconDark : userIconLight} alt="Sign Out" /><span className="hover-text">Sign Out</span></button>
        ) : (
          <Link to="/login"><button><img src={darkMode ? userIconDark : userIconLight} alt="Sign In" /><span className="hover-text">Sign In</span></button></Link>
        )}
        <br></br>
        <button onClick={toggleDarkMode}><img src={darkMode ? darkmodeIcon : lightmodeIcon} alt="Dark mode" /><span className="hover-text">{darkMode ? "Light Mode" : "Dark Mode"}</span></button><br></br>
      </div>
    </div>
  );
}

export default Taskbar;
