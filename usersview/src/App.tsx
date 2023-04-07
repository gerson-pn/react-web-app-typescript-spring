import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import { Component } from 'react';
import NoPage from './pages/nopage';
import AuthenticationContextComponent from './component/context/authenticationContextComponent';
import Home from './pages/home';

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
          <Route path='*' element={
            <AuthenticationContextComponent child={<NoPage />} />
          } />
        </Routes>
      </BrowserRouter>
    )
  }
}