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
  User,
  NextOrObserver,
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
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

const firebaseConfig = {
  apiKey: "AIzaSyBQjgsX0efamI3UIlSMbV7dgH9w010Gj7k",
  authDomain: "crown-ecommerce-eed97.firebaseapp.com",
  projectId: "crown-ecommerce-eed97",
  storageBucket: "crown-ecommerce-eed97.appspot.com",
  messagingSenderId: "1099074700251",
  appId: "1:1099074700251:web:8fa745634d74f87e329dfe",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// objectToAdd 로 들어올 값은 어떤 형태인지 여기서는 알 수 없기 때문에(다양하게 넣어서 firebase에 저장할 수 있으니까)
// 딱 하나 알 수 있는 title에 대한 type 만 지정해주고 이값을 가지는 type으로 extends해서 정의한다.
export type objectToAdd = {
  title: string;
};
// async 함수는 Promise 를 리턴한다. 밑에 함수는 리턴하는 값이 없기 때문에
// 다음과 같이 작성한다.
export const addCollectionAndDocuments = async <T extends objectToAdd>(
  collectionKey: string,
  objectToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

// 밑의 함수와 같은 경우는 리턴하는 값이 있으므로 Promise<>안에 리턴하는 값의 타입을 적어준다
// 여기서 querySnapshot은 categories안의 데이터들인데
// 이는 이미 category.type 에서 타입을 정의했으므로 정의한 Category 타입을 import해서 작성한다.
// 그리고 리턴 값의 map 안쪽 부분에도  docSnapshot.data()의 타입을 정해준다.
//  docSnapshot.data()이 Category 타입을 가지고 이들이 모인 리턴값이 Category[] 인것
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  // userAuth 는 실제 firebase에서 가져오는 user정보이다.
  // firebase에서는 이 값의 타입을 User로 정의해뒀다. 이를 import 해서 사용하면됨
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  // async니까 Promise를 리턴하고 이 Promise는 두가지 경우의 값을 가질 수 있다.
  // userAuth가 없는 상태에서는 값을 전달할게 없기때문에 void
  // 로그인을 할때는 계정을 새로 만들든 아니는 firebase storage에 만든 users doc에 있는
  // user querySnapshot을 리턴한다.
  // 따라서 querySnapshot은 QueryDocumentSnapshot이라는 firebase에있는 타입을 가지고
  // 안에 user정보는 우리 만들었기 때문에
  // 위 처럼 새로 UserData 타입을 만들어서 QueryDocumentSnapshot에 넣어준다
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
      console.log("error creating the user", error);
      //error 는 값을 가질수도 값이 없을수도 있기 때문에
      // error.message는 쓸 수 없다 그래서 error 로 냅둔다.
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};
// 위 두함수는 함수에 마우스를 hover 하면 알수있 듯 타입이
// Promise<UserCredential | undefined>로 이미 정의 되어있어서 따로 타입을 지정하지 않는다.

export const signOutUser = async () => await signOut(auth);
// 위에 함수와 비슷한 이유로 얘도 타입지정 필요 x

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
// userAuth 상태가 변하는지를 관찰하고 변함에 따른 함수를 리턴하는 함수이다.
// firebase auth에 관련 내용을 보면 위와같은 NextOrObserver<User> 타입을 가진다는 것을 알 수 있다.
//https://firebase.google.com/docs/reference/js/auth.auth

export const getCurrentUser = (): Promise<User | null> => {
  console.log("checkSession");

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        console.log("user is Changed :", userAuth);
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

// 위처럼 유저의 상태변화를 관찰하는 함수이다.
// Promise 로 직접 만든 함수다.
// user가 변하거나 로그인을 하면 User 값을 가지고 로그아웃하면 null을 리턴하기때문에
// Promise<User | null>  라고 타입을 지정한다.
