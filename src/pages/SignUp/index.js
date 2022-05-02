
import { Link } from 'react-router-dom'
import { useState , useContext} from 'react'
import { AuthContext } from '../../contexts/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import logo from '../../assets/logo.png'
import { useHistory } from 'react-router-dom';



export default function SignUp(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [nome,setNome]=useState('')

  const {signUp,loadingAuth}=useContext(AuthContext)

  const history=useHistory()
  

  const sucesso = (msg) => toast.success(msg);
  const error = (msg) => toast.error(msg);

  const toastMessge={
    200:()=>{
     toast.success('Cadastrado com SUCESSO!!!!!!!!!!!!!!!!!!')
     
        history('/dashboard')
        
     
     
    },
    400:()=>error('Erro ao cadastrar')
  }

   async function handleSubmit(e) {
    e.preventDefault();
    //  history('/dashboard')
    
  signUp(email,password,nome)
.then((res)=>{
  
  
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
            <h1>Cadastrar uma conta</h1>
            <input type="text" placeholder="Name *" required value={nome} onChange={(e)=>setNome(e.target.value)} ></input>

            <input type="text" placeholder="email@gmail.com *" required value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
            
            <input type="password" placeholder="*********" required value={password} onChange={(e)=>setPassword(e.target.value)} ></input>
            
            <button type="submit">  {loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
          </form>  
          <Link to="/">Já tem uma conta? Entre</Link>
        </div>
        
      </div>
      
    )
}