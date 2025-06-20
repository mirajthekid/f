// Firebase configuration and utility functions for leaderboard
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCg9QaqWbgOcIP2QthEp1BUCSUf8FnkbP0",
  authDomain: "reactapp-32921.firebaseapp.com",
  projectId: "reactapp-32921",
  storageBucket: "reactapp-32921.firebasestorage.app",
  messagingSenderId: "448180677886",
  appId: "1:448180677886:web:dfe688acbb804eee1289af",
  measurementId: "G-WWE8C0X5B7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Submit a score to a game's leaderboard
export async function submitScore(game, username, score) {
  try {
    await addDoc(collection(db, `${game}_leaderboard`), {
      username,
      score,
      timestamp: Date.now()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// Fetch top 500 scores for a game
export async function fetchLeaderboard(game) {
  try {
    const q = query(
      collection(db, `${game}_leaderboard`),
      orderBy("score", "desc"),
      limit(500)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    return [];
  }
}
