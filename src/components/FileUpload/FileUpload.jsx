import styles from "./FileUpload.module.css"

export default function FileUpload({ onUpload }) {
  const handleChange = (e) => {
    if (e.target.files.length) {
      onUpload(e.target.files[0])
    }
  }

  return <input type="file" className={styles.upload} onChange={handleChange} />
}
