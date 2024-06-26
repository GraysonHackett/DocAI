// Taskbar.js
import { listAll, getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import React, { useState, useEffect, useRef, useCallback } from "react";
import choosefileIconLight from '../assets/folderlight.png';
import fileuploadLightIcon from '../assets/fileupload.png';
import choosefileIconDark from '../assets/folderlight.png';
import userIcon from '../assets/userpuffy.png';
import signoutIcon from '../assets/signout.png'; 
import { storage, auth } from "../database/Firebase";
import lightmodeIcon from '../assets/darkmodelight.png';
import darkmodeIcon from '../assets/darkmodelight.png';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Taskbar.css';


function Taskbar({ onSelectFile, darkMode, toggleDarkMode, isCollapsed}) {
  const [fileList, setFileList] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // Reference to file input element
  const location = useLocation(); // Use useLocation hook to get access to the current location

  const fetchFileList = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    fetchFileList();
    if (location.pathname === '/') {
      fetchFileList(); 
    }
}, [fetchFileList, location]);


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
      await uploadString((ref(storage, `chatHistory/${auth.currentUser.uid}/chatHistory.txt`)), '');
      window.location.reload(); 
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleClickUploadButton = () => {
    fileInputRef.current.click(); // Trigger file input click event
  };

// TODO : Find a better display for the welcome page then just Welcome to DocAI, please sign in .... 

  return (
    <div className={isCollapsed ? 'taskbar collapsed' : 'taskbar'}>
      {user ? (
      <p className="myFiles">My Files</p>
      ) : 
      (<p className="welcome-message"><br></br>Welcome to DocAI</p>
      )}
      {user ? (
        null
      ) : (
        <p className="sign-in"> Please sign in or register to upload your own documentation and interact with the chatbot!</p>
      )}
      <div className="fileListWrapper">
        <ul className="fileList">
          {fileList.map((file) => (
            <li key={file.name} className={file === selectedFile ? 'selected' : ''}>
              <img className="foldericon" src={choosefileIconDark} alt="fileIcon"/>
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
        <input 
          type="file" 
          accept=".md" 
          ref={fileInputRef} 
          style={{ display: "none" }} // Hide the file input
          onChange={(event) => handleFileUpload(event.target.files[0])} // Call handleFileUpload when a file is selected
        />
      </div>
      <div className="actions">
        {user ? (
          <button onClick={handleClickUploadButton}>
            <img src={darkMode ? fileuploadLightIcon : fileuploadLightIcon} alt="File Upload" />
            <span className="control">Upload File</span>
          </button>
        ) : (
          null
        )}
        <br></br>
        {user ? (
          <Link to="/fileoptions">
            <button>
              <img src={darkMode ? choosefileIconDark : choosefileIconLight} alt="File Options" />
              <span className="control">Manage Files</span>
            </button>
          </Link>
        ) : (
          null
        )}
        <br></br>
        {user ? <hr className="divider" /> : null }
        {user ? (
          <button onClick={handleSignOut}><img src={darkMode ? signoutIcon : signoutIcon} alt="Sign Out" /><span className="control">Sign Out</span></button>
        ) : (
          <Link to="/login"><button><img src={darkMode ? userIcon : userIcon} alt="Sign In" /><span className="control">Sign In</span></button></Link>
        )}
        <br></br>
        <button onClick={toggleDarkMode}><img src={darkMode ? darkmodeIcon : lightmodeIcon} alt="Dark mode" /><span className="control">{darkMode ? "Light Mode" : "Dark Mode"}</span></button><br></br>
      </div>
    </div>
  );
}

export default Taskbar;
