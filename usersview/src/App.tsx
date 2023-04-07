import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import { Component } from 'react';
import NoPage from './pages/nopage';
import AuthenticationContextComponent from './component/context/authenticationContextComponent';
import Home from './pages/home';
import Register from './pages/register';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <AuthenticationContextComponent child={<Login />} />
          } />
          <Route path='/home' element={
            <AuthenticationContextComponent child={<Home />} />
          } />
          <Route path='/register' element={
            <AuthenticationContextComponent child={<Register />} />
          } />
          <Route path='*' element={
            <AuthenticationContextComponent child={<NoPage />} />
          } />
        </Routes>
      </BrowserRouter>
    )
  }
}