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
import Wishlist from './components/Home/Wishlist';
import { useAuth, useCartStore } from './store/store';
import ProductDetails from './Pages/ProductDetails';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';


function App() {
  const items = useCartStore(state=>state.items);
  const lengthItemsCart = useMemo(()=>items.length, [items]);

  const isLoggedIn = useAuth(state=>state.isLoggedIn);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      // errorElement: <ErrorPage />
    },
    {
      path: "/dashboard",
      element:(
        <PrivateRoute>
          <DashboardContainer/>
        </PrivateRoute>
      )
    },{
      path: '/dashboard/:content',
      element: (
        <PrivateRoute>
          <DashboardContainer/>
        </PrivateRoute>
      )
    },
    {
      path: "/search",
      element: <SearchResults/>
    },{
      path: '/wishlist',
      element:<Wishlist/> 
    },
    {
      path:"/articles",
      element: <Articles/>
    },
    {
      path: '/auth/:section',
      element: isLoggedIn ? <Navigate to={'/'} /> : <Auth/>
    },
    {
      path:"/products/:category",
      element: <ProductsByCategory/>
    },
    {
      path: "/product/:productId",
      element: <ProductDetails/>
    },
    {
      path:"/checkout",
      element: lengthItemsCart>0 ? <Checkout/> : <Navigate to={'/'} />
    },
    {
      path:"/checkout/completed",
      element: lengthItemsCart>0 ? <CompletedOrder/> : <Navigate to={'/'} />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword/>
    },
    {
      path: "/reset-password",
      element: <ResetPassword/>
    },
    // {
    //   path:"/articles/:id",
    //   element: <ArticleDetails/>
    // }
  ]);
  

  return (
    <>
    <ToastContainer position='top-center' />
    <RouterProvider router={router} />
    </>
  )
}

export default App
