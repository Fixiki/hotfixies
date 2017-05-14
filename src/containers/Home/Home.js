import React, {Component} from 'react';
import {Link} from 'react-router';
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
          <div className={cx('container', styles.info)}>
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
          <h1>Что мы предлагаем</h1>
          <div className="col-xs-12" style={{marginBottom: 20}}>
            <small>Наберись практического опыта как мы набрались редбулла</small>
          </div>
          <p/>
          <p/>
          <p />
          <p/>
          <p/>
          <div className="col-xs-4 text-center">
            <div><i className="fa fa-balance-scale fa-5x" aria-hidden="true"/></div>
            <h2>Теория подкрепленная задачами</h2>
          </div>
          <div className="col-xs-4 text-center">
            <div><i className="fa fa-bar-chart fa-5x" aria-hidden="true"/></div>
            <h2>Реальные датасеты</h2>
          </div>
          <div className="col-xs-4 text-center">
            <div><i className="fa fa-bullseye fa-5x" aria-hidden="true"/></div>
            <h2>Силлабус, собранный угашеными студиками на хакатоне</h2>
          </div>
        </div>

        <section className={styles.syll}>
          <div className="row">
            <h1 className="text-center">Из чего состоит курс:</h1>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-3">
                <h2>Питон</h2>
                <hr/>
                <h3> - Подборка материалов с лучших источников</h3>
                <h3> - Практические задачи по курсу</h3>
              </div>
              <div className="col-xs-3">
                <h2>Библиотеки для пайтона</h2>
                <hr/>
                <h3> - Numpy, Pandas - манипуляция данными</h3>
                <h3> - Matplotlib - визуализация</h3>
                <h3> - Scipy, Scikit-learn - анализ и обучение моделей</h3>
              </div>
              <div className="col-xs-3">
                <h2>Матан</h2>
                <hr/>
                <h3> - Линейная алгебра</h3>
                <h3> - Высшая математика (для людей)</h3>
                <h3> - Минимальный курс статистики</h3>
              </div>
              <div className="col-xs-3">
                <h2>Глубокое обучение</h2>
                <hr/>
                <h3> - Набор моделей для каждого кейса</h3>
                <h3> - Керас как либа для старта в глубоком обучении</h3>
              </div>
            </div>
          </div>
        </section>


      </div>
    );
  }
}
