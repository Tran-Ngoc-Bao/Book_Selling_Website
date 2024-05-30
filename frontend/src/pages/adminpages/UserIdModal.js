import React, { useState } from 'react';
import styles from './UserIdModal.module.css'; // Import the CSS module

const UserIdModal = ({ isOpen, onClose, onSubmit }) => {
    const [userId, setUserId] = useState('');

    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(userId);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h1>Enter User ID</h1>
                <p>Please enter the user ID:</p>
                <input
                    type="text"
                    value={userId}
                    onChange={handleInputChange}
                    placeholder="Enter user ID"
                />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default UserIdModal;
