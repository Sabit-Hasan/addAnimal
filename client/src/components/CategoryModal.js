"use client";

import React, { useState } from 'react';
import axios from 'axios';
import '../style/Modal.css';

const CategoryModal = ({ isOpen, onClose, onCategoryAdded }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            alert('Please enter a category name.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/categories/createCategory', { name });
            onCategoryAdded();
            onClose();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Category Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Category Name' required />
                    </label>
                    <button className='modal-button' type="submit">Save Category</button>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal;
