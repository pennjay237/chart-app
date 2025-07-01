// src/components/Chat/FileUploader/FileUploader.jsx
import React from "react"
import styles from "./FileUpLoad.module.css"

function FileUploader({ onFileUpload, uploading }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) onFileUpload(file)
  }

  return (
    <div className={styles.uploader}>
      <input type="file" accept="audio/*" onChange={handleChange} disabled={uploading} />
    </div>
  )
}

export default FileUploader
