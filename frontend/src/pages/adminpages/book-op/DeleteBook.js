import React, { useState } from 'react';
import styles from './DeleteBook.module.css'; // Import the CSS module
import axios from 'axios';
import { getnewTk } from '../../../redux/features/user/tokenSlide';
import { useDispatch, useSelector } from 'react-redux';

const DeleteBookModal = ({ isOpen, onClose, onDelete }) => {
    const dispatch= useDispatch()
    const token = useSelector((state) => state.token.accessTk);
    const [bookId, setBookId] = useState('');

    const handleInputChange = (e) => {
        setBookId(e.target.value);
    };

    const handleDelete = async () => {
        onDelete(bookId);
        try {
            const rep = await axios.delete(`/api/books/admin/delete/${bookId}`, {
                headers: {
                    token: token, 
                },
            });
            alert(rep.data.message);
            setBookId("")
        } catch (err) {
            try {
                const newtk = await dispatch(getnewTk());
                const rep = await axios.delete(`/api/books/admin/delete/${bookId}`, {
                    headers: {
                        token: newtk, 
                    },
                });
                alert(rep.data.message);
                setBookId("")
            } catch (err) {
                alert(err);
            }
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h1>Delete Book</h1>
                <p>Please enter the ID of the book you want to delete:</p>
                <input
                    type="text"
                    value={bookId}
                    onChange={handleInputChange}
                    placeholder="Enter book ID"
                />
                <button onClick={handleDelete}>Yes, Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteBookModal;
