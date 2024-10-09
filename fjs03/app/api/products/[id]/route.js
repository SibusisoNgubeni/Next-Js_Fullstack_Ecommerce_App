import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../../serviceAccountKey.json'; 

if (!admin.apps.length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}

const db = getFirestore();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category'); 
    const limit = parseInt(searchParams.get('limit')) || 20; 
    const startAfter = searchParams.get('startAfter'); 

    try {
        let productsRef = db.collection('products');

        if (category) {
            productsRef = productsRef.where('category', '==', category);
        }

        let snapshot;
        
        if (startAfter) {
            const startAfterDoc = await productsRef.doc(startAfter).get();
            snapshot = await productsRef.startAfter(startAfterDoc).limit(limit).get();
        } else {
            snapshot = await productsRef.limit(limit).get();
        }

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

