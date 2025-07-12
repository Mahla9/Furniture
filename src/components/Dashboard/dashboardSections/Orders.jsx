import React from 'react';
import {useCheckoutStore} from '../../../store/store';

function Orders() {
  const orders = useCheckoutStore(state=>state.orders);
  const AllOrders = orders?.length>0 ? orders : [] ;


  return (
    <div>
      {/* recieve submited orders after success checkout */}
      <table cellSpacing={9} cellPadding={9} >
        <thead>
          <tr>
            <th>ORDER</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>TOTAL</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {AllOrders?.length && AllOrders.map(order=>(
            <tr key={order.orderId}>
              <td> #{order.orderId} </td>
              <td> {order.date} </td>
              <td> {order.status} </td>
              <td>{order.total}</td>
              <td> <div className='text-center text-white text-sm bg-orange-400 cursor-pointer px-4 py-2 rounded-full transition-all duration-200 ease-linear hover:bg-orange-800'>View</div> </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  )
}

export default Orders;