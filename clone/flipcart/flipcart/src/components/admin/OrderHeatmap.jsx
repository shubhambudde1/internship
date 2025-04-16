import React, { useState, useMemo } from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
// Removed the CSS import

// --- Dummy Data Generation (remains the same) ---
const generateDummyData = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  return days.map(day => ({
    id: day,
    data: hours.map(hour => {
      const hourNum = parseInt(hour.split(':')[0], 10);
      let baseCount = 0;
      let randomFactor = Math.random();

      if (hourNum >= 9 && hourNum < 17) {
        baseCount = 10 + Math.random() * 20;
      } else if (hourNum >= 17 && hourNum < 22) {
        baseCount = 15 + Math.random() * 35;
      } else {
        baseCount = 2 + Math.random() * 8;
      }

      if (['Saturday', 'Sunday'].includes(day) && hourNum >= 18 && hourNum < 22) {
          baseCount *= 1.2;
      }
       if (!['Saturday', 'Sunday'].includes(day) && hourNum >= 0 && hourNum < 8) {
          baseCount *= 0.7;
      }

      return {
        x: hour,
        y: Math.max(0, Math.floor(baseCount + (randomFactor - 0.5) * 5))
      };
    })
  }));
};


// --- React Component ---
const OrderHeatmap = () => {
  // --- State for Filters (remains the same) ---
  const today = new Date(2025, 3, 15); // April 15, 2025
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);
  const formatDate = (date) => date.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(formatDate(oneMonthAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [orderStatus, setOrderStatus] = useState('All');

  // --- Data (remains the same) ---
  const heatmapData = useMemo(() => generateDummyData(), []);

  // --- Peak Time Calculation (remains the same) ---
  const findPeakTime = (data) => {
    let maxOrders = -1;
    let peakDay = '';
    let peakHour = '';

    data.forEach(dayData => {
      dayData.data.forEach(hourData => {
        if (hourData.y > maxOrders) {
          maxOrders = hourData.y;
          peakDay = dayData.id;
          peakHour = hourData.x;
        }
      });
    });
     if (peakDay) {
        return { day: peakDay, hour: peakHour, count: maxOrders };
    }
    return null;
  };

  const peakTime = useMemo(() => findPeakTime(heatmapData), [heatmapData]);

  // --- Render ---
  return (
    // Apply Tailwind classes to the main container
    <div className="p-4 md:p-6 bg-slate-50 rounded-lg shadow-md text-gray-800">
      <h2 id="heatmap-title" className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
        Customer Order Heatmap
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        Showing order volume concentration by day of the week and hour of the day.
      </p>
      <p className="text-xs italic text-gray-500 mb-5">
        Data represents typical patterns (Currently showing dummy data).<br />
        Filters applied: {startDate} to {endDate} (Status: {orderStatus})
      </p>

      {/* --- Optional Filters with Tailwind --- */}
      <div className="flex flex-wrap gap-4 md:gap-6 mb-6 pb-4 border-b border-gray-200">
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
             className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Order Status:
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
        {/* Add an Apply button if filtering triggers data fetch */}
        {/* <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 self-end">Apply</button> */}
      </div>

      {/* --- Heatmap Chart Container --- */}
      {/* Container needs explicit height for Nivo Responsive components */}
      <div style={{ height: '550px' }} className="w-full mt-5 relative">
        <ResponsiveHeatMap
          data={heatmapData}
          indexBy="id"
          keys={heatmapData[0]?.data.map(d => d.x) || []}
          margin={{ top: 80, right: 60, bottom: 60, left: 80 }} // Adjusted margins slightly
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Hour of Day',
            legendPosition: 'middle',
            legendOffset: -55, // Adjust offset as needed with Tailwind fonts
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Day of Week',
            legendPosition: 'middle',
            legendOffset: -65, // Adjust offset as needed
          }}
          colors={{
            type: 'sequential',
            scheme: 'oranges', // Tailwind friendly color scheme
          }}
          cellOpacity={0.95}
          cellBorderWidth={1}
          cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
          enableLabels={false}
          tooltip={({ cell }) => ( // Apply Tailwind classes to tooltip elements
            <div className="bg-white p-2 border border-gray-300 rounded shadow-lg text-xs">
              <strong className="font-semibold">{cell.serieId}</strong> <br /> {/* Day */}
              <span className="text-gray-600">{cell.data.x}</span> <br /> {/* Hour */}
              Orders: <strong className="font-semibold">{cell.data.y}</strong>
            </div>
          )}
          hoverTarget="cell"
          cellHoverOpacity={1.0}
          cellHoverOthersOpacity={0.25}
          // --- Accessibility ---
          ariaLabel="Order activity heatmap"
          ariaLabelledBy="heatmap-title"
          ariaDescribedBy="heatmap-description"
        />
      </div>

      {/* Hidden description for screen readers */}
      <div id="heatmap-description" className="hidden">
        Heatmap visualizing the number of customer orders placed, categorized by the day of the week and the hour of the day. Higher color intensity indicates a higher volume of orders.
      </div>

      {/* --- Optional Peak Time Indicator with Tailwind --- */}
      {peakTime && (
        <div className="mt-6 text-center p-3 bg-orange-100 border border-orange-300 rounded-md text-sm text-orange-800">
          <strong>Peak Activity:</strong> Approx. <strong className="font-semibold">{peakTime.count} orders</strong> around <strong className="font-semibold">{peakTime.hour} on {peakTime.day}s</strong>.
        </div>
      )}
    </div>
  );
};

export default OrderHeatmap;