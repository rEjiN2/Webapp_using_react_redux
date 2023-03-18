import './App.css';
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import UserLogin from './Pages/UserLogin';
import UserHome from './Pages/UserHome'; 
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function App() {

  const user = useSelector(selectUser)

  return (
    <div className="App">
<Router>
<Routes>
  <Route path='/'  element={<UserLogin/>}/> 
 
  <Route path='/home' element = {<UserHome/>}/>


</Routes>


</Router>



    
    </div>
  );
}

export default App;
