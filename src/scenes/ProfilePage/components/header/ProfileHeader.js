import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import client from 'axiosClient';

import ProfileMenu from "./components/ProfileMenu.js";

import defaultAvatar from "backend/static/profiles/defaultProfileAvatar.jpg";
import defaultHeader from "backend/static/profiles/defaultProfileHeader.jpg";

import "./profileheader.scss";

const host = "http://localhost:8000/media/profiles/";

class ProfileHeader extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      avatar: '',
      header: '',
      full_name: '',
      location: {
        city: null,
        country: null
      }
    };
  }

  loadData = () => {
    const token = localStorage.getItem('token');
    const { userId } = this.props;
    const axios = client(token);

    axios
      .post(`api/profiles/${userId}/get_fields`, {
        fields: ['avatar', 'header', 'full_name', 'location']
      })
      .then(res => {
        if (this._isMounted) {
          this.setState({
            ...res.data.data
          });
        }
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.loadData();
    }
  }

  render() {
    const { location, full_name, avatar, header } = this.state;
    const { userId } = this.props;

    return (
      <div className="col col-12">
        <div className="ui-block">
          <div className="top-header">
            <div className="top-header-thumb">
              <img
                src={header? `${host}${header}` : defaultHeader}
                alt="user-header"
              />
            </div>
            <ProfileMenu userId={userId} />
            <div className="top-header-author">
              <Link to={`/user${userId}/timeline`} className="author-thumb">
                <img
                  src={avatar? `${host}/${avatar}` : defaultAvatar}
                  alt="user-img"
                  style={{ height: 124, width: 124 }}
                />
              </Link>
              <div className="author-content">
                <Link to={`/user${userId}/timeline`} className="author-name">
                  <h4>{full_name}</h4>
                </Link>
                <span className="country">
                  {`
                    ${location.city ? location.city.name + ', ': ''}
                    ${location.country ? location.country.name : ''}
                  `}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authentication;
  return {
    currentUser: user
  };
};

export default connect(mapStateToProps)(ProfileHeader);
