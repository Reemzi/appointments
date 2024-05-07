import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to backend server
      await axios.post("/api/appointments", formData);

      // Clear form fields after successful submission
      setFormData({
        name: "",
        lastName: "",
        email: "",
        date: "",
        time: "",
        notes: "",
      });

      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Label>Name:</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <Label>Last Name:</Label>
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <Label>Email:</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Label>Date:</Label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <Label>Time:</Label>
        <Input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <Label>Notes:</Label>
        <TextArea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
        />

        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default AppointmentForm;
