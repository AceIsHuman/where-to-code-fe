import React, { Component } from "react";
import Modal from "styled-react-modal";
import Review from "../Review/Review";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";

/*global google*/

class SingleMapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      hours: [],
      id: null,
      isOpen: false,
      opacity: 0
    };
  }

  requestDetails = id => {
    let map = new google.maps.Map(document.getElementById("fakeMap"));

    let service = new google.maps.places.PlacesService(map);

    let request = {
      placeId: id,
      fields: ["name", "formatted_phone_number", "opening_hours"]
    };
    // Took hours out of details because I was having issues mapping over an array inside of an array ¯\_(ツ)_/¯
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.setState({
          ...this.state,
          details: [place.name, place.formatted_phone_number],
          hours: !place.opening_hours
            ? ["N/A"]
            : place.opening_hours.weekday_text,
          id: id
        });
      }
    });
  };

  showOnMap = () => {
    // Clicking on map closes the infoWindow
    google.maps.event.addListener(this.props.map, "click", event => {
      this.props.location.infoWindow.close();
    });

    // Open marker info window and center on map
    this.props.location.infoWindow.open(
      this.props.map,
      this.props.location.marker
    );
    this.props.map.setCenter(this.props.location.position);
    this.props.map.setZoom(16);
  };

  toggleModal = e => {
    this.setState({ ...this.state, isOpen: !this.state.isOpen });
  };

  afterOpen = () => {
    setTimeout(() => {
      this.setState({ ...this.state, opacity: 1 });
    }, 20);
  };

  beforeClose = () => {
    return new Promise(resolve => {
      this.setState({ ...this.state, opacity: 0 });
      setTimeout(resolve, 200);
    });
  };

  render() {
    const location = this.props.location;

    return (
      <>
        {this.props.location !== "" ? (
          <SingleMapCardContainer
            id={`card-${location.id}`}
            onClick={this.showOnMap}
          >
            <img src={location.icon} alt="Icon of the location" />
            <DetailContainer>
              <h2>{`${location.name}`}</h2>
              <h4>
                {`rating: ${location.rating} `}
                <StarRatings
                  rating={location.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name="rating"
                  starDimension="15px"
                  starSpacing="0px"
                />
              </h4>
              <p>{`${location.address}`}</p>
              <DetailButton onClick={this.toggleModal}>Details</DetailButton>
              <StyledModal
                isOpen={this.state.isOpen}
                afterOpen={this.afterOpen}
                beforeClose={this.beforeClose}
                onBackgroundClick={this.toggleModal}
                onEscapeKeydown={this.toggleModal}
                opacity={this.opacity}
                backgroundProps={{ opacity: this.state.opacity }}
              >
                <Review
                  onClick={this.requestDetails(location.id)}
                  details={this.state.details}
                  hours={this.state.hours}
                  address={this.props.address}
                  locationId={this.state.id}
                  icon={location.icon}
                />
              </StyledModal>
            </DetailContainer>
          </SingleMapCardContainer>
        ) : null}
      </>
    );
  }
}

export default connect(
  state => ({ map: state.mapReducer.map }),
  null
)(SingleMapCard);

const SingleMapCardContainer = styled.div`
  display: flex;
  border-radius: 5px;
  box-shadow: -4px 2px 22px -13px rgba(0, 0, 0, 0.75);
  max-width: 700px;
  margin: 20px auto;
  padding: 14px;
  align-items: center;
  background: white;
  cursor: pointer;

  img {
    margin-right: 10px;
    width: 225px;
    height: 225px;
    overflow: hidden;

    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  h2 {
    font-size: 24px;
    border-bottom: 1px dotted lightgray;
    line-height: 2;
    margin: 0;
  }
  h4 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }
`;

const DetailButton = styled.button`
  align-self: center;
  border-radius: 10px;
  border: 2px solid gold;
  font-size: 18px;
  cursor: pointer;
  width: 165px;
  padding: 10px 56px;
  margin: 35px 0 0;
  background: white;
  &:hover {
    box-shadow: 0px 5px 5px 0px rgba(176, 170, 176, 1);
    transform: translateY(-2px);
    transition: 0.2s;
  }
`;

const StyledModal = Modal.styled`
  max-width: 40rem;
  opacity: ${props => props.opacity};
  transition: opacity ease 1000ms;
  border-radius: 30px;
  
  @media (min-width: 700px) {
    width: 40rem;
  }
`;
