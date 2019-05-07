import React, { Component } from 'react';
import _map from 'lodash/map';

import PageItem from 'components/favouritePages/PageItem.js';

import PageImg from '../../../../img/35.png';
import './favouritePages.scss';

const data = [
  {
    id: 1,
    img: PageImg,
    title: 'The Marina Bar',
    type: 'Restaurant / Bar'
  },
  {
    id: 2,
    img: PageImg,
    title: 'Tapronus Rock',
    type: 'Rock Band'
  },
  {
    id: 3,
    img: PageImg,
    title: 'Pixel Digital Design',
    type: 'Company'
  }
];

export default class FavouritePages extends Component {
  render() {
    return (
      <div className="ui-block">
        <div className="ui-block-title">
          <h5 className="title">Favourite Pages</h5>
        </div>
        <ul className="widget w-favourite-pages">
          {_map(data, item => (
            <li key={item.id}>
              <PageItem data={item} added />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
