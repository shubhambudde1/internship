const express = require("express");
const cors = require("cors");
const db = require("./udb.cjs");
const userRoutes = require("./users.cjs"); // Ensure this file exists and exports a router
const productRoutes = require("./products.cjs"); // Ensure this file exists and exports a router
const authRoutes = require("./auth.cjs"); // Ensure this file exists and exports a router
const orderRoutes = require("./orders.cjs"); // Ensure this file exists and exports a router
const Returnroute = require("./ReturnRequests.cjs"); // Ensure this file exists and exports a router
const sellerManageRoutes = require("./SellerManage.cjs"); // Ensure this file exists and exports a router
const inventryroute = require("./product_manage.cjs"); // Ensure this file exists and exports a router
const RetuCustomer = require("./customersmanage.cjs"); // Ensure this file exists and exports a router
const routecoupon = require("./CouponManagement.cjs"); // Ensure this file exists and exports a router
const routereturnorder = require("./return_order.cjs"); // Ensure this file exists and exports a router
const routeR_view = require("./r_view.cjs"); // Ensure this file exists and exports a router
const routerecommended = require("./recommended.cjs")
//const routenotifications = require("./Notification.cjs"); // Ensure this file exists and exports a router
const routepolls = require("./poll/poll.cjs"); // Ensure this file exists and exports a router
const routeproductDynamic = require("./Product_dynamic.cjs"); // Ensure this file exists and exports a router
const routeQASection = require("./QuestionAndAnswer.cjs")
const routerecommendPurchased = require("./RecommendBasedPurchased.cjs") // Ensure this file exists and exports a router
const routerewardLoyelty = require("./rewardLoyelty.cjs") // Ensure this file exists and exports a router
const routeordeReturn = require("./order_return.cjs") // Ensure this file exists and exports a router


const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// authentication routes
app.use("/api/auth", authRoutes);

// User management routes
app.use("/api/users", userRoutes);

// Product management routes
app.use("/api/products", productRoutes);


// request components
app.use("/api/returnr",Returnroute)

app.use("/api/inventry",inventryroute)

// seller management routes
app.use("/api/sellerManage",sellerManageRoutes); // Ensure this file exists and exports a router

// Order management routes
app.use("/api/orders", orderRoutes);

app.use("/api/customer",RetuCustomer)


app.use("/api/coupons", routecoupon);

app.use("/api/returnorder", routereturnorder);

app.use("/api/recomended", routerecommended);

// app.use("/api/notifications", routenotifications);

app.use("/api/polls", routepolls);


// app.use("/api/productDynamic", routeproductDynamic);

app.use("/api/rview", routeR_view); // Ensure this file exists and exports a router

app.use("/api/QASection", routeQASection);

app.use("/api/recommendPurchased", routerecommendPurchased);

app.use("/api/rewardLoyelty", routerewardLoyelty);

app.use("/api/ordeReturn", routeordeReturn); // Ensure this file exists and exports a router


// Root route for testing
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start server
const PORT = 5001;
try {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error("Error starting the server:", error);
}
