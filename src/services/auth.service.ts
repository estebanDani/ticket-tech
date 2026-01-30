import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "@/services/firebase";
import { CreateUserDto, User } from "@/types";
import { COLLECTIONS } from "@/utils";



export class AuthService {
    
    static async register(data:CreateUserDto, password:string):Promise<User>{

        try {
            const resp  = await  createUserWithEmailAndPassword(auth,data.email,password)
            const userAuth = resp.user
            await setDoc(doc(db,COLLECTIONS.USERS,userAuth.uid),data)

            return{
                uid: userAuth.uid,
                ...data
            }
        } catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Failed to register user');
        }
    }

    static async login(email:string,password:string):Promise<User>{
        try {
            const resp =await signInWithEmailAndPassword(auth,email,password)
            const userAuth = resp.user

            const userDoc = await getDoc(doc(db, COLLECTIONS.USERS , userAuth.uid))

            return {
                uid: userAuth.uid,
                ...userDoc.data() as Omit<User,'uid'>
            }
        } catch (error) {
         console.error('Error logging in user:', error);
         throw new Error('Failed to login user');   
        }

    }

    static async logout(){
        try {
            await auth.signOut()   
        } catch (error) {
            console.error('Error logging out user:', error);
            throw new Error('Failed to logout user');
        }
    }

    static getCurrentUser(): Promise<User | null> {
        return new Promise((resolve) => {
            const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            unsubscribe();

            if (!firebaseUser) {
                resolve(null);
                return;
            }

            const userRef = doc(db, COLLECTIONS.USERS, firebaseUser.uid);
            const snap = await getDoc(userRef);

            if (!snap.exists()) {
                resolve(null);
                return;
            }

            resolve({
                uid: firebaseUser.uid,
                ...(snap.data() as Omit<User, 'uid'>),
            });
            });
        });
    }
}