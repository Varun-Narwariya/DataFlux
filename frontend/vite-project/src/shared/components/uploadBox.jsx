import { useState } from "react";

function UploadBox() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <label
        style={{
          border: "2px dashed #ccc",
          padding: "60px",
          display: "block",
          cursor: "pointer"
        }}
      >
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <h3>Select Files</h3>
        <p>or drag and drop files here</p>
      </label>

      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Selected Files</h4>
          {files.map((file) => (
            <p key={file.name}>{file.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadBox;