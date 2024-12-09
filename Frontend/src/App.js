import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './Comps/Nav';
import { BrowserRouter } from 'react-router-dom';
import Myrouter from './Myrouter';
import ReqeustForm from './pages/form';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNav />
        
        <Myrouter />

      </BrowserRouter>
    </div>
  );
}

export default App;
