import React, { Component } from "react";
import client from "../../../../../../axiosClient";
import { connect } from 'react-redux';

import { FaChevronDown } from "react-icons/fa";

import defaultAvatar from "backend/static/profiles/defaultProfileAvatar.jpg";

class User extends Component {
  _isMounted = false;

  state = {
    name: "",
    avatar: null
  };

  componentDidMount() {
    this._isMounted = true;
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("currentUserId");
    const axios = client(token);

    axios
      .post(`api/profiles/${id}/get_fields`, {
        fields: ["avatar", "first_name", "last_name"]
      })
      .then(res => {
        if (this._isMounted) {
          const { first_name, last_name, avatar } = res.data.data;
          this.setState({
            name: first_name + " " + last_name,
            avatar: avatar
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { status, statusText, name } = this.props;
    const { avatar } = this.state;

    console.log(this.props);

    return (
      <div className="user">
        <div className="user-thumb">
          <span className="sr-only">User</span>
          <img
            src={
              avatar
                ? `http://localhost:8000/media/profiles/${avatar}`
                : defaultAvatar
            }
            alt="user-avatar"
            style={{ width: 35, height: 35 }}
            className="user-img"
          />
          <span className={`icon-status  ${status || "online"}`} />
        </div>
        <div className="user-name">
          <div className="user-title">
            <h5>{name? name : this.state.name}</h5>
            <FaChevronDown />
          </div>
          <span className="user-subtitle">{statusText}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    name: state.user.name
  }
};

export default connect(mapStateToProps)(User);

