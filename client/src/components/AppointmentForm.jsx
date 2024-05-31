import { useState, useRef } from "react";
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

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 16px;
`;

const ToggleButton = styled.button`
  padding: 8px;
  margin-bottom: 16px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const AppointmentForm = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const notesRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setIsNewUser(!isNewUser);
    setFormData({
      name: "",
      lastName: "",
      email: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  const fetchExistingUserDetails = async (email) => {
    try {
      const apiUrl = `http://localhost:5000/api/appointments/email/${email}`;
      const response = await axios.get(apiUrl);
      const user = response.data;
      setFormData((prevData) => ({
        ...prevData,
        name: user.name,
        lastName: user.lastName,
      }));
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert(
        "Failed to fetch user details. Please check the email and try again."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (!isNewUser) {
      await fetchExistingUserDetails(formData.email);
    }

    try {
      const apiUrl = "http://localhost:5000/api/appointments";
      await axios.post(apiUrl, formData);

      setFormData({
        name: "",
        lastName: "",
        email: "",
        date: "",
        time: "",
        notes: "",
      });

      console.log("Form cleared");

      nameRef.current.focus();

      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <FormContainer>
      <ToggleButton onClick={handleToggle}>
        {isNewUser ? "Switch to Existing User" : "Switch to New User"}
      </ToggleButton>
      <Form onSubmit={handleSubmit}>
        {isNewUser && (
          <>
            <FormGroup>
              <Label>Name:</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                ref={nameRef}
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name:</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormGroup>
          </>
        )}
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            ref={emailRef}
          />
        </FormGroup>
        <FormGroup>
          <Label>Date:</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            ref={dateRef}
          />
        </FormGroup>
        <FormGroup>
          <Label>Time:</Label>
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            ref={timeRef}
          />
        </FormGroup>
        <FormGroup>
          <Label>Notes:</Label>
          <TextArea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            ref={notesRef}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default AppointmentForm;
