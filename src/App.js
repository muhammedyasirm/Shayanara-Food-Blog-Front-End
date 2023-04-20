import './App.css';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AdminUser from './pages/AdminUser/AdminUser';
import AdminPrivateRoutes from './privateRoutes/AdminRoute';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import UserProfile from './pages/UserProfile/UserProfile';
import UserAuthorization from './components/Authorization/UserAuthorization';
import Post from './pages/Posts/Post';
import LocationManagement from './pages/LocationManagement/LocationManagement';
import SinglePost from './pages/SinglePost/SinglePost';
import Chat from './pages/Chat/Chat';
import ReportPage from './pages/ReportPage/ReportPage';
import ReportPostSingle from './components/AdminReport/ReportPostSingle';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element = { <Home/> }/>
        <Route path='/user/post' element = { <Post/> }/>
        <Route path='/user/ForgotPassword' element= {<ForgotPassword/> } />
        <Route element={<UserAuthorization/>}>
          <Route path='/user/profile'  element= { <UserProfile/> } />
          <Route path='/user/singlePost/:id' element= {<SinglePost/>}/>
          <Route path='/user/chat' element= {<Chat/>}/>
        </Route>
        

        <Route path='/admin' element={<AdminPrivateRoutes><AdminLogin/></AdminPrivateRoutes>}/>
        <Route path = '/admin/dashboard' element={<AdminPrivateRoutes><AdminDashboard/></AdminPrivateRoutes>}/>
        <Route path='/admin/users' element={<AdminPrivateRoutes><AdminUser/></AdminPrivateRoutes>}/>
        <Route path='/admin/location' element={<AdminPrivateRoutes><LocationManagement/></AdminPrivateRoutes>}/>
        <Route path='/admin/report' element={<AdminPrivateRoutes><ReportPage/></AdminPrivateRoutes>}/>
        <Route path='/admin/reportSingle/:id/:rid' element={<AdminPrivateRoutes><ReportPostSingle/></AdminPrivateRoutes>}/>
      </Routes>
    </Router>
      <ToastContainer />
    </>
  );
}

export default App;
