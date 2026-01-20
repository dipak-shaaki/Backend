import './App.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Navbar from './components/Layout/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Mainlayout from './components/Layout/Mainlayout'
import Home from './pages/Home'
import Error from './pages/Error'
import Help from './pages/Help'
import VendorDashboard from './pages/VendorDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(

      <>
        <Route path='/' element={<Mainlayout />}>
          <Route index element={<Home />} />
          <Route path='/productlist' element={<ProductList />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/help' element={<Help />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='*' element={<Error />} />
        </Route>

        <Route path='/vendor' element={<ProtectedRoute requiredType="vendor"><VendorDashboard /></ProtectedRoute>} />
        <Route path='/customer' element={<ProtectedRoute requiredType="customer"><CustomerDashboard /></ProtectedRoute>} />
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
