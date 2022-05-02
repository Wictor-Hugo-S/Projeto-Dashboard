// import { useContext } from 'react'
// import { Outlet, Navigate } from "react-router-dom";
// import { AuthContext } from '../contexts/auth';
// import { Route } from 'react-router-dom';




import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){
  const { signed, loading } = useContext(AuthContext);



  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed && isPrivate){
    return <Redirect to="/" />
  }

  if(signed && !isPrivate){
    return <Redirect to="/dashboard" />
  }


  return(
    <Route
      {...rest}
      render={ props => (
        <Component {...props} />
      )}
    />
  )
}





// export default function RouteWrapper({ 
//     // children,isPrivate,redirectTo

//     // element:Element,
//     // isPrivate,
    
//     // ...rest
//     children,redirectTo
// })

// {
    
//     const { signed } = useContext(AuthContext);
//     console.log('auth',signed)
    
 
//     // if(!signed && isPrivate) return <Navigate to="/" />
 
//     // if(signed && !isPrivate )return <Navigate to="/dashboard"/> 

 
// //  return signed ? <Outlet/> : <Navigate to="/"/>
                          
//   // 
//   console.log("isAuth",signed)
//   return signed ? children : <Navigate to={redirectTo}/>
//     // // return(
//     // //    <Route
//     // //    {...rest}
//     // //    render={props=>(
//     // //        <Element {...props}/>
//     // //    )}
//     // //    />
      

//     // )
// }

// useEffect(()=>{
   
     
//     if(!signed && isPrivate){
//         return <Navigate to="/" />
//     }
 
//     if(signed && !isPrivate){
//         setTimeout(()=>{
//             console.log('teste')
//             return <Navigate to="/dashboard" />
            

//         },1000)
     

//     }
 

// },[])

// return(
//     <Outlet/>
// )
// }