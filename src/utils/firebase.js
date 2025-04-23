import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';

// Auth functions
export const registerUser = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => signOut(auth);

// Actor functions
export const addActor = async (actorData) => {
  try {
    const actorsRef = collection(db, 'actors');
    const docRef = await addDoc(actorsRef, {
      ...actorData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateActor = async (actorId, actorData) => {
  try {
    const actorRef = doc(db, 'actors', actorId);
    await updateDoc(actorRef, {
      ...actorData,
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteActor = async (actorId) => {
  try {
    const actorRef = doc(db, 'actors', actorId);
    await deleteDoc(actorRef);
  } catch (error) {
    throw error;
  }
};

export const getActor = async (actorId) => {
  try {
    const actorRef = doc(db, 'actors', actorId);
    const actorSnap = await getDoc(actorRef);
    return actorSnap.exists() ? { id: actorSnap.id, ...actorSnap.data() } : null;
  } catch (error) {
    throw error;
  }
};

export const getAllActors = async () => {
  try {
    const actorsRef = collection(db, 'actors');
    const querySnapshot = await getDocs(actorsRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

// File upload function
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw error;
  }
}; 