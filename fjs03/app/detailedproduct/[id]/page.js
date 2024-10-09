
"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import "../../products.css";

export default function DetailedProductPage() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/detailedproduct/${id}`);
                if (!response.ok) throw new Error('Failed to fetch product');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product: ", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.images[0]} alt={product.name} className='product-image' />
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}
