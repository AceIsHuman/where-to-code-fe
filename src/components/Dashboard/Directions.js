import React from "react";
import styled from "styled-components";

const Directions = ({ address }) => (
  <DirectionsContainer>
    <Button
      href={`https://www.google.com/maps/dir//${address}/`}
      target="_blank"
    >
      {"Directions "}
      <i className="fas fa-directions"></i>
    </Button>
  </DirectionsContainer>
);

export default Directions;

const DirectionsContainer = styled.div`
  display: flex;
  flex-flow: row-reverse;
`;

const Button = styled.a`
  color: black
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  background-color: gold;
  border-radius: 5px;
  font-weight: 500;

  &&:hover {
    background-color: yellow;
  }
`;
