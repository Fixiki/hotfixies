import React, { Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import config from '../../config';
import Helmet from 'react-helmet';


export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className={cx('container',styles.info)}>
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>Data Science School</h1>

            <h2>Become a data scientist much easier</h2>
            <p>
              <button type="button" className="btn btn-primary btn-lg">Enroll now</button>
            </p>
          </div>
        </div>

        <div className="container">
          Boilerplate
        </div>
      </div>
    );
  }
}
