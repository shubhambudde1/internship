import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Form, Container } from "react-bootstrap";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/tickets/${id}`)
      .then((res) => {
        setTicket(res.data);
        setStatus(res.data.status);
        setLoading(false);
      })
      .catch(() => {
        setError("Ticket not found");
        setLoading(false);
      });
  }, [id]);

  const updateTicket = () => {
    axios.put(`http://localhost:5000/tickets/${id}`, {
      subject: ticket.subject,
      description: ticket.description,
      status
    })
    .then(() => {
      alert("Ticket updated successfully!");
      navigate("/");
    })
    .catch((err) => console.error(err));
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Ticket Details</Card.Title>
          <Card.Text><strong>Subject:</strong> {ticket.subject}</Card.Text>
          <Card.Text><strong>Description:</strong> {ticket.description}</Card.Text>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Form.Select>
          </Form.Group>

          <Button variant="success" className="me-2" onClick={updateTicket}>Update Ticket</Button>
          <Button variant="secondary" onClick={() => navigate("/")}>Back</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TicketDetails;
