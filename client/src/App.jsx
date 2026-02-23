import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { RequestForm } from './components/RequestForm/RequestForm'
import './App.css'

function App() {


  return (
    <Routes>
     <Route path="/caseworker/requestform" element={<RequestForm />} />
      <Route path="/" element={<Home />} />

     <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  )
}

export default App
