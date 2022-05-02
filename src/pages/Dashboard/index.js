import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import firebase from '../../services/firebaseConnection'

import {FiMessageSquare, FiPlus,FiSearch,FiEdit2} from 'react-icons/fi'
import { format } from "date-fns"


import Header from "../../components/Header"
import './style.css'
import Title from '../../components/Title'
import Modal from "../../components/Modal"

const listRef =  firebase.firestore().collection('chamados').orderBy('created','desc')
export default function Dashboard(){

    const[chamados,setChamados]=useState([]);
    const[loading,setLoading]=useState(true);
    const [loadingMore, setLoadingMore]=useState(false);
    const[isEmpty,setIsEmpty]=useState(false);
    const[lastDocs,setLastDocs]=useState();

    //m0odal
    const[showPostModal,setShowPostModal]=useState(false)
    const[detail,setDetail]=useState()

    useEffect(()=>{

        loadingChamados()

       

    },[])

    async function loadingChamados(){
      await listRef.limit(5)
      .get()
      .then((snapshot)=>{
          updateState(snapshot)

      })
      .catch(e=>{
          console.log('Deu algum erro',e)
          setLoadingMore(false)
      })
      setLoading(false)
       

    }
    async function updateState(snapshot){
        const isColletionsEmpty=snapshot.size===0;

        if(!isColletionsEmpty){
            let list=[]
            snapshot.forEach(element => {
                list.push({
                    id:element.id,
                    assunto:element.data().assunto,
                    cliente:element.data().cliente,
                    clienteId:element.data().clienteId,
                    created:element.data().created,
                    createdFormated:format(element.data().created.toDate(),'dd/MM/yyyy'),
                    createdFormatedData:format(element.data().created.toDate(),'k:m:s b'),
                    status:element.data().status,
                    complemento:element.data().complemento
                })


            });
            const lastDoc=snapshot.docs[snapshot.docs.length-1];//pegando o ultimo documento
            setChamados(chamados=>[...chamados,...list]);
            setLastDocs(lastDoc);

        }
        else{
            setIsEmpty(true);
        }

        setLoadingMore(false)
    }
    //date-fns
   async function handleMore(){
        setLoadingMore(true)
       const snapshot= await listRef.startAfter(lastDocs).limit(5)
        .get()
        updateState(snapshot)

    }

    function togglePostModal(item){
        setShowPostModal(!showPostModal)//trocando de true para false
        setDetail(item)
        
    }

    if(loading){
        return(
            <div>
                 <Header/>
                 <div className="content">
                    <Title name="Atendimentos">
                        <FiMessageSquare size={25}></FiMessageSquare>
                    </Title>
                        <div className="container dashboard">
                            <span>Buscando Chamados...</span>
                        </div>

                    </div>

            </div>
        )
    }
    return(
        <div>
        <Header/>
                 <div className="content">
                    <Title name="Atendimentos">

                        <FiMessageSquare size={25}></FiMessageSquare>
                        
                    </Title>
           
                    {chamados.length===0 ? (

                        <div className="container dashboard">

                            <span>Nenhum chamado registrado ...</span>
                            <Link to="/new" className="new">

                             <FiPlus size={25} colo="#FFF"/>
                                Novo Chamado
                            </Link>
                    
                    </div>
                    )
                    :(
                        <> 
                        <Link to="/new" className="new newTabela">

                        <FiPlus size={25} colo="#FFF"/>
                           Novo Chamado
                       </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Clientes</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"> Data do Cadastro</th>
                                    <th scope="col">Horario do Cadastro</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chamados.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td data-label="Cliente">{item.cliente}</td>
                                            <td data-label="Assunto">{item.assunto}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{backgroundColor:item.status==='Aberto'?'#5cb85c':'#999'}}>{item.status}</span>
                                            </td>
                                            <td data-label="Data do Cadastro">{item.createdFormated}</td>
                                            <td data-label="Horario do Cadastro">{item.createdFormatedData}</td>
                                            <td data-label="#">
                                                 <div className="button-action">
                                                    <button className="action" style={{backgroundColor:'#3583f6'}} onClick={()=>togglePostModal(item)}>
                                                        <FiSearch size={17} color="#FFF"/>
                                                    </button>
                                                    <Link className="action" style={{backgroundColor:'#F6a935'}} to={`/new/${item.id}`}>
                                                        <FiEdit2 size={17} color="#FFF"/>
                                                    </Link>
                                                </div>
                                            </td>
                                     </tr>

                                    )
                                })}
                                
                            </tbody>
                        </table>
                        {loadingMore && <h3 style={{textAlign:'center',marginTop:15}}>Buscando mais dados...</h3>}
                       { !loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button>}

                       </>
                       
                    )}

                </div>

                {showPostModal&&(
                    <Modal  
                    conteudo={detail} 
                    close={togglePostModal}
                    >
                       
                    </Modal>
                )}

           
        </div>
    )
}