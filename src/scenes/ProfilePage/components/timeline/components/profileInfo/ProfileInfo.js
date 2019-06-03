import React, { Component } from 'react';
import client from '../../../../../../axiosClient';

import { FaFacebookF, FaTwitter, FaDribbble } from 'react-icons/fa';

import './profileInfo.scss';

const titles = [
    'About Me:',
    'Favorite TV Shows:',
    'Favourite Music Bands/Artists:',
];

const sns = [
    'facebook',
    'twitter',
    'dribbble'
];

class ProfileInfo extends Component {
    _isMounted = false;

    state = {
        introData: {}
    };

    componentDidMount() {
        this._isMounted = true;
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('currentUserId');
        const axios = client(token);

        axios
            .post(`api/profiles/${id}/get_fields`, {
                fields: ['intro']
            })
            .then(res => {
                if (this._isMounted) {
                    const {intro} = res.data.data;
                    const introData = intro ? intro[0] : {};
                    this.setState({
                        introData
                    })
                }
            })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
      const { introData } = this.state;
      let otherSns = false;
      sns.map(item => {
          if (introData.hasOwnProperty(item))
              otherSns = true;
      });

      return (
        <div className="personal-info ui-block">
            <div className="ui-block-title">
                <h5 className="title">Profile Intro</h5>
            </div>
            <div className="ui-block-content">
                <ul className="w-personal-info mb-4">
                    {
                        titles.map(item => {
                            if (introData.hasOwnProperty(item))
                                return (
                                    <li key={item}>
                                        <h6 className="title">{item}</h6>
                                        <p className="text">{introData[item]}</p>
                                    </li>
                                )
                        })
                    }
                </ul>
                <div className="w-socials">
                    {
                        otherSns? <h6 className="title">Other Social Networks: </h6> : ''

                    }
                    {
                        introData.hasOwnProperty('facebook') ?
                            <a href={introData['facebook']} className="social-item bg-facebook">
                                <FaFacebookF className="mr-1"/>
                                {' '}
                                Facebook
                            </a>
                            : ''

                    }
                    {
                        introData.hasOwnProperty('twitter') ?
                            <a href={introData['twitter']} className="social-item bg-twitter">
                                <FaTwitter className="mr-1"/>
                                {' '}
                                Twitter
                            </a>
                            : ''

                    }
                    {
                        introData.hasOwnProperty('dribbble') ?
                            <a href={introData['dribbble']} className="social-item bg-dribbble">
                                <FaDribbble className="mr-1"/>
                                {' '}
                                Dribbble
                            </a>
                            : ''

                    }
                </div>
            </div>
        </div>
      )
    }
}

export default ProfileInfo;
