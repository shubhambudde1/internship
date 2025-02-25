import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Card } from "react-bootstrap";

const TicketForm = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/tickets", { subject, description, status: "Open" })
      .then(() => {
        alert("Ticket created successfully!");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Create New Ticket</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit">Create Ticket</Button>
            <Button variant="secondary" className="ms-2" onClick={() => navigate("/")}>Cancel</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TicketForm;
