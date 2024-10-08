const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const firestore = admin.firestore();

// Example API endpoint to get data from Firestore
exports.getProducts = functions.https.onRequest(async (req, res) => {
    try {
        const productsRef = firestore.collection('products'); // Example collection
        const snapshot = await productsRef.get();

        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products: ", error);
        res.status(500).send("Error fetching products");
    }
});
