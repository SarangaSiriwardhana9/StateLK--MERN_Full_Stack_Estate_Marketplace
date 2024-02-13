import {useSelector} from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const {currentUser}=useSelector((state)=>state.user)
    return currentUser ? <outlet/>:<Navigate to='/sign-in'/>

}