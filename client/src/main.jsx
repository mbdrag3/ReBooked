import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import AddBookForm from './pages/AddTextbook.jsx';
import BookDetails from './pages/BookDetails.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/success',
        element: <Success />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/add-book',
        element: <AddBookForm />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      }, {
        path: '/about',
        element: <About />
      }, {
        path: '/books/:id',
        element: <BookDetails />
      },
      {
        path: '/addbook',
        element: <AddBookForm />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
