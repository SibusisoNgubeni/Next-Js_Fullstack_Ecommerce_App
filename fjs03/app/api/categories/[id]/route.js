import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../../../serviceAccountKey.json'; 

if (!admin.apps.length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}
const db = getFirestore();

export async function GET(request, { params }) {
    const { id } = params; 

    try {
        const categoryRef = db.collection('categories').doc(id); 
        const doc = await categoryRef.get();

        if (!doc.exists) {
            return new Response("Category not found", { status: 404 });
        }

        const category = { id: doc.id, ...doc.data() };
        return new Response(JSON.stringify(category), { status: 200 });
    } catch (error) {
        console.error("Error fetching category: ", error);
        return new Response("Error fetching category", { status: 500 });
    }
}
