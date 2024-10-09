
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        
        if (!response.ok) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const product = await response.json();
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
