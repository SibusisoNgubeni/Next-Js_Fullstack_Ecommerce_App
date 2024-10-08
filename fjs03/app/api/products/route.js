

import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../serviceAccountKey.json';


if (!admin.apps.length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}
const db = getFirestore();


export async function GET(request) {
    try {
        const productsRef = db.collection('products');
        const snapshot = await productsRef.get();

        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error("Error getting products: ", error);
        return new Response("Error fetching products", { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newProduct = await request.json();
        const docRef = await db.collection('products').add(newProduct);
        return new Response(JSON.stringify({ id: docRef.id, ...newProduct }), { status: 201 });
    } catch (error) {
        console.error("Error adding product: ", error);
        return new Response("Error adding product", { status: 500 });
    }
}


