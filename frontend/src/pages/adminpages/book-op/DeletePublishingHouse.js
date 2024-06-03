import React, { useState } from 'react';
import styles from './DeleteBook.module.css'; // Import the CSS module
import axios from 'axios';
import { getnewTk } from '../../../redux/features/user/tokenSlide';
import { useDispatch, useSelector } from 'react-redux';

const DeletePublishingHouse = ({ isOpen, onClose, onDelete, id }) => {
    const dispatch= useDispatch()
    const token = useSelector((state) => state.token.accessTk);

    const handleDelete = async () => {
        try {
            const rep = await axios.delete(`/api/publishinghouses/admin/delete/${id}`, {
                headers: {
                    token: token, 
                },
            });
            alert(rep.data.message);
            onDelete(id);
        } catch (err) {
            try {
                const newtk = await dispatch(getnewTk());
                const rep = await axios.delete(`/api/publishinghouses/admin/delete/${id}`, {
                    headers: {
                        token: newtk, 
                    },
                });
                alert(rep.data.message);
                onDelete(id);
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
                <h1>Xóa nhà xuất bản</h1>
                <p>ID</p>
                <input
                    type="text"
                    value={id}
                    readOnly={true}
                />
                <button onClick={handleDelete}>Yes, Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DeletePublishingHouse;
