import React, { Component } from "react";
import client from "../../../../../../axiosClient";

import { FaFacebookF, FaTwitter, FaDribbble } from "react-icons/fa";

import "./profileInfo.scss";

const titles = [
  "About Me:",
  "Favorite TV Shows:",
  "Favourite Music Bands/Artists:"
];

const names = ["about", "shows", "bands"];

const sns = ["facebook", "twitter", "dribbble"];

class ProfileInfo extends Component {
  _isMounted = false;

  state = {
    shows: "",
    bands: "",
    about: "",
    facebook: "",
    twitter: "",
    dribbble: ""
  };

  loadData = () => {
    const token = localStorage.getItem("token");
    let { userId } = this.props;
    const axios = client(token);

    axios
      .post(`api/profiles/${userId}/get_fields`, {
        fields: ["about", "shows", "bands", "facebook", "twitter", "dribbble"]
      })
      .then(res => {
        if (this._isMounted) {
          const {
            about,
            shows,
            bands,
            facebook,
            twitter,
            dribbble
          } = res.data.data;
          this.setState({
            about,
            shows,
            bands,
            facebook,
            twitter,
            dribbble
          });
        }
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if(this.props.userId !== prevProps.userId) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { facebook, twitter, dribbble } = this.state;
    const otherSns = !!(facebook.length || twitter.length || dribbble.length);

    return (
      <div className="personal-info ui-block">
        <div className="ui-block-title">
          <h5 className="title">Profile Intro</h5>
        </div>
        <div className="ui-block-content">
          <ul className="w-personal-info mb-4">
            {names.map((item, index) => {
              if (this.state[item].length)
                return (
                  <li key={item}>
                    <h6 className="title">{titles[index]}</h6>
                    <p className="text">{this.state[item]}</p>
                  </li>
                );
            })}
          </ul>
          <div className="w-socials">
            {otherSns ? <h6 className="title">Other Social Networks: </h6> : ""}
            {facebook.length ? (
              <a href={facebook} className="social-item bg-facebook">
                <FaFacebookF className="mr-1" /> Facebook
              </a>
            ) : (
              ""
            )}
            {twitter.length ? (
              <a href={twitter} className="social-item bg-twitter">
                <FaTwitter className="mr-1" /> Twitter
              </a>
            ) : (
              ""
            )}
            {dribbble.length ? (
              <a href={dribbble} className="social-item bg-dribbble">
                <FaDribbble className="mr-1" /> Dribbble
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
