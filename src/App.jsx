import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Articles from './Pages/Articles';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import DashboardContainer from './Pages/DashboardContainer';
import SearchResults from './Pages/SearchResults';
import PrivateRoute from './components/PrivateRoute';
import ProductsByCategory from './Pages/ProductsByCategory';
import Checkout from './Pages/Checkout';
import CompletedOrder from './Pages/CompletedOrder';
import Wishlist from './Pages/Wishlist';
import { useAuth, useCartStore } from './store/store';
import ProductDetails from './Pages/ProductDetails';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Shop from './Pages/Shop';
import Layout from './Layout';


function App() {
  const items = useCartStore(state=>state.items);
  const lengthItemsCart = useMemo(()=>items.length, [items]);

  const isLoggedIn = useAuth(state=>state.isLoggedIn);

    const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, // همه صفحات داخل Layout رندر می‌شوند
      children: [
        { index: true, element: <Home /> }, // صفحه اصلی
        { path: 'articles', element: <Articles /> },
        { path: 'search', element: <SearchResults /> },
        { path: 'wishlist', element: <Wishlist /> },
        { path: 'products/:category', element: <ProductsByCategory /> },
        { path: 'product/:productId', element: <ProductDetails /> },
        { path: 'shop', element: <Shop /> },
        { 
          path: 'dashboard', 
          element: (
            <PrivateRoute>
              <DashboardContainer />
            </PrivateRoute>
          )
        },
        { 
          path: 'dashboard/:content', 
          element: (
            <PrivateRoute>
              <DashboardContainer />
            </PrivateRoute>
          )
        },
        {
          path: 'auth/:section',
          element: isLoggedIn ? <Navigate to="/" /> : <Auth />
        },
        { 
          path: 'checkout', 
          element: lengthItemsCart > 0 ? <Checkout /> : <Navigate to="/" /> 
        },
        { 
          path: 'checkout/completed', 
          element: lengthItemsCart > 0 ? <CompletedOrder /> : <Navigate to="/" /> 
        },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ]
    },
    // اگر مسیر اشتباه بود، هدایت شود
    { path: '*', element: <Navigate to="/" /> }
  ]);

  

  return (
    <>
    <ToastContainer position='top-center' />
    <RouterProvider router={router} />
    </>
  )
}

export default App
