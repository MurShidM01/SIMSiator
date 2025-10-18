// Firebase Authentication Module
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  doc,
  setDoc,
  getDoc,
  Timestamp
} from './firebase.js';

// Current user state
let currentUser = null;

// Initialize auth state listener
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  
  if (user) {
    console.log('User is signed in:', user.email);
    // Store user session
    localStorage.setItem('firebaseAuth', 'true');
  } else {
    console.log('User is signed out');
    localStorage.removeItem('firebaseAuth');
  }
});

// Register new user with Firebase
async function registerUser(email, password, name) {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, {
      displayName: name
    });
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      createdAt: Timestamp.now(),
      lastActive: Timestamp.now(),
      searchHistory: [],
      verified: false,
      searchCount: 0,
      searchLimit: 5,
      lastResetTime: Timestamp.now()
    });
    
    return { success: true, user: user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
}

// Login user with Firebase
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last active
    const userDoc = doc(db, 'users', userCredential.user.uid);
    await setDoc(userDoc, {
      lastActive: Timestamp.now()
    }, { merge: true });
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

// Logout user
async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
}

// Get current user
function getCurrentUser() {
  return auth.currentUser;
}

// Check if user is authenticated
function isAuthenticated() {
  return auth.currentUser !== null;
}

// Get user profile from Firestore
async function getUserProfile(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // Add lastResetTime if it doesn't exist (for existing users)
      if (!userData.lastResetTime) {
        await setDoc(doc(db, 'users', uid), {
          lastResetTime: Timestamp.now()
        }, { merge: true });
        userData.lastResetTime = Timestamp.now();
      }
      
      return { success: true, data: userData };
    } else {
      return { success: false, error: 'Profile not found' };
    }
  } catch (error) {
    console.error('Error getting profile:', error);
    return { success: false, error: error.message };
  }
}

// Update user profile in Firestore
async function updateUserProfile(uid, updates) {
  try {
    const userDoc = doc(db, 'users', uid);
    await setDoc(userDoc, {
      ...updates,
      lastActive: Timestamp.now()
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: error.message };
  }
}

// Verify account with secret key
async function verifyAccount(uid, enteredKey) {
  try {
    // Get the secret key from Firestore
    const secretKeyDoc = await getDoc(doc(db, 'secretkey', 'master'));
    
    if (!secretKeyDoc.exists()) {
      return { success: false, error: 'Verification system not configured' };
    }
    
    const storedKey = secretKeyDoc.data().secretkey;
    
    // Check if entered key matches
    if (enteredKey === storedKey) {
      // Update user profile to verified
      await setDoc(doc(db, 'users', uid), {
        verified: true,
        verifiedAt: Timestamp.now()
      }, { merge: true });
      
      return { success: true };
    } else {
      return { success: false, error: 'Invalid secret key' };
    }
  } catch (error) {
    console.error('Verification error:', error);
    return { success: false, error: error.message };
  }
}

// Check and reset search count if 24 hours have passed
async function checkAndResetSearchCount(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // Handle missing lastResetTime for existing users
      if (!userData.lastResetTime) {
        await setDoc(doc(db, 'users', uid), {
          lastResetTime: Timestamp.now()
        }, { merge: true });
        return { success: true, reset: false };
      }
      
      // Convert Firestore Timestamp to Date
      const lastReset = userData.lastResetTime.toDate ? userData.lastResetTime.toDate() : new Date(userData.lastResetTime.seconds * 1000);
      const now = new Date();
      const hoursPassed = (now - lastReset) / (1000 * 60 * 60);
      
      console.log('Hours passed since last reset:', hoursPassed);
      
      // If 24 hours have passed and user is not verified, reset count
      if (hoursPassed >= 24 && !userData.verified) {
        console.log('Resetting search count for user:', uid);
        await setDoc(doc(db, 'users', uid), {
          searchCount: 0,
          lastResetTime: Timestamp.now()
        }, { merge: true });
        return { success: true, reset: true };
      }
      return { success: true, reset: false };
    }
    return { success: false };
  } catch (error) {
    console.error('Error checking reset:', error);
    return { success: false, error: error.message };
  }
}

// Increment search count
async function incrementSearchCount(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const currentCount = userDoc.data().searchCount || 0;
      await setDoc(doc(db, 'users', uid), {
        searchCount: currentCount + 1,
        lastActive: Timestamp.now()
      }, { merge: true });
      return { success: true, newCount: currentCount + 1 };
    }
    return { success: false };
  } catch (error) {
    console.error('Error incrementing search count:', error);
    return { success: false, error: error.message };
  }
}

// Export functions to window for global access
window.FirebaseAuth = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
  getUserProfile,
  updateUserProfile,
  verifyAccount,
  checkAndResetSearchCount,
  incrementSearchCount,
  auth,
  db
};

console.log('Firebase Authentication Module loaded');

// Dispatch event to signal Firebase is ready
window.dispatchEvent(new Event('firebaseReady'));
