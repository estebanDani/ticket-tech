import { CreateUserDto, User } from "@/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

}