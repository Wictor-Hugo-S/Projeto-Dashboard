import { useState,useContext } from 'react'
import {FiSettings,FiUpload} from 'react-icons/fi'
import { toast } from 'react-toastify';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';

import { AuthContext } from '../../contexts/auth'

import avatar from '../../assets/avatar.png'
import Header from '../../components/Header'
import Title from '../../components/Title'

import './style.css'




export default function Profile(){

    const {user,sigOut,setUser,storageUser}=useContext(AuthContext)    
   
    const [nome,setNome]=useState(user&& user.nome)
    const [email,setEmail]=useState(user&& user.email)
    const [avatarUrl,setAvatarUrl]=useState(user && user.avatarUrl)
    const [imageAvatar,setImageAvatar]=useState(null);
   
   
   async function handleUpload(){

        const currentId=user.uid;
        const uploadTaks = await firebase.storage()
        .ref(`images/${currentId}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async()=>{

        
        console.log('foto enviada com sucesso')

        
            await firebase.storage().ref(`images/${currentId}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async(url)=>{
                let urlFoto=url

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl:urlFoto,
                    nome:nome
                })
                .then(()=>{
                let data={
                    ...user,
                    avatarUrl:urlFoto,
                    nome:nome
                }
                setUser(data)
                storageUser(data)
            })
                

            })

        })

    }

    function handleFile(e){
        //console.log(e.target.files[0])

        if(e.target.files[0]){
            const image= e.target.files[0]

            if(image.type==='image/jpeg'
            || image.type==='image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }
            else{
                alert('Envie uma imagem do tipo PNG OU JPEG')
                setImageAvatar(null);
                return null;
            }

    }
}


  async function handleSave(e){
       e.preventDefault();
       
       if(imageAvatar===null && nome!==''){
        
        const updateDados= await firebase.firestore().collection('users')
           .doc(user.uid)
           .update({
               nome:nome
           })
           let data={
               ...user,
               nome:nome
           }
           setUser(data);
           storageUser(data);
           
       }
     

       else if(nome!==''&& imageAvatar!==null){
        handleUpload();
           

       }
       toast.success('Salvo com sucesso');


   }

    return(
        <div>
           <Header/>
            <div className='content'>
            <Title name="Meu perfil">
                <FiSettings size={25}/>
            </Title>

            <div className='container'>
                <form  className='form-profile' onSubmit={handleSave}>
                    <label className='label-avatar'>
                        <span>
                            <FiUpload size={25}   color="#fff"/>
                        </span>
                
              <input type="file" accept="image/*" onChange={handleFile} /><br/>
              { avatarUrl === null ? 
                <img src={avatar} width="220" height="220" alt="Foto de perfil do usuario" />
                :<img src={avatarUrl} width="220" height="220" alt="Foto de perfil do usuario" />
              }
            </label>

                    <label>Nome</label>
                        <input type="text" value={nome||''} onChange={(e)=>setNome(e.target.value)}></input>
                    <label>Email</label>
                        <input type="text" value={email || ''} disabled={true} onChange={(e)=>setEmail(e.target.value)}></input>
                    {/* <Link to='/profile'>Salvar</Link> */}
                    <button  type='submit'>Salvar</button>    
                </form>
            </div>
            <div className='container'>
            <button className='logout-btn' onClick={()=>sigOut()  } >Sign out</button>
            </div>
            </div>
        </div>
    )
}