import './App.css'
import GraphDetail from './pages/GraphDetail'
import GraphForm from './components/GraphForm'
import GraphListing from './pages/GraphListing'
import LoginForm from './components/LoginForm'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
  <div className='min-w-72'>
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/add-graph' element={<GraphForm />} />
      <Route path="/list" element={<GraphListing />} />
      <Route path="/view-graph/:id" element={<GraphDetail />} />

    </Routes>

    <ToastContainer />
    </div>
  )
}

export default App
