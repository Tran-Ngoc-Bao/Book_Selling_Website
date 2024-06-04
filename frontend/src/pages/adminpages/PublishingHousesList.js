import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeletePublishingHouse from "./book-op/DeletePublishingHouse";
import UpdatePublishingHouseModal from "./UpdatePublishingHouseModal";
import PublishingHousesListStyle from "./PublishingHousesList.module.css";

function PublishingHousesList({ close }) {
  const [publishingHouses, setPublishingHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedHouse, setExpandedHouse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState({ _id: "" });
  const booksPerPage = 5; // Number of books to display per page

  const openUpdateModal = (house) => {
    setSelectedHouse(house);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openDeleteModal = (house) => {
    setSelectedHouse(house);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (bookId) => {
    console.log(`Đã xóa NXB có ID ${bookId}`);
    closeDeleteModal();
    // You might want to update the list of publishing houses after deletion
  };

  useEffect(() => {
    async function fetchPublishingHouses() {
      try {
        const response = await axios.get("/api/publishinghouses/getall");
        setPublishingHouses(
          response.data.map((house) => ({ ...house, currentPage: 1 }))
        );
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchPublishingHouses();
  }, []);

  const handlePaginate = (houseId, pageNumber) => {
    setPublishingHouses((prevState) =>
      prevState.map((house) =>
        house._id === houseId ? { ...house, currentPage: pageNumber } : house
      )
    );
  };

  const toggleExpand = (houseId) => {
    setExpandedHouse(expandedHouse === houseId ? null : houseId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={PublishingHousesListStyle.page_container}>
      <button
        className={PublishingHousesListStyle.close_button}
        onClick={close}
      >
        X
      </button>
      <span className={PublishingHousesListStyle.title}>
        Danh sách nhà xuất bản
      </span>
      {publishingHouses.map((house) => (
        <div
          className={PublishingHousesListStyle.publisher_container}
          key={house._id}
        >
          <span className={PublishingHousesListStyle.house_name}>
            {house.name}
          </span>

          <p>ID: {house._id}</p>
          <p>Email: {house.email}</p>
          <p>Số điện thoại: {house.phone}</p>
          <p>Địa chỉ: {house.location}</p>
          <p>Sách:</p>

          <div className={PublishingHousesListStyle.button_array}>
            <button
              className={PublishingHousesListStyle.update_button}
              onClick={() => openUpdateModal(house)}
            >
              Cập nhật chi tiết NXB
            </button>
            <UpdatePublishingHouseModal
              isOpen={isUpdateModalOpen && selectedHouse === house}
              onClose={closeUpdateModal}
              house={selectedHouse}
            />
            <button
              className={PublishingHousesListStyle.remove_button}
              onClick={() => openDeleteModal(house)}
            >
              Xóa NXB
            </button>
            <DeletePublishingHouse
              isOpen={isDeleteModalOpen && selectedHouse === house}
              onClose={closeDeleteModal}
              onDelete={() => handleDelete(selectedHouse._id)}
              id={selectedHouse._id}
            />
            <button
              className={PublishingHousesListStyle.detail_button}
              onClick={() => toggleExpand(house._id)}
            >
              {expandedHouse === house._id ? "Ẩn chi tiết" : "Hiện chi tiết"}
            </button>
            {expandedHouse === house._id && (
              <div>
                <ul>
                  {house.bookids
                    .slice(
                      (house.currentPage - 1) * booksPerPage,
                      house.currentPage * booksPerPage
                    )
                    .map((bookId) => (
                      <li key={bookId}>
                        <Link to={`/admin/book/${bookId}`}>
                          <img
                            src={`../images/${bookId}.jpeg`}
                            width={60}
                            height={60}
                            alt={bookId}
                          />
                          {bookId}
                        </Link>
                      </li>
                    ))}
                </ul>
                <ul className={PublishingHousesListStyle.book_pages_pickers}>
                  {Array.from(
                    { length: Math.ceil(house.bookids.length / booksPerPage) },
                    (_, i) => (
                      <li
                        key={i}
                        className={
                          PublishingHousesListStyle.book_pages_single_page
                        }
                      >
                        <button
                          className={PublishingHousesListStyle.page_button}
                          onClick={() => handlePaginate(house._id, i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PublishingHousesList;
