import './App.css';
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import UserLogin from './Pages/UserLogin';
import UserHome from './Pages/UserHome'; 
import AdminLogin from './Pages/Admin';
import AdminHome from './Pages/AdminHome';
import UserProfile from './Pages/UserProfile';
import Signup from './Pages/Signup';
import EditUsers from './Pages/EditUsers';
function App() {

  

  return (
    <div className="App">
<Router>
<Routes>
  <Route path='/'  element={<UserLogin/>}/> 
 
  <Route path='/home' element = {<UserHome/>}/>

   <Route path = '/admin' element={<AdminLogin/>} />

   <Route path = '/adminHome' element = {<AdminHome/>} />

   <Route path='/userProfile' element={<UserProfile/>} />
   <Route path='/signup' element = {<Signup/>} />
   <Route path = '/editUser/:id' element ={<EditUsers/>} />
</Routes>


</Router>



    
    </div>
  );
}

export default App;
