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
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit')) || 20; 
        const startAfter = searchParams.get('startAfter') || null; 

        
        let productsRef = db.collection('products').orderBy('id').limit(limit);

        if (startAfter) {
            const startAfterDoc = await db.collection('products').doc(startAfter).get();
            if (startAfterDoc.exists) {
                productsRef = productsRef.startAfter(startAfterDoc);
            }
        }

        const snapshot = await productsRef.get();
        const products = [];

        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });

        
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];

        return new Response(JSON.stringify({ 
            products, 
            lastVisible: lastVisible ? lastVisible.id : null 
        }), { status: 200 });
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
