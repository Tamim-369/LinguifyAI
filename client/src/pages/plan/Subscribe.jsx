import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const Payment = () => {
  const [paymentUrl, setPaymentUrl] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    total_amount: "",
    cus_name: "",
    cus_email: "",
    cus_add1: "",
    cus_add2: "",
    cus_city: "",
    cus_state: "",
    cus_postcode: "",
    cus_country: "",
    cus_phone: "",
    cus_fax: "",
    ship_name: "",
    ship_add1: "",
    ship_add2: "",
    ship_city: "",
    ship_state: "",
    ship_postcode: "",
    ship_country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/plans/init-payment", {
        ...formData,
        total_amount: 10, // Set the amount you need
      });

      if (response.data.url) {
        setPaymentUrl(response.data.url);
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
    }
  }, []);

  return (
    <div className="mt-16 w-full flex flex-col justify-center items-center min-h-[80dvh] bg-white">
      <h1 className="mb-4 text-2xl font-bold text-black">
        Subscribe to Continue Using Our Product
      </h1>
      <form
        onSubmit={handleSubscribe}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-black mb-5"
      >
        <div className="mb-4">
          <label className="block text-black font-bold mb-2" htmlFor="cus_add1">
            Address 1
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="cus_add1"
            name="cus_add1"
            value={formData.cus_add1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2" htmlFor="cus_add2">
            Address 2
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="cus_add2"
            name="cus_add2"
            value={formData.cus_add2}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2" htmlFor="cus_city">
            City
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="cus_city"
            name="cus_city"
            value={formData.cus_city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="cus_state"
          >
            State
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="cus_state"
            name="cus_state"
            value={formData.cus_state}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="cus_postcode"
          >
            Postcode
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="cus_postcode"
            name="cus_postcode"
            value={formData.cus_postcode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="cus_country"
          >
            Country
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="cus_country"
            name="cus_country"
            value={formData.cus_country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="cus_phone"
          >
            Phone
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="cus_phone"
            name="cus_phone"
            value={formData.cus_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2" htmlFor="cus_fax">
            Fax (Optional)
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="cus_fax"
            name="cus_fax"
            value={formData.cus_fax}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="ship_name"
          >
            Shipping Name
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="ship_name"
            name="ship_name"
            value={formData.ship_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="ship_add1"
          >
            Shipping Address 1
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="ship_add1"
            name="ship_add1"
            value={formData.ship_add1}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="ship_add2"
          >
            Shipping Address 2
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="ship_add2"
            name="ship_add2"
            value={formData.ship_add2}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="ship_city"
          >
            Shipping City
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="ship_city"
            name="ship_city"
            value={formData.ship_city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="ship_state"
          >
            Shipping State
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="ship_state"
            name="ship_state"
            value={formData.ship_state}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="ship_postcode"
          >
            Shipping Postcode
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="ship_postcode"
            name="ship_postcode"
            value={formData.ship_postcode}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black font-bold mb-2"
            htmlFor="ship_country"
          >
            Shipping Country
          </label>
          <input
            className="w-full p-2 border border-black rounded"
            type="text"
            id="ship_country"
            name="ship_country"
            value={formData.ship_country}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Subscribe Now
        </button>
      </form>
      {paymentUrl && (
        <p className="mt-4 text-black">Redirecting to payment page...</p>
      )}
    </div>
  );
};

export default Payment;
