
import { useState } from 'react'
import {  useContext } from 'react'
import { Link  } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'
import { toast,ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router-dom'


import './style.css'
import logo from '../../assets/logo.png'


export default function SignIn(){

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const{signIn,loadingAuth}=useContext(AuthContext)
  
  const history=useHistory();  
  const sucesso=(msg)=>toast.success(msg)
  const erro=(msg)=> toast.error(msg)

  const toastMessge={
    200:()=>{
      sucesso('Bem vindo de volta')
      history('/dashboard')
    },
    400:()=> erro('Error ao tentar logar')
  }

  async function handleSubmit(e){
    e.preventDefault();

    signIn(email,password)
    .then(res=>{
      toastMessge[res.statusCode]();
      console.log(res)
    })
    
  }

    return (
      <div className='container-center'>
        <div className='login'>
            <div className='logo'>
              <img src={logo} alt="Sistema logo"></img>
            </div> 

          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input type="text" placeholder="email@gmail.com *" required value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
            
            <input type="password" placeholder="*********" required value={password} onChange={(e)=>setPassword(e.target.value)} ></input>
            
            <button type="submit"> {loadingAuth ? 'Carregando...' : 'Acessar'}</button>
          </form>  
          <Link to="/register">Criar uma conta</Link>
        </div>

      </div>
      
    )
}