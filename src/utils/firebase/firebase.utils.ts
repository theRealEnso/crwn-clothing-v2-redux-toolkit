import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, NextOrObserver, UserCredential} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot} from 'firebase/firestore'; // doc gets document instance, getDoc function only gets data inside a document instance. Likewise, setDoc function only sets the data inside a document. The doc function is what allows us to get the entire document instance (super confusing naming convention!)

import { Category, CategoryItem } from "../../store/categories/category.types";

// export type ProductObject = {
//     title: string;
//     items: CategoryItem[];
// };

export type AdditionalInformation = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyD79nPXhJ9-gsSaP1j0XFy09oMdBT-Kzhg",
  authDomain: "crown-clothing-db-137a9.firebaseapp.com",
  projectId: "crown-clothing-db-137a9",
  storageBucket: "crown-clothing-db-137a9.appspot.com",
  messagingSenderId: "585062552288",
  appId: "1:585062552288:web:b7a81d1e8452dc797b7685",
  measurementId: "G-SNLMY4PTJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const googleProvider = new GoogleAuthProvider(); // GoogleAuthProvider is a class. Can be used to create multiple instances of providers
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

//setup signing in with providers
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


//////////////////     CREATING DATABASE AND CREATING COLLECTION/DOC/STORING DATA  //////////////////////////////////////////////
export const db = getFirestore(app); //first, instantiate firestore

//async function to create collection in firebase and create documents. Has two parameters collectionKey and objectToAdd. ObjectToAdd is a placeholder that will accept the array of objects for each of our product categories inside shop-data.js (passing in SHOP_DATA), and collectionKey is placeholder that will accept a string--will pass 'categories' string so that db will create a collection named "categories"
export const addCollectionAndDocuments = async (collectionKey: string, productObjectsToAdd: Category[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey); //collectionRef now points to the space where categories collection exists inside db (if not existing, then creates the name space)
    const batch = writeBatch(db); // create batch instance in order to add all of our objects to collectionRef in one successful transaction. A writeBatch is created using the writeBatch method from the Firestore SDK. A batch is a way to perform multiple write operations atomically. This means that either all the write operations will succeed, or none of them will.

    //Iterating through SHOP_DATA, create and set each object into collectionRef a.k.a categories collection as a new document, using the title as the ID. This creates hats/jackets/mens/sneakers/womens documents that will be nested under categories using the doc method. Finally, set method is used to populate  hats/jackets/mens/sneakers/womens docs with their respective data

    //Or in other words, The function then iterates over each object in the productObjectsToAdd array (SHOP_DATA array of objects), creating a reference to a document within the collectionRef using the doc method from the Firestore SDK. The document reference is created using the object's title property as the document ID, converted to lowercase using the toLowerCase method.
    productObjectsToAdd.forEach((productObject) => {
        const docRef = doc(collectionRef, productObject.title.toLowerCase());
        batch.set(docRef, productObject);
        //Finally, the batch.set method is used to add the object to the batch as a write operation, with the document reference and the object passed in as arguments. This adds the document to the batch to be written to the database.
    });

    await batch.commit();
    //After all documents have been added to the batch, the batch.commit method is called to commit all the write operations to the database. This returns a Promise which resolves when all the write operations have been completed successfully.
    console.log('done!');
};

// addCollectionAndDocuments('categories', SHOP_DATA);


//async function to get categories + products documents from firestore, returns them as an map object (closest thing to hashmap)
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories'); //collectionRef uses collection method to create a reference to categories collection inside firebase
    const q = query(collectionRef); // query method on collectionRef creates a query that retrieves all of the documents in categories collection (i.e. hats/jackets/sneakers/womens/mens)

    const querySnapshot = await getDocs(q); // The getDocs method from the Firestore SDK is used to asynchronously retrieve the documents matching the query, which is stored in the querySnapshot constant.
    // console.log(querySnapshot); //prints giant object. Need to nest deeper
    console.log(querySnapshot.docs); //nest one layer deeper => .docs contains array of 5 general product doc instances for each category, but not actual data
    const categoriesArray = querySnapshot.docs.map((document) => document.data()); // give me the actual data inside the general product document instances => returns actual array of 5 giant product objects per category

    return categoriesArray as Category[];
};

//async function that accepts user authentication object and store inside of firestore =>  (reminder that userAuth is just a placeholder name). We will be passing in destructured user data directly from the response object back in the SignInComponent
export const createUserDocumentOrSignInUserFromAuth = async (userAuth: User, additionalInformation: AdditionalInformation = {}): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if(!userAuth) return;
    //doc function takes 3 arguments (firestore database instance, name of collection (will set collection with name if it does not exist), and a unique ID)
    const userDocRef = doc(db, 'users', userAuth.uid); //use unique id from user object to get document reference that points to where the data exists in firebase. Only a pointer, not actual data
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef); //actually get the data inside the document reference
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists()); //.exists method returns a boolean

     //If user data does not exist yet, then use setDoc function to set the data inside the document, and then place document inside the database. Otherwise, document already exists and simply return to me that document
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth; // destructure directly from user data
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            console.log(`error creating the user: ${error}`);
        }
    } else {
        // return userDocRef;
        return userSnapshot as QueryDocumentSnapshot<UserData>;
    };
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | undefined> => { // hover over createUserWithEmailAndPassword to get Promise information
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | undefined> => { //hover over signInWithEmailAndPassword to get Promise information
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback); //hover over onAuthStateChanged to get Promise information

//function that just checks if there is an authenticated user or not
export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    });
};

//note that auth i.e getAuth() is sort of like a state that keeps track of user data (if the user is signed in) or null if the user is signed out

// What is a callback? A callback is just a block of code that performs some desired function
// Here, we are defining onAuthStateChangedListener, which is really just a wrapper function that wraps onAuthStateChanged and executes this method
// OnAuthStateChangedListener will execute some sort of callback function that receives a user object. Based on this user object, perform some operation. Since we are actually returning the onAuthStateChanged function, onAuthStateChanged will then receive these same set of instructions to be executed.
// Since onAuthStateChanged is an open listener, it will automatically listen for anytime the state of the auth singleton changes (i.e. user signs in or out) and run the callback function
// Specific instructions for the callback function is defined in the user context

//Observer pattern => this is just some kind of asynchronous stream of events
// { next: (nextVal) => {// do something with nextVal}, error: (error) => {// do something with error}, complete: () => {// do something when complete} }
// in other words, if we get some event, then we fire next. Once stream of events is done, we fire complete.

/**
 * onAuthStateChanged creates a listener for us behind the scenes
 * {
 * next: callback,
 * error: errorCallback,
 * complete: completedCallback
 * }
 */

////////////////////////////////////////////////////////////////////////

//Before migrating to redux

// export const getCategoriesAndDocuments = async () => {
//     const collectionRef = collection(db, 'categories'); //collectionRef uses collection method to create a reference to categories collection inside firebase
//     const q = query(collectionRef); // query method on collectionRef creates a query that retrieves all of the documents in categories collection (i.e. hats/jackets/sneakers/womens/mens)

//     const querySnapshot = await getDocs(q); // The getDocs method from the Firestore SDK is used to asynchronously retrieve the documents matching the query, which is stored in the querySnapshot constant.
//     // console.log(querySnapshot); //prints giant object
//     // console.log(querySnapshot.docs); //nest one layer deeper => .docs contains array of 5 product doc instances for each category
//     const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => { //querySnapshot.docs is an array that contains our product documents nested under categories collection. Accumulator initializes as empty object
//         // console.log(docSnapshot);
//         console.log(docSnapshot.data()); // .data nested layer shows up under prototype
//         const {title, items} = docSnapshot.data(); // destructure title and items array off of docSnapshot
//         accumulator[title.toLowerCase()] = items; // creating a hash table. Remember that accumulator is an object. On each callback, accumulator object updates with new key-value pairs added (key is the product title, value is array of product objects)
//         return accumulator; 
//     }, {});

//     console.log(categoryMap);
//     return categoryMap; // eventually, our object will be a hash table aka giant object, and nested in it the 5 product documents, and nested in each product document an array of product objects tied to that particular product doc (see in red below)


//     // The function then processes the querySnapshot using the reduce method to create the categoryMap object. The reduce method takes two arguments: a callback function and an initial value for the accumulator. Initial value of accumulator is set as an empty object

//     // The callback function is called once for each document in the querySnapshot (docSnapshot). It takes two arguments: the accumulator object and the current docSnapshot. The accumulator is the value returned from the previous call to the callback, or the initial value if it's the first call (initial value is empty object). The docSnapshot represents a single product document in the querySnapshot.docs array

//     // The callback function extracts the title and items properties from the document data using destructuring and stores them in the title and items constants, respectively. (items is an array of product objects)

//     // The accumulator object is then updated by setting a new key-value pair, with the title converted to lowercase using the toLowerCase method as the key and items as the value. Continues this pattern until callback executes on all product documents in the querySnapshot

//     // After processing all the documents, the categoryMap object is returned from the function.

//     // Overall, the getCategoriesAndDocuments function provides a convenient way to retrieve all documents from a collection in Firestore and store them as a JavaScript object with lowercase document titles as keys and document data as values.
// };

/* categoryMap should end up looking like this-- one giant object that has nested within it our product categories, and nested under each product categories is an array of objects for each product
{
    hats: [{...},{...},{...},{...},{...},{...},],

    jackets: [{...},{...},{...},{...},{...},{...},],
    
    sneakers: [{...},{...},{...},{...},{...},{...},],
    
    mens: [{...},{...},{...},{...},{...},{...},],

    womens: [{...},{...},{...},{...},{...},{...},],
}

*/