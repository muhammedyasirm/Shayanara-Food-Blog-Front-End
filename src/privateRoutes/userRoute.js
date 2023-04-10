import react, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserPrivateRoutes ({children}) {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            return navigate('/')
        } else {
            return navigate('/')
        }
    },[])
    return children;
}