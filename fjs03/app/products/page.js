"use client";
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase'; 
import { useRouter } from 'next/navigation'; 
import "../products.css";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [category, setCategory] = useState(''); 
    const [categories, setCategories] = useState([]); 
    const router = useRouter(); 

    const fetchFilteredProducts = async (category) => {
        const url = new URL('/api/products', window.location.origin);
        if (category) url.searchParams.append('category', category);

        try {
            const response = await fetch(url);
            const data = await response.json();
            setProducts(Array.isArray(data.products) ? data.products : []);
        } catch (error) {
            console.error("Error fetching products: ", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchFilteredProducts(category);
    }, [category]);

    const handleProductClick = (productId) => {
        const user = auth.currentUser; 

        if (user) {
            router.push(`/detailedproduct/${productId}`);
        } else {
            router.push('/signup');
        }
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <h1>Products</h1>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="">All Categories</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
            </select>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.id}>
                        <div onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
                            <h2>{product.name}</h2>
                            <img src={product.images[0]} className='product-image' alt={product.name} />
                            <p>{product.category}</p>
                            <p>{product.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
