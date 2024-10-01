import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Products = () => {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [expandedDescription, setExpandedDescription] = useState({}); // Keep track of expanded products

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://api-backend-l9q5.onrender.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);

                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    const handleAddToCart = (product) => {
        addToCart(product); 
    };

    const toggleDescription = (id) => {
        setExpandedDescription(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Toggle description expansion for the product
        }));
    };

    const truncateText = (text, length) => {
        if (text.length <= length) {
            return text;
        }
        return text.substring(0, length) + '...';
    };

    if (loading) {
        return <div className="text-center"><div className="spinner-border" role="status"></div></div>;
    }

    if (error) {
        return <p className="text-danger text-center">Error: {error}</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">All Products</h2>
            <div className="mb-3">
                <label htmlFor="categorySelect" className="form-label">Filter by Category:</label>
                <select 
                    id="categorySelect" 
                    className="form-select" 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            {filteredProducts.length > 0 ? (
                <div className="row">
                    {filteredProducts.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card border-primary shadow-sm h-100 d-flex flex-column justify-content-between">
                                {product.image && (
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="card-img-top" 
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>

                                    <p className="card-text">
                                        {expandedDescription[product.id]
                                            ? product.description
                                            : truncateText(product.description, 100)}
                                    </p>
                                    <button 
                                        className="btn btn-link p-0" 
                                        onClick={() => toggleDescription(product.id)}
                                    >
                                        {expandedDescription[product.id] ? 'Read Less' : 'Read More'}
                                    </button>
                                    <p className="card-text fw-bold">Price: ${product.price}</p>
                                </div>
                                <div className="card-footer mt-auto">
                                    <button className="btn btn-success w-100" onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No products available in this category.</p>
            )}
        </div>
    );
};

export default Products;
