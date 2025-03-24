import React, { useState } from "react";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import "./pageStyls/reservation.css";
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
    <div className="reservation-container">
      <div
        style={{
          marginBottom: "15px",
        }}
      >
        <h1
          className=""
          style={{
            color: "#45a049",
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "bolder",
          }}
        >
          Order form&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/" className="nav-link">
            <i
              className="fa-solid fa-house"
              style={{
                color: "black",
                alignItems: "center",
                paddingRight: "10px",
                fontSize: "24px",
              }}
            />
          </Link>
        </h1>
      </div>
      <div className="separator"></div>
      <form onSubmit={handleSubmit}>
        <div className="full-name">
          <span>
            <label className="label">Full Name:&nbsp;</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="input"
            />
          </span>
        </div>
        <div>
          <span>
            <label className="label">Phone Number:&nbsp;</label>
            <div className="custom-phone-input">
              <PhoneInput
                country={"et"}
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputStyle={{ width: "100%" }}
                required
                className="phone"
                id="phone"
              />
            </div>
          </span>
        </div>
        <div>
          <span>
            <label className="label">Email:&nbsp;</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email (optional)"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </span>
        </div>
        <div className="date">
          <div>
            <label className="label">Date:&nbsp;</label>
          </div>
          <DatePicker
            className="date-picker input"
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="time">
          <span className="span-time">
            <span>
              <label className="label">Time(start):</label>&nbsp;
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="input"
              />
            </span>
            <span>
              <label className="label">Time(finish):</label>&nbsp;
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="input"
              />
            </span>
          </span>
        </div>
        {/* /////////////////////////////////////////////////////////////////////////// */}
        <div className="menu-nav">
          <Link to="/menu" className="nav-link">
            <span>
              <button
                style={{ width: "100%", marginBottom: "15px" }}
                className="label button"
              >
                {/* <i class="fa-solid fa-bars"></i> */}
                <i class="fa-solid fa-utensils"></i>
                &nbsp;&nbsp;&nbsp;Go to Menu
              </button>
            </span>
          </Link>
        </div>
        {/* /////////////////////////////////////////////////////////////////////////// */}
        <div className="menu-nav">
          <Link to="/table" className="nav-link">
            <span>
              <button
                style={{ width: "100%", marginBottom: "15px" }}
                className="label button"
                required
              >
                <i class="fa-solid fa-chair" />
                &nbsp;&nbsp;Reserve table
              </button>
            </span>
          </Link>
        </div>
        {/* /////////////////////////////////////////////////////////////////////////// */}
        <div className="display-detail">
          <div className="display-container">
            <p>
              <span style={{ fontWeight: "bold" }}>Order's:</span>{" "}
              {orderData.items.length > 0
                ? orderData.items.join(" ")
                : "No items"}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Total price:</span>
              {orderData.totalPrice} ETB
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Order Date:</span>{" "}
              {orderData.orderDate
                ? new Date(orderData.orderDate).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* <div className="menu">
          <select
            name="menu"
            value={formData.menu}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Select Menu</option>
            {menus.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div> */}

        {/* <div className="table">
          <select
            name="table"
            value={formData.table}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Select Table</option>
            {tables.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div> */}
        <button type="submit" className="label reserve_pay">
          Reserve and Pay
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;

// npm install react-datepicker
