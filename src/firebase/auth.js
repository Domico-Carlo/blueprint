import { firebase_auth, firebase_db } from "./FirebaseConfig"; // Correct import path
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile, // Added import
} from "@firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  firstName,
  lastName,
  address,
  city,
  state,
  postalCode,
  dateOfBirth
) => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      firebase_auth,
      email,
      password
    );

    // Get the user object
    const user = userCredential.user;

    // Update the user's profile with additional details
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`, // Combine first and last name for displayName
    });

    // Optionally, save additional user details to Firestore or Realtime Database
    await addUserToFirestore(user.uid, {
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      dateOfBirth,
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Helper function to save user details to Firestore
const addUserToFirestore = async (userId, userData) => {
  try {
    await firebase_db.collection("users").doc(userId).set(userData);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error;
  }
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(firebase_auth, email, password);
};

export const doSignWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(firebase_auth, provider);
  return result;
};

export const doSignOut = () => {
  return firebase_auth.signOut();
};

// Uncomment and use these functions if needed
// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(firebase_auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(firebase_auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(firebase_auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };