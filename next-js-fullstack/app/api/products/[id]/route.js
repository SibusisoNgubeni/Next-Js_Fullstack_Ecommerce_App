import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../lib/firebase';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const productDoc = doc(firestore, 'products', id);
    const productSnapshot = await getDoc(productDoc);

    if (!productSnapshot.exists()) {
      return new Response(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
      });
    }

    const productData = {
      id: productSnapshot.id,
      ...productSnapshot.data(),
    };

    return new Response(JSON.stringify(productData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch product' }), {
      status: 500,
    });
  }
}
