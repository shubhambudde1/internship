import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// No CSS import needed if Tailwind is globally configured

// --- Mock API Data (Same as before) ---
const mockApiData = {
    paymentMethods: [
        { method: 'UPI', orderCount: 350, totalRevenue: 75000 },
        { method: 'Credit Card', orderCount: 210, totalRevenue: 115500 },
        { method: 'Debit Card', orderCount: 150, totalRevenue: 61000 },
        { method: 'Net Banking', orderCount: 80, totalRevenue: 45000 },
        { method: 'Wallet', orderCount: 110, totalRevenue: 33000 },
        { method: 'Cash on Delivery (COD)', orderCount: 50, totalRevenue: 18000 },
    ],
};

// --- Helper Functions (Same as before) ---
const formatCurrency = (value) => {
    return value.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

// Define colors for the Pie Chart slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919']; // Tailwind colors can also be used here if preferred, e.g., 'text-blue-500', but hex codes work directly with Recharts `fill`

// --- React Component with Tailwind ---
const PaymentMethods = () => {
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenueOverall, setTotalRevenueOverall] = useState(0);

    // Simulate API Fetching (Same logic as before)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
                const data = mockApiData; // Replace with actual API call

                if (!data || !data.paymentMethods) {
                    throw new Error("Invalid data format received");
                }

                const methods = data.paymentMethods;
                const calculatedTotalOrders = methods.reduce((sum, item) => sum + item.orderCount, 0);
                const calculatedTotalRevenue = methods.reduce((sum, item) => sum + item.totalRevenue, 0);

                setTotalOrders(calculatedTotalOrders);
                setTotalRevenueOverall(calculatedTotalRevenue);

                if (calculatedTotalOrders === 0) {
                    setPaymentData([]);
                } else {
                     const processedData = methods
                        .map(item => ({
                            ...item,
                            percentage: ((item.orderCount / calculatedTotalOrders) * 100),
                        }))
                        .sort((a, b) => b.orderCount - a.orderCount);

                    setPaymentData(processedData);
                }

            } catch (err) {
                console.error("Failed to fetch payment data:", err);
                setError(err.message || 'Failed to load data.');
                setPaymentData([]);
                setTotalOrders(0);
                setTotalRevenueOverall(0);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Memoize derived values (Same logic as before)
    const topMethod = useMemo(() => {
        if (!paymentData || paymentData.length === 0) return null;
        return paymentData[0].method;
    }, [paymentData]);

    // --- Render Logic with Tailwind ---
    if (loading) {
        return <div className="p-6 text-center text-gray-600">Loading payment insights...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div className="p-4 md:p-6 bg-gray-100 rounded-lg shadow-md font-sans">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">
                Payment Methods Analytics
            </h1>

            {/* TODO: Add Filter Options Here (Styled with Tailwind) */}
            {/* <div className="filters mb-6"> ... Filters UI ... </div> */}

             {paymentData.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No payment data available for the selected period.</p>
            ) : (
                <>
                    {/* --- Optional: Total Revenue Summary --- */}
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 md:mb-8 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-blue-800 mb-1">
                            Total Revenue: {formatCurrency(totalRevenueOverall)}
                        </h2>
                        <p className="text-gray-700 text-sm">
                            Across {totalOrders.toLocaleString('en-IN')} orders
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-8">
                        {/* --- Pie Chart Section --- */}
                        <div className="flex-1 min-w-[300px] bg-white p-5 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                                Payment Method Usage (by Order Count)
                            </h2>
                            <div style={{ width: '100%', height: 350 }}> {/* Use inline style or aspect ratio for container */}
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={paymentData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            // Custom label function for better readability if needed
                                            // label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => { ... }}
                                            outerRadius="80%" // Adjust size relative to container
                                            fill="#8884d8"
                                            dataKey="orderCount"
                                            nameKey="method"
                                        >
                                            {paymentData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value, name, props) => [
                                                `${value.toLocaleString('en-IN')} Orders (${props.payload.percentage.toFixed(1)}%)`,
                                                name
                                            ]}
                                            contentStyle={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }} // Optional: Style tooltip
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                             </div>
                        </div>

                        {/* --- Detailed Table Section --- */}
                        <div className="flex-1 min-w-[300px] bg-white p-5 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                                Detailed Breakdown
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse mt-2 text-sm md:text-base">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 p-2 md:p-3 text-left font-semibold text-gray-600">Payment Method</th>
                                            <th className="border border-gray-300 p-2 md:p-3 text-left font-semibold text-gray-600">Orders</th>
                                            <th className="border border-gray-300 p-2 md:p-3 text-left font-semibold text-gray-600">Revenue (₹)</th>
                                            <th className="border border-gray-300 p-2 md:p-3 text-left font-semibold text-gray-600">% Share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentData.map((item) => (
                                            <tr
                                              key={item.method}
                                              // Conditional styling for top method and hover/even rows
                                              className={`border border-gray-300 hover:bg-gray-100 even:bg-gray-50 ${
                                                item.method === topMethod ? 'bg-yellow-100 font-medium' : ''
                                              }`}
                                            >
                                                <td className="p-2 md:p-3 align-middle">
                                                    {item.method}
                                                    {item.method === topMethod && (
                                                        <span className="ml-2 inline-block px-2 py-0.5 text-xs font-bold text-white bg-green-500 rounded-full align-middle">
                                                            Top
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 md:p-3 align-middle text-right">{item.orderCount.toLocaleString('en-IN')}</td>
                                                <td className="p-2 md:p-3 align-middle text-right">{formatCurrency(item.totalRevenue)}</td>
                                                <td className="p-2 md:p-3 align-middle text-right">{item.percentage.toFixed(2)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-gray-200 font-bold text-gray-700">
                                            <th className="border border-gray-300 p-2 md:p-3 text-left">Total</th>
                                            <th className="border border-gray-300 p-2 md:p-3 text-right">{totalOrders.toLocaleString('en-IN')}</th>
                                            <th className="border border-gray-300 p-2 md:p-3 text-right">{formatCurrency(totalRevenueOverall)}</th>
                                            <th className="border border-gray-300 p-2 md:p-3 text-right">100.00%</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentMethods;