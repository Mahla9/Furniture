import React from 'react';
import {useCheckoutStore} from '../../../store/store';
import { Table } from 'antd';

function Orders() {
  const orders = useCheckoutStore(state=>state.orders);
  const AllOrders = orders?.length>0 ? orders : [] ;

  const columns = [
    {
      title: 'ORDER',
      dataIndex: 'col1',
      key: 'col1'
    },
    {
      title: 'DATE',
      dataIndex: 'col2',
      key: 'col2'
    },
    {
      title: 'STATUS',
      dataIndex: 'col3',
      key: 'col3'
    },
    {
      title: 'TOTAL',
      dataIndex: 'col4',
      key: 'col4'
    },
    {
      title: 'ACTIONS',
      dataIndex: 'col5',
      key: 'col5'
    }
  ];

  const data = AllOrders?.map((order, index) => ({
    key: index.toString(),
    col1: `#${order.id || index + 1}`,            // شماره سفارش یا fallback به index
    col2: order.date || 'N/A',
    col3: order.status || 'Pending',
    col4: `$${order.total || 0}`,
    col5: <button className="text-orange-500">View</button>  // دکمه یا لینک اکشن دلخواه
  }));



  return (
    <div>
      {/* recieve submited orders after success checkout */}
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination= {false}
        scroll={{x: 'max-content'}}
      />
    </div>
  )
}

export default Orders;