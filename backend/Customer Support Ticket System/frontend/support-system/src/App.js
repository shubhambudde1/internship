import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketList from "./TicketList";
import TicketForm from "./TicketForm";
import TicketDetails from "./TicketDetails";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketList />} />
        <Route path="/new" element={<TicketForm />} />
        <Route path="/ticket/:id" element={<TicketDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
