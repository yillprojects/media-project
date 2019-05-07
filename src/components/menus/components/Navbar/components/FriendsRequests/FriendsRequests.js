import React, { Component } from "react";

import _map from "lodash/map";

import { FaRegGrinBeam } from "react-icons/fa";

import NavbarDropdown from "../secondary/NavbarDropdown.js";
import FriendRequestItem from "./components/FriendRequestItem.js";

const details = {
  title: "Friend request",
  action: "Find Friends",
  link: "findfriends",
  btnTitle: "Check all your events",
  color: "#38a9ff"
};

const FriendsList = () => {
  const data = [
    {
      id: 1,
      username: "bebe bebe",
      link: "bebe"
    },
    {
      id: 2,
      username: "lola bebe",
      link: "lola"
    },
    {
      id: 3,
      username: "koko bebe",
      link: "koko"
    }
  ];

  return _map(data, (item, index) => (
    <FriendRequestItem key={item.id} data={item} />
  ));
};

export default class FriendsRequests extends Component {
  render() {
    return (
      <NavbarDropdown
        icon={FaRegGrinBeam}
        children={<FriendsList />}
        data={details}
      />
    );
  }
}
