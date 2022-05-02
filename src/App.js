import firebase from "./services/firebaseConnection";
import Rotas from "./routes";
import {BrowserRouter as Router} from 'react-router-dom';
import AuthProvider from "./contexts/auth";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div>
          <AuthProvider>
              <Router>
                <Rotas/>
              </Router>
              <ToastContainer autoClose={2000} />
          </AuthProvider>
    </div>
  );
}

export default App;
