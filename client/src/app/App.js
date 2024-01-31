//Imports style sheet
import './App.css';

//Imports routing tools from react-router-dom
import { Routes, Route } from 'react-router-dom'

//Imports pages and custom routes
import Title from '../pages/Title/Title';
import Auth from '../pages/Auth/Auth';
import Feed from '../pages/Feed/Feed';
import Show from '../pages/Show/Show';
import New from '../pages/New/New';
import Review from '../pages/Review/Review';
import Edit from '../pages/Edit/Edit';
import UserProfile from '../pages/UserProfile/UserProfile';
import OtherUser from '../pages/OtherProfile/OtherProfile';
import SearchResults from '../pages/SearchResults/SearchResults';
import Error from '../pages/Error/Error';
import Main from '../components/Main/Main';
import PrivateRoute from '../components/CustomRoutes/PrivateRoute';
import ProfileRoute from '../components/CustomRoutes/ProfileRoute';
import AuthRoute from '../components/CustomRoutes/AuthRoute';

//Exports App component which routes through the applications pages
export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path='/auth' element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        } />
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
              <UserProfile />
            </Main>
          </PrivateRoute>
        } />
        <Route path='/user/:id' element={
          <ProfileRoute>
            <Main>
              <OtherUser />
            </Main>
          </ProfileRoute>
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
