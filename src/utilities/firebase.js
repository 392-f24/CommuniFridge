// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update, remove} from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUa4NVc7Qjss_fqotQ1nAUEKsb-mD2GcY",
  authDomain: "communifridge.firebaseapp.com",
  projectId: "communifridge",
  storageBucket: "communifridge.firebasestorage.app",
  messagingSenderId: "218603385279",
  appId: "1:218603385279:web:e9f0eb4c9e0fbca676710a"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebase), (user) => {
      setUser(user);
      setLoading(false);
    })
    return () => unsubscribe();
}, []);

  return [user, loading];
};

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
      update(ref(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};


export const useDbRemove = (path) => {
  const [result, setResult] = useState();
  const removeData = useCallback(() => {
      remove(ref(database, path))
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [removeData, result];
};