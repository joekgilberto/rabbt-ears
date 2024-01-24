import './App.css';
import { Routes, Route } from 'react-router-dom'
import Title from '../pages/Title/Title';
import Main from '../components/Main/Main';
import Auth from '../pages/Auth/Auth';
import Feed from '../pages/Feed/Feed';
import Profile from '../pages/Profile/Profile';
import Error from '../pages/Error/Error';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/feed' element={<Main page={<Feed />} />} />
        <Route path='/profile' element={<Main page={<Profile />} />} />
        <Route path='/*' element={<Main page={<Error />} />} />
      </Routes>
    </div>
  );
};
