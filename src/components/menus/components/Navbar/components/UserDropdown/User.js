import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import client from '../../../../../../axiosClient';

import { FaChevronDown } from 'react-icons/fa';

import UserImg from '../FriendsRequests/50.png';

export default class User extends Component {
  _isMounted = false;

  state = {
      name: '',
      status: ''
  };

  componentDidMount() {
    this._isMounted = true;
    const token = localStorage.getItem('token');
    const axios = client(token);

    axios
        .post('api/profiles/get_fields', {
            fields: ['status', 'first_name', 'last_name']
        })
        .then(res => {
            if (this._isMounted) {
                const {first_name, last_name, status} = res.data.data;
                this.setState({
                    name: first_name + ' ' + last_name,
                    status
                })
            }
        })
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
  	const { status } = this.props;
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
          <span className="user-subtitle">{this.state.status}</span>
        </div>
      </div>
    );
  }
}
