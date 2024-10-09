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
        
        const categoriesRef = db.collection('categories');
        const snapshot = await categoriesRef.get();

        const categories = [];
        snapshot.forEach(doc => {
            categories.push({ id: doc.id, ...doc.data() });
        });

        return new Response(JSON.stringify(categories), { status: 200 });
    } catch (error) {
        console.error("Error getting categories: ", error);
        return new Response("Error fetching categories", { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newCategory = await request.json();
        const docRef = await db.collection('categories').add(newCategory);
        return new Response(JSON.stringify({ id: docRef.id, ...newCategory }), { status: 201 });
    } catch (error) {
        console.error("Error adding category: ", error);
        return new Response("Error adding category", { status: 500 });
    }
}
