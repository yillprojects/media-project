import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import client from '../../../../../../axiosClient';

import { FaChevronDown } from 'react-icons/fa';

import UserImg from '../FriendsRequests/50.png';

export default class User extends Component {
  _isMounted = false;

  state = {
      name: '',
  };

  componentDidMount() {
    this._isMounted = true;
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('currentUserId');
    const axios = client(token);

    axios
        .post(`api/profiles/${id}/get_fields`, {
            fields: ['first_name', 'last_name']
        })
        .then(res => {
            if (this._isMounted) {
                const { first_name, last_name } = res.data.data;
                this.setState({
                    name: first_name + ' ' + last_name,
                })
            }
        })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
  	const { status, statusText } = this.props;
    const { name } = this.state;

    return (
      <div className="user">
        <div className="user-thumb">
          <span className="sr-only">User</span>
          <img
            src={UserImg}
            alt="user-avatar"
            style={{ width: 35, height: 35 }}
            className="user-img"
          />
          <span className={`icon-status  ${status || 'online'}`} />
        </div>
        <div className="user-name">
          <div className="user-title">
            <h5>{name}</h5>
            <FaChevronDown />
          </div>
          <span className="user-subtitle">{statusText}</span>
        </div>
      </div>
    );
  }
}
