import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from './config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';

// Create a document
export const createDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Get a document
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: docSnap.data(), error: null };
    }
    return { data: null, error: 'Document not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get all documents from a collection
export const getCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return { data: documents, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Update a document
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Delete a document
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Query documents
export const queryDocuments = async (collectionName, field, operator, value) => {
  try {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return { data: documents, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Talent specific functions
export const createTalentWithAccount = async (talentData, accountData) => {
  try {
    // 1. Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      accountData.email, 
      accountData.password
    );
    const userId = userCredential.user.uid;

    // 2. Create talent profile document
    const talentProfile = {
      ...talentData,
      userId: userId,
      email: accountData.email,
      role: 'talent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'talents', talentData.talentId), talentProfile);

    // 3. Create user document
    const userData = {
      uid: userId,
      email: accountData.email,
      name: talentData.name,
      role: 'talent',
      talentId: talentData.talentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'users', userId), userData);

    return { 
      error: null, 
      data: {
        talent: talentProfile,
        user: userData,
        auth: userCredential.user
      }
    };
  } catch (error) {
    console.error('Error creating talent with account:', error);
    return { error: error.message, data: null };
  }
};

// Get talent by ID
export const getTalentById = async (talentId) => {
  try {
    const docRef = doc(db, 'talents', talentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { data: null, error: 'Talent not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get all talents
export const getAllTalents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'talents'));
    const talents = [];
    querySnapshot.forEach((doc) => {
      talents.push({ id: doc.id, ...doc.data() });
    });
    return { data: talents, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Update talent profile
export const updateTalentProfile = async (talentId, updateData) => {
  try {
    const docRef = doc(db, 'talents', talentId);
    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(docRef, updatedData);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Delete talent and their account
export const deleteTalentAndAccount = async (talentId) => {
  try {
    // 1. Get talent data to find userId
    const { data: talent } = await getTalentById(talentId);
    if (!talent) {
      throw new Error('Talent not found');
    }

    // 2. Delete talent profile
    await deleteDoc(doc(db, 'talents', talentId));

    // 3. Delete user document
    if (talent.userId) {
      await deleteDoc(doc(db, 'users', talent.userId));
    }

    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Talent specific functions
export const uploadTalentProfileImage = async (file, talentId) => {
  try {
    // Create a reference to the talent's profile image
    const path = `talents/${talentId}/profile-image`;
    const storageRef = ref(storage, path);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { url: downloadURL, error: null };
  } catch (error) {
    console.error('Error uploading talent profile image:', error);
    return { url: null, error: error.message };
  }
};

// Delete talent profile image
export const deleteTalentProfileImage = async (talentId) => {
  try {
    const path = `talents/${talentId}/profile-image`;
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return { error: null };
  } catch (error) {
    // If file doesn't exist, don't treat as error
    if (error.code === 'storage/object-not-found') {
      return { error: null };
    }
    return { error: error.message };
  }
};

// Get talent profile image URL
export const getTalentProfileImageURL = async (talentId) => {
  try {
    const path = `talents/${talentId}/profile-image`;
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return { url, error: null };
  } catch (error) {
    return { url: null, error: error.message };
  }
}; 