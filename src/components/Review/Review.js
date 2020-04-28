// IMPORTS
import React from "react";
import styled from "styled-components";

// IMPORT COMPONENTS
import Tabs from "./Tabs";

// STYLED COMPONENTS
const StyleModal = styled.div`
  font-size: 12px;
`;

export default props => (
  <StyleModal>
    <Tabs
      address={props.address}
      close={props.close}
      details={props.details}
      hours={props.hours}
      locationId={props.locationId}
      icon={props.icon}
    />
  </StyleModal>
);
