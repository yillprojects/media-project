import React, { Component } from 'react';
import { Link } from "react-router-dom";
import client from '../../../../../../axiosClient';
import _map from 'lodash/map';

import './friendsList.scss';

import defaultAvatar from '../../../../../../backend/static/profiles/defaultProfileAvatar.jpg';

const host = 'http://localhost:8000/';

const Friend = props => {
  const { avatar, id } = props;

  return (
      <li>
        <Link to={`/user${id}/timeline`} className="w-friends-link">
          <img
              src={avatar? `${host}media/${avatar}` : defaultAvatar}
              alt="friend avatar"
              style={{ height: 35, width: 35 }}
          />
        </Link>
      </li>
  );
};


export default class FriendsList extends Component {
  _isMounted = false;

  state = {
      friendsData: []
  };

  loadData = () => {
    const token = localStorage.getItem('token');
    const { userId } = this.props;
    const axios = client(token);

    axios
        .get(`api/profiles/${userId}/friends_short`)
        .then(res => {
            if (this._isMounted) {
                this.setState({
                    friendsData: res.data.data
                })
            }
        })
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
        this.loadData();
    }
  }

  componentWillUnmount() {
      this._isMounted = false;
  }

  render() {
    const { friendsData }   = this.state;

    return (
      <div className="ui-block">
        <div className="ui-block-title">
          <h5 className="title">
Friends (
            {friendsData.length}
)
          </h5>
        </div>
        <div className="ui-block-content">
          <ul className="widget w-friends">
            {
                _map(friendsData.slice(0, 14), ({ avatar, id}) => (
                        <Friend avatar={avatar} id={id} key={id} />
                    )
                )
            }
            {
                friendsData.length > 14 ? (
                  <li className="all-users">
                      {friendsData.length - 14}
                  </li>
                ) : (
                  ''
                )
            }
          </ul>
        </div>
      </div>
    );
  }
}
