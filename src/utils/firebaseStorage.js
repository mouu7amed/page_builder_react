import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAILHN26mpy5Y1uyKxWlq2g8OHzR0C0neQ",
  authDomain: "page-builder-ff066.firebaseapp.com",
  projectId: "page-builder-ff066",
  storageBucket: "page-builder-ff066.appspot.com",
  messagingSenderId: "512016131640",
  appId: "1:512016131640:web:a562e5b9ec0fc17ec3e8cd",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
