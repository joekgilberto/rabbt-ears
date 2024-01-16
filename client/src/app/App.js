import './App.css';
import { Routes, Route } from 'react-router-dom'
import Title from '../pages/Title/Title';
import Main from '../components/Main/Main';
import Feed from '../pages/Feed/Feed';
import Error from '../pages/Error/Error';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path='/feed' element={<Main page={<Feed />} />} />
        <Route path='/*' element={<Main page={<Error />} />} />
      </Routes>
    </div>
  );
};
