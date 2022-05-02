
import {useState, createContext, useEffect } from "react";
import firebase from '../services/firebaseConnection'
import { useNavigate } from "react-router-dom";

export const AuthContext=createContext({})

export default function AuthProvider({children}) {
  

  const[user,setUser]=useState(null)
  const [loadingAuth, setLoadingAuth]=useState(false)
  const [loading, setLoading]=useState(true)
  
  useEffect(()=>{

      function loadStorage(){
        const storeUser=localStorage.getItem('UserSistema')

        if(storeUser){
          setUser(JSON.parse(storeUser))
          setLoading(false)
      }

      setLoading(false);
    }
    loadStorage();

  },[])

  async function signIn(email,password){
    setLoadingAuth(true)
    let response={}
    try{
      const createUser= await firebase.auth().signInWithEmailAndPassword(email,password)
      let uid= createUser.user.uid;

      const userProfile=await firebase.firestore().collection('users')
      .doc(uid).get();
      let data={
        uid:uid,
        nome:userProfile.data().nome,
        avatarUrl:userProfile.data().avatarUrl,
        email:createUser.user.email
      }
          setUser(data)
        storageUser(data)
        setLoadingAuth(false)

        response.statusCode=200
        response.data=createUser

       return response

      

    }
    catch(e){
      console.log('error'+e)

      response.statusCode=400
      response.data=e
      setLoadingAuth(false)
      return response
    }

  }

  async function signUp(email,password,nome) {

    setLoadingAuth(true);
    let response={}
    try{
    const createUser= await firebase.auth().createUserWithEmailAndPassword(email,password)
    let uid=createUser.user.uid

    await firebase.firestore().collection('users')
    
    .doc(uid).set({
          nome:nome,
          avatarUrl:null,
         })
         let data={
                uid:uid,
                nome:nome,
                email:createUser.user.email,
                avatarUrl:null
              }
              setUser(data)
                  storageUser(data)
                  setLoadingAuth(false)

                  response.statusCode=200
                  response.data=createUser
                  //toas.sucess(Deu tudo certo)
                  return response
            }catch(e){
              console.log('error'+e)
              setLoadingAuth(false);
              response.statusCode=400
              response.data=e
              return response
              //toas.erro('Deu erro')
            }
            
          
          }
    // await firebase.auth().createUserWithEmailAndPassword(email,password)
    
    // .then(async (value)=>{

    //   let uid=value.user.uid
     
    //   await firebase.firestore().collection('users')
      
    //   .doc(uid).set({
    //     nome:nome,
    //     avatarUrl:null,
    //   })

    //   .then(()=> {
    //     let data={
    //       uid:uid,
    //       nome:nome,
    //       email:value.user.email,
    //       avatarUrl:null
    //     }
        
    //     setUser(data)
    //     storageUser(data)
    //     setLoadingAuth(false)

    //   });
    // })
    // .catch(e=>console.log(e) , setLoadingAuth(false) )

  

  function storageUser(data){
    localStorage.setItem('UserSistema',JSON.stringify(data))
  }
  
  async function sigOut(){
  
    await firebase.auth().signOut();
    localStorage.removeItem('UserSistema')
    setUser(null);
  
    

  }


    return(
            <AuthContext.Provider 
            value={{
              signed: !!user,
              user,
              loading,
              signUp,
              sigOut,
              signIn,
              loadingAuth,
              setUser,
              storageUser
              }}>

                {children}

            </AuthContext.Provider>
        
    )
}