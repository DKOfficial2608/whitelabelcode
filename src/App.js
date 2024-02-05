import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Mainlayout from './mainlayout'
import Signup from './pages/signup/Signup'
import Order from './pages/order/order'
import Shopdetail from './pages/Shopdetail/Shopdetail'
import Specialoffer from './pages/special_offer/Specialoffer'
import Profile from './pages/profile/profile'
import ForgotPassword from './pages/forgotpassword/ForgotPassword'
import PrivateRoutes from './utils/PrivateRoutes'
import Menus from './pages/menus/menu'
import Checkoutlist from './pages/checkoutlist/checkoutlist'
import Checkout from './pages/checkout/checkout'

const App = () => {
  return (
    <BrowserRouter basename="/whitelabel">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/checkoutlist" element={<Checkoutlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route element={<PrivateRoutes />}>
        <Route path="*" element={<Mainlayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
