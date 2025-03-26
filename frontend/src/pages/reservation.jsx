import React, { useState } from "react";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
// import "./pageStyls/reservation.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ReservationForm = () => {
  const location = useLocation();
  const orderData = location.state?.orderData || {
    totalPrice: 0,
    items: [],
    orderDate: "",
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    menu: "",
    table: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reservation Confirmed!\n" + JSON.stringify(formData, null, 2));
  };
  // if (!orderData) {
  //   <p>No order data available.</p>;
  // }
  return (
    <div className="reservation-container max-w-[400px] w-full m-[25px_30px] p-[25px] bg-[#dfdfdf] bg-cover rounded-[10px] shadow-[0px_4px_8px_rgba(0,0,0,0.7)]">
      <div className="mb-4">
        <h1 className="text-[#45a049] text-center text-[40px] font-extrabold">
          Order form&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/" className="nav-link">
            <i className="fa-solid fa-house text-black pr-2 text-[24px]" />
          </Link>
        </h1>
      </div>
      <div className="separator"></div>
      <form className="form-reservation flex flex-col" onSubmit={handleSubmit}>
        <div className="full-name mb-4">
          <span>
            <label className="label font-semibold">Full Name:&nbsp;</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="input w-full p-[10px_20px] border-none rounded-[8px] bg-white focus:ring-[rgba(35,215,137,0.2)]"
            />
          </span>
        </div>
        <div className="mb-4">
          <span>
            <label className="label font-semibold">Phone Number:&nbsp;</label>
            <div className="react-tel-input">
              <PhoneInput
                country={"et"}
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputStyle={{ width: "100%" }}
                required
                className="phone !w-full mt-[3px] rounded-[8px] p-[6px] text-[20px] bg-white border-none shadow-none"
                id="phone"
              />
            </div>
          </span>
        </div>
        <div className="mb-4">
          <span>
            <label className="label font-semibold">Email:&nbsp;</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email (optional)"
              value={formData.email}
              onChange={handleChange}
              className="input w-full mt-[3px] p-[10px_20px] border-none rounded-[8px] bg-white"
            />
          </span>
        </div>
        <div className="date mb-4">
          <div>
            <label className="label font-semibold">Date:&nbsp;</label>
          </div>
          <DatePicker
            className="date-picker !w-full p-[10px] border-2 border-[#45a049] rounded-[8px] bg-white cursor-pointer border-none box-border"
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="time mb-4">
          <label className="label font-semibold mt-[3px]">Time(start):</label>
          &nbsp;
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="input !w-full p-[10px_20px] border-none rounded-[8px] bg-white mb-4"
          />
          <label className="label font-semibold">Time(finish):</label>&nbsp;
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="input !w-full p-[10px_20px] border-none rounded-[8px] bg-white mb-1"
          />
        </div>
        <div className="menu-nav mb-4">
          <Link to="/menu" className="nav-link">
            <button className="label button w-full mb-1 p-[10px] bg-transparent text-[#45a049] rounded-[5px] border-2 border-[#45a049] hover:bg-[#45a049] hover:text-white transition-transform">
              <i className="fa-solid fa-utensils"></i>&nbsp;&nbsp;&nbsp;Go to
              Menu
            </button>
          </Link>
        </div>
        <div className="menu-nav mb-4">
          <Link to="/table" className="nav-link">
            <button className="label button w-full mb-1 p-[10px] bg-transparent text-[#45a049] rounded-[5px] border-2 border-[#45a049] hover:bg-[#45a049] hover:text-white transition-transform">
              <i className="fa-solid fa-chair" />
              &nbsp;&nbsp;Reserve table
            </button>
          </Link>
        </div>
        <div className="display-detail">
          <div className="display-container bg-white p-[10px] rounded-[5px] mb-[10px]">
            <p>
              <span className="font-bold">Order's:</span>{" "}
              {orderData.items.length > 0
                ? orderData.items.join(" ")
                : "No items"}
            </p>
            <p>
              <span className="font-bold">Total price:</span>
              {orderData.totalPrice} ETB
            </p>
            <p>
              <span className="font-bold">Order Date:</span>{" "}
              {orderData.orderDate
                ? new Date(orderData.orderDate).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
        <div>
          <p className="mb-3 justify-center">
            Please arrive at the restaurant within 30 to 40 minutes after
            booking your table. Failure to arrive on time may result in your
            reservation being canceled. Thank you for your cooperation!
          </p>
        </div>
        <Link to="/paymentSuccessPopup" className="nav-link">
          <button
            type="submit"
            className="label reserve_pay button w-full mb-4 p-[10px] bg-[#28a745] rounded-[5px] text-white hover:bg-[#218838]"
          >
            Pay and Reserve
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ReservationForm;

// npm install react-datepicker
