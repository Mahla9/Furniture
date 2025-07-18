import React, { useState, Suspense, lazy, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useCartStore, useCheckoutStore, useAuth } from '../store/store';
import { useShallow } from 'zustand/shallow';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// ✅ Lazy loading for heavier components
const LoginFormWrapper = lazy(() => import('../components/Auth/Login'));
const CouponForm = lazy(() => import('../components/Checkout/CouponForm'));
const BillingDetailsForm = lazy(() => import('../components/Checkout/BillingDetailsForm'));
const PaymentMethods = lazy(() => import('../components/Checkout/PaymentMethods'));
const CartItems = lazy(() => import('../components/Cart/CartItems'));
const ShippingBar = lazy(() => import('../components/Cart/ShippingBar'));

const schema = yup.object().shape({
  firstName: yup.string().required().min(3, 'Name should be 3 characters at least'),
  lastName: yup.string().required().min(3, 'Last name should be 3 characters at least'),
  phone: yup.string().required().length(10, 'Phone number must be exactly 10 digits'),
  email: yup.string().required().email('Invalid email'),
  country: yup.string().required(),
  town: yup.string().required(),
  street: yup.string().required(),
  zipCode: yup.string().required('Zip is required')
    .matches(/^\d+$/, 'Only digits')
    .length(10, 'Must be exactly 10 digits'),
});

function Checkout() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [couponForm, setCouponForm] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const { setFullShippingAddress, paymentMethod, addOrder } = useCheckoutStore(useShallow((state) => ({
    paymentMethod: state.paymentMethod,
    setFullShippingAddress: state.setFullShippingAddress,
    addOrder: state.addOrder,
  })));

  const clearCart = useCartStore((state) => state.clearCart);
  const items = useCartStore((state) => state.items);

  const id = useMemo(() => uuidv4(), []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleOrderPlacement = (formData) => {
    if (!paymentMethod) {
      setPaymentError(true);
      return;
    }

    setPaymentError(false);
    setFullShippingAddress({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      country: formData.country,
      city: formData.town,
      streetAddress: formData.street,
      zipCode: formData.zipCode,
    });

    const total = localStorage.getItem('total-temp');
    const newOrder = {
      orderId: id,
      date: new Date().toLocaleDateString(),
      status: 'on hold',
      total,
    };
    addOrder(newOrder);
    navigate('/checkout/completed');
    clearCart();
    localStorage.removeItem('discount');
  };

  return (
    <div className="mx-auto w-[90%] my-6 md:w-[70%] lg:w-[50%] flex flex-col justify-center gap-9">
      <img src="/images/Logo.webp" alt="WebNebula Logo" className="w-48 self-center" loading="lazy" />

      {!isLoggedIn && (
        <div className="self-center flex flex-col">
          <div>
            <span>Returning customer?</span>
            <span
              className="underline decoration-orange-400 text-orange-400 cursor-pointer"
              onClick={() => setShowLoginForm(!showLoginForm)}
            >
              Click here to login
            </span>
          </div>
          <Suspense fallback={<div>Loading login...</div>}>
            <LoginFormWrapper showLoginForm={showLoginForm} />
          </Suspense>
        </div>
      )}

      {/* Coupon Section */}
      <div className="self-center flex flex-col gap-9 overflow-hidden">
        <div className="flex gap-3 justify-center">
          <span>Have a coupon?</span>
          <span
            className="underline underline-offset-4 decoration-orange-400 text-orange-400 cursor-pointer"
            onClick={() => setCouponForm(!couponForm)}
          >
            Click here to enter your code
          </span>
        </div>
        <Suspense fallback={<div>Loading coupon...</div>}>
          <CouponForm couponForm={couponForm} />
        </Suspense>
      </div>

      {/* Billing Details Form */}
      <Suspense fallback={<div>Loading billing form...</div>}>
        <BillingDetailsForm register={register} errors={errors} />
      </Suspense>

      {/* Your Order */}
      <div className="flex items-center gap-3 self-start bg-slate-200 p-2 rounded-lg mt-16">
        <span className="bg-orange-400 px-4 py-2 rounded-full text-white">2</span>
        <h2>Your Order</h2>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center border-b py-3 mb-6">
          <h3 className="text-gray-700 font-semibold text-xl">PRODUCT</h3>
          <h3 className="text-gray-700 font-semibold text-xl">SUBTOTAL</h3>
        </div>

        <Suspense fallback={<div>Loading cart...</div>}>
          <CartItems items={items} />
        </Suspense>

        <Suspense fallback={<div>Loading shipping...</div>}>
          <ShippingBar />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading payment methods...</div>}>
        <PaymentMethods paymentError={paymentError} />
      </Suspense>

      {/* Submit Button */}
      <button
        className="bg-orange-400 text-white rounded-full py-3 cursor-pointer transition-all duration-150 ease-in hover:bg-orange-700 hover:bg-opacity-75"
        onClick={handleSubmit(handleOrderPlacement)}
      >
        Place order
      </button>
    </div>
  );
}

export default Checkout;