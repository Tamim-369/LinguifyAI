import express from "express";
import SSLCommerzPayment from "sslcommerz-lts";
const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = false;
app.post("/api/init-payment", (req, res) => {
  const data = {
    total_amount: req.body.total_amount,
    currency: "BDT",
    tran_id: `REF${Date.now()}`, // Unique transaction ID
    success_url: "http://localhost:3030/api/payment-success",
    fail_url: "http://localhost:3030/api/payment-fail",
    cancel_url: "http://localhost:3030/api/payment-cancel",
    ipn_url: "http://localhost:3030/api/ipn",
    shipping_method: "Courier",
    product_name: "Product Name",
    product_category: "Product Category",
    product_profile: "general",
    cus_name: req.body.cus_name,
    cus_email: req.body.cus_email,
    cus_add1: req.body.cus_add1,
    cus_add2: req.body.cus_add2,
    cus_city: req.body.cus_city,
    cus_state: req.body.cus_state,
    cus_postcode: req.body.cus_postcode,
    cus_country: req.body.cus_country,
    cus_phone: req.body.cus_phone,
    cus_fax: req.body.cus_fax,
    ship_name: req.body.ship_name,
    ship_add1: req.body.ship_add1,
    ship_add2: req.body.ship_add2,
    ship_city: req.body.ship_city,
    ship_state: req.body.ship_state,
    ship_postcode: req.body.ship_postcode,
    ship_country: req.body.ship_country,
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz
    .init(data)
    .then((apiResponse) => {
      const GatewayPageURL = apiResponse.GatewayPageURL;
      res.json({ url: GatewayPageURL });
    })
    .catch((err) => {
      console.error("Payment initiation failed:", err);
      res.status(500).json({ error: "Payment initiation failed" });
    });
});

// Endpoint to handle successful payment
app.post("/api/payment-success", (req, res) => {
  // Handle the successful payment, validate transaction if needed
  res.json({ status: "Payment Successful", data: req.body });
});

// Endpoint to handle failed payment
app.post("/api/payment-fail", (req, res) => {
  // Handle the failed payment
  res.json({ status: "Payment Failed", data: req.body });
});

// Endpoint to handle canceled payment
app.post("/api/payment-cancel", (req, res) => {
  // Handle the canceled payment
  res.json({ status: "Payment Canceled", data: req.body });
});

// IPN (Instant Payment Notification) endpoint
app.post("/api/ipn", (req, res) => {
  // Handle the IPN
  res.json({ status: "IPN Received", data: req.body });
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
