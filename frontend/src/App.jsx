import React, { useState } from 'react'

export default function App() {
  const [file, setFile] = useState(null)
  const [uploaded, setUploaded] = useState(null)

  const handleChange = (e) => setFile(e.target.files[0])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    const fd = new FormData()
    fd.append('image', file)
    try {
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setUploaded(data)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="container">
      <h1>Image Uploader</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>

      {uploaded && (
        <div className="result">
          <p>
            Uploaded: <strong>{uploaded.filename}</strong> ({uploaded.size} bytes)
          </p>
          <img src={`http://localhost:8000/uploads/${uploaded.filename}`} alt="uploaded" />
        </div>
      )}
    </div>
  )
}
