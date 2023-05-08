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
import Fallback from './components/ErrorBoundaries/Fallback';
import { ErrorBoundary } from 'react-error-boundary';
import AdminAddRecipe from './pages/AdminRecipeControll/AdminAddRecipe';
import Recipes from './pages/AdminRecipeControll/Recipes';
import Recipe from './pages/RecipePage/Recipe';
import RecipeSingle from './pages/RecipePage/RecipeSingle';
import BannerManage from './pages/AdminBanner/BannerManage';
import BannerAdd from './pages/AdminBanner/BannerAdd';
import Error from './components/Error/Error';
function App() {
  return (
    <ErrorBoundary FallbackComponent={ Fallback } onReset={ () => {}}>
    <Router>
      <Routes>
        <Route path='/' element = { <Home/> }/>
        <Route path='/user/post' element = { <Post/> }/>
        <Route path='/user/ForgotPassword' element= {<ForgotPassword/> } />
        <Route element={<UserAuthorization/>}>
          <Route path='/user/profile'  element= { <UserProfile/> } />
          <Route path='/user/singlePost/:id' element= {<SinglePost/>}/>
          <Route path='/user/chat' element= {<Chat/>}/>
          <Route path='/user/recipe' element= {<Recipe/>}/>
          <Route path='/user/recipeSingle/:id' element= {<RecipeSingle/>}/>
          <Route path='*' element= {<Error/>}/>
        </Route>
        
        <Route path='/admin' element={<AdminPrivateRoutes><AdminLogin/></AdminPrivateRoutes>}/>
        <Route path = '/admin/dashboard' element={<AdminPrivateRoutes><AdminDashboard/></AdminPrivateRoutes>}/>
        <Route path='/admin/users' element={<AdminPrivateRoutes><AdminUser/></AdminPrivateRoutes>}/>
        <Route path='/admin/location' element={<AdminPrivateRoutes><LocationManagement/></AdminPrivateRoutes>}/>
        <Route path='/admin/report' element={<AdminPrivateRoutes><ReportPage/></AdminPrivateRoutes>}/>
        <Route path='/admin/addRecipe' element={<AdminPrivateRoutes><AdminAddRecipe/></AdminPrivateRoutes>}/>
        <Route path='/admin/recipe' element={<AdminPrivateRoutes><Recipes/></AdminPrivateRoutes>}/>
        <Route path='/admin/reportSingle/:id/:rid' element={<AdminPrivateRoutes><ReportPostSingle/></AdminPrivateRoutes>}/>
        <Route path='/admin/bannerTable' element={<AdminPrivateRoutes><BannerManage/></AdminPrivateRoutes>}/>
        <Route path='/admin/addBanner' element={<AdminPrivateRoutes><BannerAdd/></AdminPrivateRoutes>}/>
      </Routes>
    </Router>
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;
