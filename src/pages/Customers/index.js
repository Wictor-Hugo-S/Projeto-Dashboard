
import {FiUser} from 'react-icons/fi'
import { useState } from 'react'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'
import './style.css'
import Title from '../../components/Title'
import Header from '../../components/Header'

export default function Customers(){

    const [nomeFantasia,setNomeFantasia]=useState('')
    const [cnpj,setCnpj]=useState('')
    const [endereco,setEndereco]=useState('')


   async function handleAdd(e){
        e.preventDefault()
        try{
        await firebase.firestore().collection('customers')
        .add({
            nomeFantasia:nomeFantasia,
            cnpj:cnpj,
            endereco:endereco
        })
    }  catch ( e ) {
        // Code to run if an exception occurs
        console.log('Deu erro ao cadastrar '+e)
        toast.error('Erro ao cadastrar')
     }
     
        setNomeFantasia('')
        setCnpj('')
        setEndereco('')
        toast.info('Empresa cadastrada com sucesso!')

       
    }
    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleAdd}>

                        <label>Nome fantasia</label>
                        <input type='text' required placeholder='Nome da empresa' value={nomeFantasia} onChange={(e)=>setNomeFantasia(e.target.value)}></input>

                        <label>CNPJ</label>
                        <input type='text' required placeholder='Seu CNPJ' value={cnpj} onChange={(e)=>setCnpj(e.target.value)}></input>
                        
                        <label>Endereço</label>
                        <input type='text' required placeholder='Endereço da empresa' value={endereco} onChange={(e)=>setEndereco(e.target.value)}></input>
                    
                        <button type='submit'>Cadastrar</button>
                    </form>



                </div>

            </div>
        </div>
    )
}