import React from "react";
import LocationCard from "./LocationCard";
import styled from "styled-components";

const SavedLocations = props => {
  const { savedLocations } = props;
  return (
    <>
      <p className="sub-header">Saved Locations</p>
      {!!savedLocations ? (
        savedLocations.map(location => (
          <LocationCard
            key={`saved-location-${location.id}`}
            location={location}
            saved
          />
        ))
      ) : (
        <NoLocations className="location-listing">
          No Saved Locations
        </NoLocations>
      )}
    </>
  );
};

export default SavedLocations;

const NoLocations = styled.p`
  &&:hover {
    cursor: default !important;
    background: #f1ca0957 !important;
    transform: none !important;
  }
`;
