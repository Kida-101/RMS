import React, { useState } from "react";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
// import "./pageStyls/reservation.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ReservationForm = ({ activecomponent }) => {
  // const location = useLocation();
  // const orderData = location.state?.orderData || {
  //   totalPrice: 0,
  //   items: [],
  //   orderDate: "",
  // };

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
          <button onClick={() => activecomponent("/")} className="nav-link">
            <i className="fa-solid fa-house text-black pr-2 text-[24px]" />
          </button>
        </h1>
      </div>
      <div className="separator"></div>
      <form className="form-reservation flex flex-col" onSubmit={handleSubmit}>
        <div className="full-name mb-4">
          <div className="relative">
            <input
              type="text"
              id="fullName"
              className="block rounded-t-lg px-3 pb-3 pt-5 mt-[10px] w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="fullName"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Full Name
            </label>
          </div>
          {/* <span>
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
          </span> */}
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
          <button
            onClick={() => activecomponent("menu")}
            className="nav-link label button w-full mb-1 p-[10px] bg-transparent text-[#45a049] rounded-[5px] border-2 border-[#45a049] hover:bg-[#45a049] hover:text-white transition-transform"
          >
            <i className="fa-solid fa-utensils"></i>&nbsp;&nbsp;&nbsp;Go to Menu
          </button>
        </div>
        <div className="menu-nav mb-4">
          <button
            onClick={() => activecomponent("table")}
            className="label button w-full mb-1 p-[10px] bg-transparent text-[#45a049] rounded-[5px] border-2 border-[#45a049] hover:bg-[#45a049] hover:text-white transition-transform"
          >
            <i className="fa-solid fa-chair" />
            &nbsp;&nbsp;Reserve table
          </button>
        </div>
        <div className="display-detail">
          <div className="display-container bg-white p-[10px] rounded-[5px] mb-[10px]">
            <p>
              <span className="font-bold">Order's:</span>{" "}
              {/* {orderData.items.length > 0
                ? orderData.items.join(" ")
                : "No items"} */}
            </p>
            <p>
              <span className="font-bold">Total price:</span>
              {/* {orderData.totalPrice} ETB */}
            </p>
            <p>
              <span className="font-bold">Order Date:</span>{" "}
              {/* {orderData.orderDate
                ? new Date(orderData.orderDate).toLocaleString()
                : "N/A"} */}
            </p>
          </div>
        </div>
        <div>
          <p className="mb-3 justify-center">
            Please arrive within 30 minutes of booking to avoid cancellation.
          </p>
        </div>
        {/* <Link to="/paymentSuccessPopup" className="nav-link"> */}
        <button
          type="submit"
          onClick={() => activecomponent("pay")}
          className="label reserve_pay button w-full mb-4 p-[10px] bg-[#28a745] rounded-[5px] text-white hover:bg-[#218838]"
        >
          Pay and Reserve
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default ReservationForm;

// npm install react-datepicker
