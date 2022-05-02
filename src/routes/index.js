



import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import New from '../pages/New';
export default function Routes(){
  return(
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />

      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/customers" component={Customers} isPrivate/>
      <Route exact path="/new" component={New} isPrivate/>
      <Route exact path="/new/:id" component={New} isPrivate/>
    </Switch>
  )
}

















// import { Routes,Route } from 'react-router-dom';
// import RouteWrapper from './Route';
// import { BrowserRouter } from 'react-router-dom';
 
// import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';
// import Dashboard from '../pages/Dashboard';

//  import Profile from '../pages/Profile';
// export default function Routess(){
//     return(
      
//         <Routes>
//             {/* <Route exact path="/" element={<RouteWrapper isPrivate={false} />}>
//                 <Route exact path="/" element={<SignIn/>}/>
//             </Route>
          
//                 <Route exact path="/register" element={<SignUp/>}/>
                    
//             <Route exact path="/dashboard" element={<RouteWrapper  isPrivate/>}>
//                 <Route exact path="/dashboard" element={<Dashboard/>}/>
//             </Route> 
            
                     
//             <Route exact path="/profile" element={<RouteWrapper  isPrivate={true}/>}>
//                 <Route exact path="/profile" element={<Profile/>}/>
//             </Route>  */}
// {/* 
//             <Route  path='/dashboard' element={<RouteWrapper  redirectTo='/dashboard'>
//                 <Dashboard/>
//             </RouteWrapper>}/>

//             <Route  path='/' element={<SignIn/>}/>

         
            
//             <Route  path='/register' element={<SignUp/>}/>
           

            
//             <Route  path='/profile' element={<RouteWrapper redirectTo='/profile'>
//                 <Profile/>
//             </RouteWrapper>}/> */}
// {/* 
//             <Route path='/' element={<SignIn/>}/>
//             <Route path='/dashboard'  element={<RouteWrapper/>}>

         
//             <Route path='/dashboard' element={<Dashboard/>}/>
//                  */}

            
//           <Route path="/dashboard" element={<RouteWrapper redirectTo='/dashboard'>
//                  <Dashboard/>
//           </RouteWrapper> 
//          }/>
               
//                <Route exact path="/profile" element={<RouteWrapper redirectTo='/'>
//                  <Profile/>
//           </RouteWrapper> }/>

         
//          <Route exact path='/register' element={<SignUp/>} />
//          <Route exact path="/" element={<SignIn/>}/>


//         </Routes>
        
       
//     )
// }




// {/* 
//             <Route exact path="/testeRoute" element={<RouteWrapper  isPrivate={false}/>}>
//                 <Route exact path="/testeRoute" element={<TesteRoute/>}/>
//             </Route>  */}