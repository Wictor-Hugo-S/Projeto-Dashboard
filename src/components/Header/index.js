import { useContext } from 'react'

import { FiHome,FiUser,FiSettings } from 'react-icons/fi';

import './style.css'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom'



export default function Header(){
    const {user}=useContext(AuthContext)


    return(
        <div>
            <div className='sideBar'>
               <div className='foto-perfil'>
                   <img  src={user.avatarUrl===null
                    ? avatar
                    : user.avatarUrl} alt="foto avatar"></img>
               </div>
               <div className='links'>
               <Link to="/dashboard">
                   <FiHome size={24} 
                   color="#fff"/>
                   Chamados
                   </Link>

                   <Link to="/customers">
                   <FiUser size={24} 
                   color="#fff"/>
                   Clientes
                   </Link>

                   <Link to="/profile">
                   <FiSettings size={24} 
                   color="#fff"/>
                   Configurações
                   </Link>


                   </div>
            </div>
        </div>
    )
}