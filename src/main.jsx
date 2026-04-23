import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartPage from './pages/CartPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import DynamicProduct from './pages/DynamicProduct.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/about' element={<AboutPage />}></Route>
          <Route path='/product/:name' element={<DynamicProduct/>}></Route>
        </Routes>
      </BrowserRouter>


      
    </Provider>

  </StrictMode>,
)