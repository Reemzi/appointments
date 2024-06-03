// import React from "react";
import AppointmentForm from "./components/AppointmentForm";
import styled from "styled-components";

const Header = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #383a38;
  margin: 16px 50px;
`;
const App = () => {
  return (
    <div>
      <Header>Appointment Booking App</Header>
      <AppointmentForm />
    </div>
  );
};

export default App;
