"use client";

import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import '../style/Modal.css';

const AnimalModal = ({ isOpen, onClose, onAnimalAdded, categories }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !image || !category) {
            alert('Please enter all fields.');
            return;
        }

        try {
            const imageRef = ref(storage, `animals/${image.name}`);
            const snapshot = await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(snapshot.ref);

            await axios.post('http://localhost:5000/api/animals/createAnimal', { name, image: imageUrl, category });

            onAnimalAdded();
            setName('');
            setImage(null);
            setCategory('');
            onClose();
        } catch (error) {
            console.error('Error adding animal:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Add Animal</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Animal Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Animal Name' />
                    </label>
                    <label>
                        Animal Image:
                        <input
                            type="file"
                            id="image-upload"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                        />
                        {image && (
                            <div className="image-preview-container">
                                <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />
                                <button className="remove-image" onClick={() => setImage(null)}>✖</button>
                            </div>
                        )}
                    </label>
                    <label>
                        Category:
                        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </label>
                    <button className='modal-button' type="submit">Create Animal</button>
                </form>
            </div>
        </div>
    );
};

export default AnimalModal;
