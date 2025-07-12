import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Articles from './components/Home/articles/Articles';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import SearchResults from './Pages/SearchResults';
import PrivateRoute from './components/PrivateRoute';
import ProductsByCategory from './Pages/ProductsByCategory';
import Checkout from './Pages/Checkout';
import CompletedOrder from './Pages/CompletedOrder';
import Wishlist from './components/Home/Wishlist';
import { useAuth } from './store/store';
import ProductDetails from './Pages/ProductDetails';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';


function App() {
  const getSessionUser = useAuth(state=>state.getSessionUser);

  useEffect(()=>{
    getSessionUser()
  }, [getSessionUser]);
  
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
    },
    {
      path: "/about",
      // element: <About />,
      // action: someFormHandler,
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
      element: isLoggedIn ? <Home/> : <Auth/>
    },
    {
      path:"/products/:category",
      element: <ProductsByCategory/>
    },{
      path: "/product/:productId",
      element: <ProductDetails/>
    },
    {
      path:"/checkout",
      element: <Checkout/>
    },
    {
      path:"/checkout/completed",
      element: <CompletedOrder/>
    }
    // {
    //   path:"/articles/:id",
    //   element: <ArticleDetails/>
    // }
  ]);
  

  return (
    <>
        {/* <h1 className="text-3xl font-bold underline text-brown-100">
      Hello world!
    </h1>
    <p className='bg-slate-500 text-white font-bold'>mahla</p>
    <div className="container bg-brown-300">testtttttt</div> */}
    <ToastContainer position='top-center' />
    <RouterProvider router={router} />
    </>
  )
}

export default App
