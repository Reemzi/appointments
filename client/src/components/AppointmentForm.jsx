import { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.div`
  margin: 0 auto;
`;

const Form = styled.form`
  background-color: #f4f4f4;
  padding: 50px;
  border-radius: 5px;
  margin: 0 50px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #121412;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1;
  }
`;

const ToggleButton = styled.button`
  padding: 8px;
  margin: 0 50px;
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
      if (error.response) {
        // Handle different response status codes
        if (error.response.status === 404) {
          alert("User not found. Please check the email and try again.");
        } else {
          alert("Failed to fetch user details. Please try again later.");
        }
      } else {
        alert(
          "Failed to fetch user details. Please check your network connection and try again."
        );
      }
    }
  };

  const handleFetchUser = async () => {
    if (!isNewUser && formData.email) {
      await fetchExistingUserDetails(formData.email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form data to see what is being sent
    console.log("Form Data before submitting:", formData);

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

      nameRef.current.focus();

      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
      }
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
            onBlur={handleFetchUser}
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
