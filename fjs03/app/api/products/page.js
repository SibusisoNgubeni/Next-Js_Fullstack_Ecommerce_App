
"use client";
import { useEffect, useState } from 'react';
import "../../products.css"
export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
       
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products'); 
                const data = await response.json();
                setProducts(data.products || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <h1>Products</h1>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <img src={product.images[0]} className='product-image'/>
                        <p>{product.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
