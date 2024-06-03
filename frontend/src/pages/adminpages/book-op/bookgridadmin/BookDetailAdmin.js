import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getnewTk } from "../../../../redux/features/user/tokenSlide";

function BookDetailAdmin() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const isadmin = useSelector((state) => state.user.isadmin);
  const token = useSelector((state) => state.token.accessTk);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBook() {
      const response = await axios.get(`/api/books/getone/${id}`);
      setBook(response.data);
      const { _id, authors, genres, ...rest } = response.data;
      setFormValues({
        ...rest,
        authors: authors.join(", "), // Join authors array into a string
        genres: genres.join(", "), // Join genres array into a string
      });
    }

    fetchBook();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleFormSubmit = async () => {
    const updatedFormValues = {
      ...formValues,
      authors: formValues.authors.split(",").map((author) => author.trim()), // Split authors string back into array
      genres: formValues.genres.split(",").map((genre) => genre.trim()), // Split genres string back into array
    };
    try {
      const response = await axios.put(
        `/api/books/update/${id}`,
        updatedFormValues,
        {
          headers: {
            token: token, // Assuming you're using Bearer token
          },
        }
      );
      console.log(response);
      setBook(updatedFormValues); // Update book state with the new values
      setEditMode(false); // Disable edit mode after form submission
      alert(response.data.message);
    } catch (error) {
      const newtk = await dispatch(getnewTk());
      try {
        const response = await axios.put(
          `/api/books/update/${id}`,
          updatedFormValues,
          {
            headers: {
              token: newtk,
            },
          }
        );
        console.log(response);
        setBook(updatedFormValues); // Update book state with the new values
        setEditMode(false); // Disable edit mode after form submission
        alert(response.data.message);
      } catch (err) {
        console.error("Error updating book:", error);
      }
    }
  };

  return (
    <div>
      {isadmin && book && (
        <div>
          <img
            src={`http://localhost:8000/images/${id}.jpeg`}
            width={200}
            height={200}
            alt={book.title}
          />
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="title">Tên sách:</label>
              <input
                id="title"
                type="text"
                value={formValues.title}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div>
              <label htmlFor="authors">Tác giả:</label>
              <input
                id="authors"
                type="text"
                value={formValues.authors}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div>
              <label htmlFor="genres">Thể loại:</label>
              <input
                id="genres"
                type="text"
                value={formValues.genres}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div>
              <label htmlFor="price">Giá bán:</label>
              <input
                id="price"
                type="number"
                value={formValues.price}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div>
              <label htmlFor="quantity">Số lượng:</label>
              <input
                id="quantity"
                type="number"
                value={formValues.quantity}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div>
              <label htmlFor="description">Mô tả sách:</label>
              <textarea
                id="description"
                value={formValues.description}
                onChange={handleInputChange}
                readOnly={!editMode}
                style={{ width: "100%", whiteSpace: "pre-wrap" }}
                cols={30}
                rows={10}
              ></textarea>
            </div>
            <div>
              <label htmlFor="year">Năm xuất bản:</label>
              <input
                id="year"
                type="number"
                value={formValues.year}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <p>Đây là: {editMode ? "Edit Mode" : "View Mode"}</p>
            {editMode ? (
              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setEditMode(false);
                  }}
                >
                  Quay lại
                </button>
                <button
                  onClick={async (event) => {
                    event.preventDefault();
                    setEditMode(false);
                    await handleFormSubmit();
                    console.log(formValues);
                  }}
                >
                  Submit
                </button>
              </div>
            ) : (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setEditMode(true);
                }}
              >
                Edit
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default BookDetailAdmin;
