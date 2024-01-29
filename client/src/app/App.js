import './App.css';
import { Routes, Route } from 'react-router-dom'

import Title from '../pages/Title/Title';
import Main from '../components/Main/Main';
import Auth from '../pages/Auth/Auth';
import Feed from '../pages/Feed/Feed';
import Show from '../pages/Show/Show';
import New from '../pages/New/New';
import Review from '../pages/Review/Review';
import Edit from '../pages/Edit/Edit';
import Profile from '../pages/Profile/Profile';
import SearchResults from '../pages/SearchResults/SearchResults';
import Error from '../pages/Error/Error';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/feed' element={
          <Main>
            <Feed />
          </Main>
        } />
        <Route path='/reviews/:id' element={
          <Main>
            <Review />
          </Main>
        } />
        <Route path='/reviews/edit/:id' element={
          <PrivateRoute>
            <Main>
              <Edit />
            </Main>
          </PrivateRoute>
        } />
        <Route path='/new/:id' element={
          <PrivateRoute>
            <Main>
              <New />
            </Main>
          </PrivateRoute>
        } />
        <Route path='/shows/:id' element={
          <Main>
            <Show />
          </Main>
        } />
        <Route path='/profile' element={
          <PrivateRoute>
            <Main>
              <Profile />
            </Main>
          </PrivateRoute>
        } />
        <Route path='/results/:id' element={
          <Main>
            <SearchResults />
          </Main>
        } />
        <Route path='/*' element={
          <Main>
            <Error />
          </Main>
        } />
      </Routes>
    </div>
  );
};
