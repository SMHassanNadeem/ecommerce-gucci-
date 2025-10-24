import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './LayoutComponents/home.jsx'
import Layout from './layout'
import WomenBagsSection from './CategoriesAndShoppingComponents/women-bags-section.jsx'
import WBSDetail from './CategoriesAndShoppingComponents/wbs-detail.jsx'
import MenSection from './CategoriesAndShoppingComponents/men-bags-section.jsx'
import MBSDetail from './CategoriesAndShoppingComponents/mbs-detail.jsx'
import ShoppingBag from './CategoriesAndShoppingComponents/shoppingBag.jsx'
import Checkout from './CategoriesAndShoppingComponents/checkout.jsx'
import Order from './AdminComponents/orders.jsx'
import Products from './AdminComponents/Products.jsx'
import PrivateRoute from './AdminComponents/privateRoute.jsx'
import Dashboard from './AdminComponents/dashboard.jsx'
import Signup from './AdminComponents/signUp.jsx'
import Signin from './AdminComponents/signIn.jsx'
import OrderDetail from './AdminComponents/orderDetail.jsx'

function App() {

  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path='/dashboard' element={(
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>)} />
      {/* <Route path='/signup' element={<Signup/>} /> */}
      <Route path='/signin' element={<Signin />} />
      <Route path='/admin/product' element={<Products />} />
      <Route path='/admin/orders' element={<Order/>} />
      <Route path='/admin/orders/:id' element={<OrderDetail/>} />

      <Route path='/' element={<Layout />}>
        <Route path='/shopping-bags' element={<ShoppingBag />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/women-bags' element={<WomenBagsSection />} />
        <Route path='/women-bags/:id' element={<WBSDetail />} />
        <Route path='/men-bags' element={<MenSection />} />
        <Route path='/men-bags/:id' element={<MBSDetail />} />
      </Route>
    </Routes>
  )
}

export default App