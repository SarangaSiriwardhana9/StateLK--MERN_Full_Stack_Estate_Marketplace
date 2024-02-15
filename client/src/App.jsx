// Remove the unused import statement for React
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import SignOut from './pages/SignOut';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
import CreateListing from './pages/CreateListing';

export default function App() {
  return (
    <BrowserRouter >
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<SignOut/>}/>
      <Route path="/about" element={<About/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/create-listing" element={<CreateListing/>}/>
   
      </Route>

    </Routes>
    </BrowserRouter>

  )
}
