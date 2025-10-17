import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './home.jsx'
import Layout from './layout'
import WomenBagsSection from './women-bags-section.jsx'
import Admin from './admin.jsx'
import WBSDetail from './wbs-detail.jsx'
import MenSection from './men-bags-section.jsx'

function App() {

  return (
      <Routes>
        <Route index element={<Home/>} />
        <Route path='/' element={<Layout/>}>
          <Route path='/admin' element={<Admin/>} />
          <Route path='/women-bags' element={<WomenBagsSection/>} />
           <Route path='/women-bags/:id' element={<WBSDetail/>}/>
          <Route path='/men-bags' element={<MenSection/>} />
            <Route path='/men-bags/:id' element={<WBSDetail/>}/>
        </Route>  
      </Routes>
  )
}

export default App
