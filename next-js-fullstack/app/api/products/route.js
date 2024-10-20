import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { firestore } from '../../lib/firebase'

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '10';

  try {
    const productsCollection = collection(firestore, 'products');
    const productsQuery = query(productsCollection, orderBy('id'), limit(Number(perPage)));

    let productsSnapshot;

    // Handle pagination
    if (Number(page) > 1) {
      const lastVisibleSnapshot = await getLastVisibleSnapshot(productsCollection, Number(page), Number(perPage));
      productsSnapshot = await getDocs(query(productsCollection, startAfter(lastVisibleSnapshot), limit(Number(perPage))));
    } else {
      productsSnapshot = await getDocs(productsQuery);
    }

    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisibleDoc = productsSnapshot.docs[productsSnapshot.docs.length - 1];
    const lastVisible = lastVisibleDoc ? lastVisibleDoc.id : null;

    return new Response(JSON.stringify({ products, lastVisible }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch products' }), {
      status: 500,
    });
  }
}

// Helper function to get the last visible document snapshot
async function getLastVisibleSnapshot(collectionRef, page, perPage) {
  const previousSnapshot = await getDocs(query(collectionRef, orderBy('id'), limit(perPage * (page - 1))));
  return previousSnapshot.docs[previousSnapshot.docs.length - 1];
}
