import './App.css'
import {BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Navbar from './components/Layout/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import SignIn from './components/SignIn'
import Mainlayout from './components/Layout/Mainlayout'
import Home from './pages/Home'
import Error from './pages/Error'
import Help from './pages/Help'


function App() {
 const router=createBrowserRouter(
  createRoutesFromElements(
    
    <>
      <Route  path='/' element={<Mainlayout/>}>
      <Route index element={<Home/>} />
       <Route path='/productlist' element={<ProductList/>} />
       <Route path='/login' element={<SignIn/>} />
       <Route path='/help' element={<Help/>} />
       <Route path='/products/:id' element={<ProductDetail/>}/>
       <Route path='*' element={<Error/>} />
       </Route>
   
   
    
    </>
    
  )
 )
  return (
    <>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
