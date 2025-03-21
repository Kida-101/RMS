import React, { useState } from "react";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import "./pageStyls/reservation.css";

const ReservationForm = () => {
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

  const menus = ["Vegetarian", "Seafood", "Steak", "Vegan", "Pasta"];
  const tables = ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reservation Confirmed!\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="reservation-container">
      <h1 className="">Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="full-name">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="full-name"
          />
        </div>
        <div>
          <PhoneInput
            country={"et"}
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            inputStyle={{ width: "100%" }}
            required
            className="phone"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleChange}
            optional
            className="email"
          />
        </div>
        <div className="date">
          <span>
            <label>Date:&nbsp;</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              dateFormat="yyyy/MM/dd"
            />
          </span>
        </div>
        <div className="time">
          <span className="span-time">
            <span>
              <label>Time(from):</label>&nbsp;
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="time-inputs"
              />
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              <label>Time(to...):</label>&nbsp;
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="time-inputs"
              />
            </span>
          </span>
        </div>
        <select
          name="menu"
          value={formData.menu}
          onChange={handleChange}
          required
        >
          <option value="">Select Menu</option>
          {menus.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          name="table"
          value={formData.table}
          onChange={handleChange}
          required
        >
          <option value="">Select Table</option>
          {tables.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default ReservationForm;

// npm install react-datepicker
