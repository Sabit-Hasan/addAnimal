import React, { useState } from 'react';
import '../style/Header.css';

const Header = ({ categories, onAddAnimal, onAddCategory, onCategoryClick }) => {
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        onCategoryClick(categoryId);
    };

    return (
        <header className="header">
            <div className="header-left">
                <button
                    className={activeCategory === null ? 'active' : ''}
                    onClick={() => handleCategoryClick(null)}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat._id}
                        className={activeCategory === cat._id ? 'active' : ''}
                        onClick={() => handleCategoryClick(cat._id)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            <div className="header-right">
                <button onClick={onAddAnimal}>Add Animal</button>
                <button onClick={onAddCategory}>Add Category</button>
            </div>
        </header>
    );
};

export default Header;
