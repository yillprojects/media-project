import React, { Component } from 'react';
import axios from 'axios';

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
    state = {
        introData: {}
    };

    componentDidMount() {
        const currentUser = localStorage.getItem('currentUser');
        axios
            .post('http://localhost:8000/api/profiles/intro/', {
                username: currentUser
            })
            .then(res => {
                const { intro } = res.data.data;
                const introData = intro? intro[0] : {};
                this.setState({
                    introData
                })
            });
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
                            console.log(introData);
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
