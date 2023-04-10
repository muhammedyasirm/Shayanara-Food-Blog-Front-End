import react, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPrivateRoutes ({children}) {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('admin_token')){
            return navigate('/admin/dashboard')
        } else {
            return navigate('/admin')
        }
    },[])
    return children;
}
