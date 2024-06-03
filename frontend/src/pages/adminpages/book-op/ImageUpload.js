import React, { useState, useRef } from "react";
import axios from "axios";

function ImageUpload({ bookId, closed, setBookId }) {
  const [file, setFile] = useState(null);
  const id = useRef(bookId.current);
  const [productId, setProductId] = useState(bookId.current); // Added state for product ID

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleProductIdChange = (event) => {
    setProductId(event.target.value); // Update product ID
    id.current = event.target.value;
  };

  const handleUpload = async () => {
    if (file && productId) {
      const renamedFile = new File([file], `${id.current}.jpeg`, { type: file.type });
      const formData = new FormData();
      formData.append("productId", id.current);
      formData.append("image", renamedFile);

      try {
        const response = await axios.post(
          "/api/books/uploadimages",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Handle the response as needed
        console.log(response.data);
        alert(response.data.message);
        bookId.current=" "
        setBookId(null)
        closed(); // Close the popup after successful upload
      } catch (error) {
        // Handle the error as needed
        console.error("Error uploading image:", error);
      }
    } else {
      alert("Please select a file and enter a product ID.");
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <div className="popup-inner">
          <h2>Upload Image</h2>
          <div>
            <input type="file" onChange={handleFileChange} />
            {file && (
              <div>
                <p>Current file name: {file.name}</p>
              </div>
            )}
            <input
              type="text"
              value={productId}
              onChange={handleProductIdChange}
              readOnly
            />
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
