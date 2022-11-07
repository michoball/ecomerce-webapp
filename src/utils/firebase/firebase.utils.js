import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQjgsX0efamI3UIlSMbV7dgH9w010Gj7k",
  authDomain: "crown-ecommerce-eed97.firebaseapp.com",
  projectId: "crown-ecommerce-eed97",
  storageBucket: "crown-ecommerce-eed97.appspot.com",
  messagingSenderId: "1099074700251",
  appId: "1:1099074700251:web:8fa745634d74f87e329dfe",
};

// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
  // 위 categoryMap 을 그냥 array로 받아오지 않고 reduce를 이용해서 object로 바꿔서 가져온 이유는
  // array 배열보다 hash table형식이 데이터를 search 하는데 훨씬 빠르기 때문이다.
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// auth state 상태관리 func
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // unsubscribe함수로 onAuthStateChanged 함수 선언
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        //콜백함수로 auth를 받아오면 바로 함수 종료
        // 안그럼 메모리 유출이 있을 수 있음 -- 종료하지 않으면 상태관리가 계속 돌아가고 있기때문에
        console.log("user is Changed");
        unsubscribe();

        resolve(userAuth);
      },
      reject
    );
  });
};
