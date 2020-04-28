// IMPORTS
import React from "react";
import styled from "styled-components";
import axiosWithAuth from "../../Helpers/axiosWithAuth";
import StarRatings from "react-star-ratings";
import Popup from "reactjs-popup";

import CheckIn from "./CheckIn.js";
import FavoriteLocation from "./FavoriteLocation.js";
import Directions from "../Dashboard/Directions";

// STYLED COMPONENTS
const StyleModal = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 550px;
  padding: 10px 10px 10px 10px;
  font-size: 12px;
`;
const StyledFeaturedReview = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  width: 100%;
`;
const StyledFeaturedReview1 = styled.div`
  text-align: center;
  font-size: 14px;
  font-style: italic;
  margin-top: 5px;
  padding-top: 5px;
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  border-radius: 10px 10px 10px 10px;
  background-color: white;
  overflow-x: hidden;
  overflow-x: auto;
`;
const ContentRight = styled.div`
  padding: 15px;
  width: 70%;
  display: flex;
  align-items: end;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
  h2,
  p {
    margin: 0 0 5px 30px;
    color: white;
  }
  .hours {
    margin-bottom: 0px;
  }
  .name {
    padding-top: px;
  }
  background-color: #959595;
`;
const ContentLeft = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 50%;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  h2,
  p {
    margin: 0 0 5px 0;
    img {
      display: flex;
      margin-right: 10px;
      height: 80%px;
      width: 100%;
      overflow: hidden;
      border-radius: 20px;
    }
  }
`;
const StyledFeatureReview = styled.div`
  display: flex;
  flex-direction: column;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: black;
`;
const ExtrasContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  color: white;
`;

// COMPONENT
class DetailsPanel extends React.Component {
  // STATE
  state = {
    review: []
  };

  componentDidUpdate(prevProps, nextState) {
    if (this.props.locationId !== prevProps.locationId) {
      return this.grabReviews();
    }
  }

  // METHODS
  componentDidMount() {
    return this.grabReviews();
  }

  grabReviews() {
    return axiosWithAuth()
      .get(`/reviews/${this.props.locationId}/location`)
      .then(res => {
        let newReview1 = res.data.slice(-1);
        let newReview = newReview1[0];
        this.setState({
          review: newReview
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <StyleModal>
        <Content>
          <ContentLeft>
            <p>
              <img style={{ marginLeft: 0 }} src={this.props.icon} />
            </p>
            <StyledFeatureReview>
              <StyledFeaturedReview>Latest Review</StyledFeaturedReview>
              {this.state.review ? (
                <div>
                  <ul>
                    <li>
                      <p>User: {this.state.review.userName},</p>
                    </li>
                    <li>
                      <p>
                        Overall Rating:
                        <StarRatings
                          rating={this.state.review.rating}
                          starRatedColor="gold"
                          numberOfStars={3}
                          name="rating"
                          starDimension="15px"
                          starSpacing="0px"
                        />
                      </p>
                    </li>
                    <li>
                      <p>
                        Internet Rating:
                        <StarRatings
                          rating={this.state.review.internet_rating}
                          starRatedColor="gold"
                          numberOfStars={3}
                          name="rating"
                          starDimension="15px"
                          starSpacing="0px"
                        />
                      </p>
                    </li>
                    <li>
                      <p>Comments: {this.state.review.comments}</p>
                    </li>
                  </ul>
                </div>
              ) : (
                <StyledFeaturedReview1>
                  <p>There Are No Reviews Currently</p>
                </StyledFeaturedReview1>
              )}
            </StyledFeatureReview>
          </ContentLeft>
          <ContentRight>
            <ExtrasContainer>
              <Popup
                trigger={<i className="fas fa-ellipsis-h fa-2x"></i>}
                position="bottom right"
              >
                <Menu>
                  <CheckIn locationId={this.props.locationId} />
                  <FavoriteLocation locationId={this.props.locationId} />
                </Menu>
              </Popup>
            </ExtrasContainer>
            <h2 className="name">Name:</h2>
            <p style={{ fontSize: "20px" }}>{this.props.details[0]}</p>
            <h2>Phone:</h2>
            <p style={{ fontSize: "20px" }}>{this.props.details[1]}</p>
            <h2 className="hours">Hours:</h2>
            <ul>
              <p>
                {this.props.hours.map((data, index) => {
                  return (
                    <li key={index}>
                      <div>{data}</div>
                    </li>
                  );
                })}
              </p>
            </ul>
            <Directions address={this.props.location.address} />
          </ContentRight>
        </Content>
      </StyleModal>
    );
  }
}
// EXPORT
export default DetailsPanel;
