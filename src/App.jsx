import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './home.jsx'
import Layout from './layout'
import WomenBagsSection from './women-bags-section.jsx'
import WBSDetail from './wbs-detail.jsx'
import MenSection from './men-bags-section.jsx'
import MBSDetail from './mbs-detail.jsx'
import ShoppingBag from './shoppingBag.jsx'
import Checkout from './checkout.jsx'
import Order from './orders.jsx'
import Products from './Products.jsx'

function App() {

  return (
      <Routes>
        <Route index element={<Home/>} />
        <Route path='/' element={<Layout/>}>
          <Route path='/admin/product' element={<Products/>} />
          <Route path='/admin/orders' element={<Order/>} />
          <Route path='/shopping-bags' element={<ShoppingBag/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/women-bags' element={<WomenBagsSection/>} />
           <Route path='/women-bags/:id' element={<WBSDetail/>}/>
          <Route path='/men-bags' element={<MenSection/>} />
            <Route path='/men-bags/:id' element={<MBSDetail/>}/>
        </Route>  
      </Routes>
  )
}

export default App