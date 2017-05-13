import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router'
import cx from 'classnames';


const styles = require('./Syllabus.scss');

class Syllabus extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <p/>
        {this.props.datasets.map(item => (
          <div className={cx('col-xs-4')}>
            <div className="thumbnail">
              {/*<img src="..." alt="...">*/}
              <div className={cx('caption',item.unavailable && styles.disabled)}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  <Link className={cx('btn btn-default btn-block',item.unavailable && 'disabled')}
                        role="button" to={`syllabus/${item.id}/view`}>
                    View
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  datasets: state.datasets.list,
});

export default connect(mapStateToProps)(Syllabus)
