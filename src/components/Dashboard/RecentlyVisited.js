import React from "react";
import LocationCard from "./LocationCard";
import styled from "styled-components";

const RecentlyVisited = props => {
  const { visits } = props;

  return (
    <>
      <p className="sub-header">Recently Visited</p>
      {!!visits[0] ? (
        visits.map(visit => (
          <LocationCard key={`user-visit-${visit.id}`} visit={visit} />
        ))
      ) : (
        <NoVisits className="location-listing">
          No Visits
        </NoVisits>
      )}
    </>
  );
};

export default RecentlyVisited;

const NoVisits = styled.p`
  &&:hover {
    cursor: default !important;
    background: #f1ca0957 !important;
    transform: none !important;
  }
`;
