import { useState,useEffect, useContext } from 'react'

import firebase from '../../services/firebaseConnection'
import {useHistory,useParams} from 'react-router-dom'

import {FiPlusCircle} from 'react-icons/fi'
import { toast } from 'react-toastify'
import {FiEdit2} from 'react-icons/fi'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { AuthContext } from '../../contexts/auth'
import './style.css'

export default function New(){

    const {id}=useParams();
    const history=useHistory();

    const [assunto , setAssunto]=useState('Suporte')
    const [status,setStatus]=useState('Aberto')
    const [complemento,setComplemento]=useState('')
    
    const [customersSelected,setSelectedCustomers]=useState(0)
    const[customers,setCustomers]=useState([]);
    const [loadCustomers,setLoadCustomers]=useState(true);
    const [idCustomer,setIdCustomer]=useState(false)

    const {user}=useContext(AuthContext)

    useEffect(()=>{
        async function loadClientes(){
            try{
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot)=>{
                let lista=[];
                snapshot.forEach(doc=>{
                    lista.push({
                        id:doc.id,
                        nomeFantasia:doc.data().nomeFantasia
                    })
                })

                if(lista.length===0){
                    console.log('Nehuma empresa encontrada')
                    setCustomers([{id:'1',nomeFantasia:'s'}])
                    setLoadCustomers(false);
                    return;

                }
                setCustomers(lista)
                setLoadCustomers(false)

                if(id){
                    loadId(lista)
                }

            })

            
            }catch(e){
                console.log('deu algum erro'+e)
                setLoadCustomers(false)
                setCustomers([{id:'1',nomeFantasia:'s'}])
            }


        }
        loadClientes()

    },[])


    async function loadId(lista){
        await firebase.firestore().collection('chamados')
        .doc(id)
        .get()
        .then((snapshot)=>{
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);


            let index=lista.findIndex(item=>item.id===snapshot.data().clienteId)
            setSelectedCustomers(index);
            setIdCustomer(true);
        })
        .catch(e=>{
            console.log('erro no id passado',e)
            setIdCustomer(false)
        })
    }
    
    
   async function handlerSalvar(e){
    e.preventDefault();

    if(idCustomer){
        await firebase.firestore().collection('chamados')
        .doc(id)
        .update({
            cliente: customers[customersSelected].nomeFantasia,
            clienteId:customers[customersSelected].id,
            assunto:assunto,
            status:status,
            complemento:complemento,
            userId:user.uid

        })
        try{
        toast.success('chamado alterado com sucesso')
        setSelectedCustomers(0);
        setComplemento('');
        history.push('/dashboard')
        }
        catch(e){
            toast.error('Ops erro ao registrar,tente mais tarde!')
            console.log(e)
        }
        return;
    }
    
        try{
        await firebase.firestore().collection('chamados')
        .add({
            created:new Date(),
            cliente: customers[customersSelected].nomeFantasia,
            clienteId:customers[customersSelected].id,
            assunto:assunto,
            status:status,
            complemento:complemento,
            userId:user.uid
        })
       
            toast.success('Chamado criado com sucesso');
            setComplemento('');
            setSelectedCustomers(0);
            

        }catch(e){
            console.log('error'+e)
            toast.error('Ops erro ao registrar,tente mais tarde.')
        }
       
    }
    //quando troca o assunto

    function handleChangeSelect(e){
        setAssunto(e.target.value)
        console.log(e.target.value)

    }
    //quando troca o status
    function handleOptionChange(e){

        setStatus(e.target.value)
        console.log(e.target.value)

    }
    //chamado quando troca de cliente
    function handleChangeCustomers(e){
        setSelectedCustomers(e.target.value)

        // console.log('Index do cliente selecionado',e.target.value)
        // console.log('Cliente selecionado',customers[e.target.value])

    }

    return(
       
        <div>
             {idCustomer?(
                  <>
                   <Header/>
                    <div className='content'>
                         
        
                        <Title name="Editar Chamado">
                            <FiEdit2 size={25}/>
                        </Title>
                    </div>
                    </>

             ):
             (  <>
                <Header/>
                <div className='content'>
           
            

                <Title name="Novo Chamado">
                    <FiPlusCircle size={25}/>
                </Title>
                </div>
                </>
                )}
                 <div className='content'>

                <div className='container'>
                    <form className='form-profile' onSubmit={handlerSalvar}>

                    <label>Cliente: </label>
                        {loadCustomers?(
                            <input type="text" disabled={true} value="Carregando clientes..."></input>
                        ):
                        (
                            <select value={customersSelected} onChange={handleChangeCustomers}>
                            {
                                customers.map((item,index)=>{
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}

                                        </option>
                                    )
                                })
                            }
                         </select>

                        )}
                     
                         

                            <label> Assunto</label>
                            <select value={assunto} onChange={handleChangeSelect}>
                                <option value="Suporte">Suporte</option>
                                <option value="Visita Técnica">Visita Técnica</option>
                                <option value="Financeiro">Financeiro</option>
                            </select>

                            <label>Status</label>

                            <div className='status'>

                                <input 
                                type="radio" 
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status==='Aberto'}
                                 >
                                 </input>
                                <span>Em Aberto</span>

                                <input type="radio" 
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status==='Progresso'}>
                                 </input>
                                <span>Em Progresso</span>


                                <input 
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status==='Atendido'}>
                                  </input>
                                <span>Atendido</span>
                            </div>

                            <label>Complemento</label>
                            <textarea type="text"
                            placeholder='Descreva seu problema'
                            value={complemento}
                            onChange={(e)=>setComplemento(e.target.value)}
                            >
                                    
                            </textarea>

                            <button type='submit'>Salvar</button>
                    </form>




                </div>


            </div>
           
        </div>
    )
}