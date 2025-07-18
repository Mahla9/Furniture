import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BannerStatic from '../components/Banner/BannerStatic'
import { useCheckoutStore } from '../store/store';
import { Table } from 'antd';

function CompletedOrder() {
  const {orders,paymentMethod, shippingAddress} = useCheckoutStore();
  const newOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  localStorage.removeItem('total-temp');
  localStorage.removeItem('discount');


  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'col1',
      key: 'col1'
    },
    {
      title: 'Date',
      dataIndex: 'col2',
      key: 'col2'
    },
    {
      title: 'Email',
      dataIndex: 'col3',
      key: 'col3'
    },
    {
      title: 'Total',
      dataIndex: 'col4',
      key: 'col4'
    },
    {
      title: 'Payment Method',
      dataIndex: 'col5',
      key: 'col5'
    }
  ];

  const data = [
    // row 1
    {
      key: '1',
      col1: newOrder.orderId,
      col2: newOrder.date,
      col3: shippingAddress.email,
      col4:newOrder.total,
      col5: paymentMethod
    }
  ];

  return (
    <div>
      <Header/>
      <BannerStatic/>
      <div className='container my-9 flex flex-col gap-9 justify-center'>
        <div className='text-emerald-700 text-center text-xl md:text-2xl lg:text-4xl py-6 px-9 rounded-lg border-2 border-dashed border-emerald-800'>
          Thank you. Your order has been recieved.
        </div>

        {newOrder && (
          <Table
          columns={columns}
          dataSource={data}
          pagination= {false}
          scroll={{x: 'max-content'}}
          bordered
          className='no-scrollbar'
        />
        )}


        {/* shipping address */}
        <div className='flex flex-col gap-3'>
          <h3 className='font-semibold text-3xl text-gray-700 my-6'>Shipping Address</h3>
          <span className='text-gray-500'>{shippingAddress.firstName} {shippingAddress.lastName}</span>
          <span className='text-gray-500'>{shippingAddress.streetAddress}</span>
          <span className='text-gray-500'>{shippingAddress.country}</span>
          <span className='text-gray-500'>{shippingAddress.city}</span>
          <span className='text-gray-500'>{shippingAddress.phone}</span>
          <span className='text-gray-500'>{shippingAddress.email}</span>
          <span className='text-gray-500'>{shippingAddress.zipCode}</span>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default CompletedOrder;