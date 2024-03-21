import React, { useState, useEffect } from "react";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../database/Firebase";
import { auth } from "../database/Firebase";
import { Link } from "react-router-dom";
import FileUpload from "../database/FileUpload";
import '../styles/Taskbar.css';
import userIcon from '../assets/user.png'
import signOutIcon from '../assets/signout.png'
import darkmodeIcon from '../assets/darkmode.png'
import fileuploadIcon from '../assets/fileupload.png'
import choosefileIcon from '../assets/choosefile.png'


function Taskbar({ onSelectFile, darkMode, toggleDarkMode }) {
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
  }, [user]); // Fetch file list whenever the user changes

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

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
        <h3>Selected Documentation: {selectedFile ? selectedFile.name.split('.').slice(0, -1).join('.') : ""}</h3>
        <FileUpload onFileUpload={fetchFileList} />
      </div>
      <div className="actions">
        <button><img src={fileuploadIcon} alt="File Upload" /><span className="hover-text">Upload File</span></button><br></br>
        <button><img src={choosefileIcon} alt="Choose File" /><span className="hover-text">Choose File</span></button><br></br>
        <hr className="divider" />
        {user ? (
          // If user is signed in, display sign out button
          <button onClick={handleSignOut}><img src={signOutIcon} alt="Sign Out" /><span className="hover-text">Sign Out</span></button>
        ) : (
          <Link to="/login"><button><img src={userIcon} alt="Sign In" /><span className="hover-text">Sign In</span></button></Link>
        )}
        <br></br>
        <button onClick={toggleDarkMode}><img src={darkmodeIcon} alt="Dark mode" /><span className="hover-text">Dark Mode</span></button><br></br>
      </div>
    </div>
  );
}

export default Taskbar;
