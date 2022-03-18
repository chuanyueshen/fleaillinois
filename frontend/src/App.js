import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import Login from './login/Login'
import User from './user/User'
import Details from './details/Details'
import Gallery from './gallery/Gallery.jsx'
import Post from './post/Post'
import AuthContextProvider from './common/AuthContext'
import Header from './common/Header'

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route exact path='/' element={<Gallery/>} />
          </Routes>

          <Routes>
            <Route path='/login' element={<Login/>} />
          </Routes>
          
          <Routes>
            <Route path='/user' element={<User/>} />
          </Routes>

          <Routes>
            <Route path='/post' element={<Post/>} />
          </Routes>

          <Routes>
            <Route path='/details/:id' element={<Details/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App
