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

            <h2>Learn. Do. Earn.</h2>
            <p>
              <button type="button" className="btn btn-primary btn-lg">Enroll now</button>
            </p>
          </div>
        </div>

        <div className="container">
          <h1>Some awesome header</h1>
          <div className="col-xs-12">Some awesome subheader and cool cal to action</div>
          <p/>
          <p/>
          <p/>
          <p/>
          <p/>
          <div className="col-xs-4 text-center">
            <div><i className="fa fa-user fa-5x" aria-hidden="true" /></div>
            WHY WE ARE COOL #1
          </div>
          <div className="col-xs-4 text-center">
            <div><i className="fa fa-user fa-5x" aria-hidden="true" /></div>
            WHY WE ARE COOL #2
          </div>
          <div className="col-xs-4 text-center">
            <div><i className="fa fa-user fa-5x" aria-hidden="true" /></div>
            WHY WE ARE COOL #3
          </div>
        </div>
      </div>
    );
  }
}
