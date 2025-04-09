import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropToCartZone = () => {
    const navigate = useNavigate();
  
    const handleDragOver = (e) => {

      // get data contain drop info
      const type = e.dataTransfer.getData("type");
  
      if (type === "cart") {
        e.preventDefault(); // فقط اگه مجازه اجازه‌ی drop بده
      }
    };
  
    const handleDrop = (e) => {
      const type = e.dataTransfer.getData("type");
  
      if (type === "cart-item") {
        navigate("/cart");
      } else if (type === "cart-icon") {
        navigate("/cart");
      } else {
        alert("اجازه‌ی انداختن این عنصر رو ندارید 😠");
      }
    };
  
    return (
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-blue-400 p-8 text-center"
      >
        کامپوننت cart اینجا فراخوانی میشه
      </div>
    );
  };

export default DropToCartZone;