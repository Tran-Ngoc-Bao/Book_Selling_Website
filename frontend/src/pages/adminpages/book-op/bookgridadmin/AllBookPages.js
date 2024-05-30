import React from 'react';
import BookGridforAdmin from './BookGridforAdmin';
import SidebarforAdmin from './SidebarforAdmin';
import styles from './AllBookPages.module.css'; // Import the CSS module

function AllBookPages({ onClose, isOpen }) {
  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component
  };

  return (
    <div>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={handleClose}>
              x
            </button>
            <div className={styles.contentContainer}>
              <div className={styles.sidebarContainer}>
                <SidebarforAdmin />
              </div>
              <div className={styles.BookGridContainer}>
                <BookGridforAdmin />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllBookPages;
