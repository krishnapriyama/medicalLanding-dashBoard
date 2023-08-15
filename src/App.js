import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";

import Home from './pages/Home'
import AddDoctors from './pages/addDoctors'
import Login from './pages/Login'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/addDoctors' element={<AddDoctors />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
