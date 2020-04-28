// IMPORTS
import React, { Component } from "react";
import styled from "styled-components";
import axiosWithAuth from "../../Helpers/axiosWithAuth";
import { connect } from "react-redux";

// COMPONENTS
import NetworkModal from "../NetworkSpeed/networkModal";
import NetworkSpeed from "../NetworkSpeed/NetworkSpeed";

import TextArea from "../Review/TextArea";
import Select from "../Review/Select";
import Button from "../Review/Button";

/* global google */

// STYLES
const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

// STYLED COMPONENTS
const StyleModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  font-size: 12px;
  max-height: 550px;
`;
const Header = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fbd702;
  width: 100%;
  margin-bottom: 15px;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 5px 0 5px 0;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 10px 6px 10px 6px rgba(0, 0, 0, 0.2);
  .buttonContainer {
    display: flex;
    justify-content: center;
  }
  border-radius: 10px 10px 10px 10px;
  background-color: white;
  const buttonStyle = {
    margin: "10px 10px 10px 10px";
  }
`;
const NetworkTextStyle = styled.p`
  font-size: 20px;
  color: white;
  font-weight: 500;
  letter-spacing: 3px;
`;

class ReviewPanel extends Component {
  constructor(props) {
    super(props);
    // STATE
    this.state = {
      newReview: {
        user_id: this.props.userId,
        rating: " ",
        internet_rating: " ",
        comments: "",
        location_id: this.props.locationId
      },
      rating: ["1", "2", "3"],
      internet_rating: ["1", "2", "3"],
      submitted: false,
      network: false,
      distanceFromLocation: 100
    };

    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  // METHODS
  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.setState(prevState => ({
      newReview: {
        ...prevState.newReview,
        [name]: value
      }
    }));
  }

  handleTextArea(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      newReview: {
        ...prevState.newReview,
        comments: value
      }
    }));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newReview;
    axiosWithAuth()
      .post("/reviews", userData)
      .then(res => {
        this.setState({ submitted: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newReview: {
        user_id: "",
        rating: " ",
        comments: "",
        internet_rating: ""
      }
    });
  }

  toggleNetworkTest = () => {
    this.setState(prevState => {
      return { ...prevState, network: !prevState.network };
    });
  };

  render() {
    return (
      <>
        {this.state.submitted ? (
          <StyleModal>
            <Header>Thank You For Submitting A Review</Header>
          </StyleModal>
        ) : (
          <StyleModal>
            <Header> Leave a Review </Header>

            <div style={{ display: "flex" }}>
              <StyledForm form onSubmit={this.handleFormSubmit}>
                {/* Rating Required*/}
                <Select
                  title={"Location Rating"}
                  name={"rating"}
                  options={this.state.rating}
                  value={this.state.newReview.rating}
                  placeholder={"Select Rating"}
                  handleChange={this.handleInput}
                />
                {/*Internet Rating */}
                <Select
                  title={"Internet Rating"}
                  name={"internet_rating"}
                  options={this.state.internet_rating}
                  value={this.state.newReview.internet_rating}
                  placeholder={"Select Internet Rating"}
                  handleChange={this.handleInput}
                />
                {/*Comment */}
                <TextArea
                  title={"Comments"}
                  rows={10}
                  cols={50}
                  value={this.state.newReview.comments}
                  name={"comment"}
                  handleChange={this.handleTextArea}
                  placeholder={"Leave a comment"}
                />
                {/*Submit */}
                <div className="buttonContainer">
                  <Button
                    action={this.handleFormSubmit}
                    type={"primary"}
                    title={"Submit"}
                    style={buttonStyle}
                  />
                  {/* Clear form */}
                  <Button
                    action={this.handleClearForm}
                    type={"secondary"}
                    title={"Clear"}
                    style={buttonStyle}
                  />
                </div>
              </StyledForm>

              {this.state.network ? <NetworkSpeed /> : null}
            </div>

            {
              // Only render network test option if user is within 100ft (30.48m) of location
              this.state.distanceFromLocation <= 30.48 ? (
                <NetworkModal
                  handleNetwork={this.toggleNetworkTest}
                  runTest={this.state.network}
                />
              ) : null
            }

            <NetworkTextStyle>
              {this.state.distanceFromLocation > 30.48
                ? // Convert Meters to Miles
                  `Must be ${(
                    (this.state.distanceFromLocation - 30.48) *
                    0.000621
                  ).toFixed(2)} miles closer to test network`
                : null}
            </NetworkTextStyle>
          </StyleModal>
        )}
      </>
    );
  }
}

export default connect(
  ({ userReducer }) => ({ userId: userReducer.userId }),
  null
)(ReviewPanel);
