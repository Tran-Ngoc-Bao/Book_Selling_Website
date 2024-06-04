import React, { useState } from "react";
import AddBook from "./book-op/AddBook";
import DeleteBook from "./book-op/DeleteBook";
// import UserIdModal from "./UserIdModal";
import CreatePublishingHouse from "./CreatePublishingHouse";
import AllBookPages from "./book-op/bookgridadmin/AllBookPages"; // Import the AllBookPages component
import PublishingHousesList from "./PublishingHousesList"; // Import the PublishingHousesList component
import { useSelector } from "react-redux";

import AdminPageStyles from "./Admin.module.css";

function Admin() {
  const isadmin = useSelector((state) => state.user.isadmin);

  // State variables for modals
  const [isAddBookOpen, setAddBookOpen] = useState(false);
  const [isAddPBOpen, setAddPBOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUserIdModalOpen, setIsUserIdModalOpen] = useState(false);
  const [isAllBookOpen, setIsAllBookOpen] = useState(false); // State for AllBookPages modal
  const [isPublishingHousesModalOpen, setIsPublishingHousesModalOpen] =
    useState(false); // State for PublishingHousesList modal

  // Functions to open and close modals
  const openModal = () => setAddBookOpen(true);
  const closeModal = () => setAddBookOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openUserIdModal = () => setIsUserIdModalOpen(true);
  const closeUserIdModal = () => setIsUserIdModalOpen(false);
  const openAllBookModal = () => setIsAllBookOpen(true); // Function to open AllBookPages modal
  const closeAllBookModal = () => setIsAllBookOpen(false); // Function to close AllBookPages modal
  const openPublishingHousesModal = () => setIsPublishingHousesModalOpen(true); // Function to open PublishingHousesList modal
  const closePublishingHousesModal = () =>
    setIsPublishingHousesModalOpen(false); // Function to close PublishingHousesList modal
  const openAddPB = () => setAddPBOpen(true);
  const closeAddPB = () => setAddPBOpen(false);

  const handleDelete = (bookId) => {
    console.log(`Book with ID ${bookId} deleted`);
    closeDeleteModal();
  };

  const handleUserIdSubmit = (userId) => {
    // Implement the functionality to handle the userId here
    console.log(`User ID submitted: ${userId}`);
    closeUserIdModal();
  };

  return (
    <div className={AdminPageStyles.page_container}>
      {!isadmin && (
        <span className={AdminPageStyles.no_logged_in_label}>
          Đây là khu vực admin, không phận sự miễn vào.
        </span>
      )}
      {isadmin && (
        <div className={AdminPageStyles.logged_in_page}>
          <span className={AdminPageStyles.welcome}>Xin chào Admin!</span>
          <span className={AdminPageStyles.prompt}>
            Hôm nay bạn muốn làm gì ?
          </span>
          <div className={AdminPageStyles.content_page}>
            <button
              className={AdminPageStyles.add_book_button}
              onClick={openModal}
            >
              Thêm sách mới
            </button>
            <button
              className={AdminPageStyles.view_all_book_button}
              onClick={openAllBookModal}
            >
              Xem tất cả sách
            </button>{" "}
            {/* Button to open AllBookPages modal */}
            <div className={AdminPageStyles.publishingHouses_container}>
              <button
                className={AdminPageStyles.view_all_publisher_button}
                onClick={openPublishingHousesModal}
              >
                Xem tất cả nhà xuất bản
              </button>{" "}
            </div>
            {/* Button to open PublishingHousesList modal */}
            <button
              className={AdminPageStyles.add_publisher_button}
              onClick={openAddPB}
            >
              Thêm NXB mới
            </button>
            <AddBook isOpen={isAddBookOpen} onClose={closeModal} />
            <CreatePublishingHouse isOpen={isAddPBOpen} onClose={closeAddPB} />
            <button
              className={AdminPageStyles.delete_book_button}
              onClick={openDeleteModal}
            >
              Xóa sách
            </button>
            <DeleteBook
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onDelete={handleDelete}
            />
            {/* <div>
          <button onClick={openUserIdModal}>Enter User ID</button>
          <UserIdModal
            isOpen={isUserIdModalOpen}
            onClose={closeUserIdModal}
            onSubmit={handleUserIdSubmit}
          />
        </div> */}
            <AllBookPages isOpen={isAllBookOpen} onClose={closeAllBookModal} />{" "}
            {/* AllBookPages modal */}
            {isPublishingHousesModalOpen && (
              <PublishingHousesList close={closePublishingHousesModal} />
            )}{" "}
            {/* Rendering PublishingHousesList component as modal */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
