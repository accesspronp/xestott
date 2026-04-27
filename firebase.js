import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

export const ADMIN_EMAIL = "krishdhami9812766213@gmail.com";

export const firebaseConfig = {
  apiKey: "AIzaSyBa-JOyK4DOZeAYTFzccUJB_zzLhaRVkFA",
  authDomain: "zest-6eb10.firebaseapp.com",
  projectId: "zest-6eb10",
  storageBucket: "zest-6eb10.firebasestorage.app",
  messagingSenderId: "623978058263",
  appId: "1:623978058263:web:f48c19c3c819997172c252",
  measurementId: "G-E0CY6L0NRW"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

try {
  getAnalytics(app);
} catch (error) {
  console.warn("Analytics not available:", error.message);
}
