"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import AnimalModal from '../components/AnimalModal';
import CategoryModal from '../components/CategoryModal';
import './page.css';

const Home = () => {
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [animalModalIsOpen, setAnimalModalIsOpen] = useState(false);
  const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalRes = await axios.get('http://localhost:5000/api/animals');
        const categoryRes = await axios.get('http://localhost:5000/api/categories');
        setAnimals(animalRes.data);
        setCategories(categoryRes.data);
        setFilteredAnimals(animalRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddAnimal = () => setAnimalModalIsOpen(true);
  const handleAddCategory = () => setCategoryModalIsOpen(true);

  const handleCategoryClick = (categoryId) => {
    if (categoryId) {
      setFilteredAnimals(animals.filter(animal => animal.category._id === categoryId));
    } else {
      setFilteredAnimals(animals);
    }
  };

  const refreshAnimals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/animals');
      setAnimals(res.data);
      setFilteredAnimals(res.data);
    } catch (error) {
      console.error('Error refreshing animals:', error);
    }
  };

  const refreshCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error refreshing categories:', error);
    }
  };

  return (
    <div className="container">
      <Header
        categories={categories}
        onAddAnimal={handleAddAnimal}
        onAddCategory={handleAddCategory}
        onCategoryClick={handleCategoryClick}
      />
      <div className="animals-list">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          filteredAnimals.map(animal => (
            <div key={animal._id} className="animal-card">
              <img src={animal.image} alt={animal.name} className="animal-image" />
              <h3 className="animal-name">{animal.name}</h3>
            </div>
          ))
        )}
      </div>
      <AnimalModal
        isOpen={animalModalIsOpen}
        onClose={() => setAnimalModalIsOpen(false)}
        onAnimalAdded={refreshAnimals}
        categories={categories}
      />
      <CategoryModal
        isOpen={categoryModalIsOpen}
        onClose={() => setCategoryModalIsOpen(false)}
        onCategoryAdded={() => {
          refreshCategories();
          refreshAnimals();
        }}
      />
    </div>
  );
};

export default Home;
