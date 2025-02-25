import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tickets")
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteTicket = (id) => {
    axios.delete(`http://localhost:5000/tickets/${id}`)
      .then(() => setTickets(tickets.filter(ticket => ticket.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-3">Support Tickets</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Subject</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.subject}</td>
              <td>
                <span className={`badge bg-${ticket.status === "Resolved" ? "success" : ticket.status === "In Progress" ? "warning" : "danger"}`}>
                  {ticket.status}
                </span>
              </td>
              <td>
                <Link to={`/ticket/${ticket.id}`}>
                  <Button variant="primary" size="sm" className="me-2">View</Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => deleteTicket(ticket.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/new">
        <Button variant="success">Create New Ticket</Button>
      </Link>
    </Container>
  );
};

export default TicketList;
