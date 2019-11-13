import React, { Component } from "react";

import _map from "lodash/map";

import { FaRegGrinBeam } from "react-icons/fa";

import NavbarDropdown from "../secondary/NavbarDropdown.js";
import FriendRequestItem from "./components/FriendRequestItem.js";
import client from "../../../../../../axiosClient";

const details = {
  title: "Friend request",
  action: "Find Friends",
  link: "findfriends",
  btnTitle: "Check all your events",
  color: "#38a9ff"
};

const FriendsList = ({ requests }) => {
  return
};

export default class FriendsRequests extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      requests: []
    };
  }

  loadData = () => {
    const token = localStorage.getItem('token');
    const axios = client(token);

    axios
        .get('api/profiles/friend_requests')
        .then(res => this.setState({
            requests: res.data.data
          })
        );
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  accept = receiver => {
    const token = localStorage.getItem('token');
    const axios = client(token);

    axios
        .post("api/profiles/follow", {
          receiver,
        })
        .then(res => {
          let { requests } = this.state;
          requests = requests.filter(item => item.id !== receiver);
          this.setState({
            requests,
          })
        })
  };

  render() {
    const { requests } = this.state;

    return (
      <NavbarDropdown
        icon={FaRegGrinBeam}
        children={_map(requests, item =>
            (<FriendRequestItem key={item.id} data={item} accept={this.accept} />)
        )}
        data={details}
      />
    );
  }
}
