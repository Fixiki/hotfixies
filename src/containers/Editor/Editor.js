import React, { Component } from 'react'
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'

class Editor extends Component {

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      files: [],
    }
  }

  onDrop(files) {
    if (files.length > 1) {
      alert('Only one file upload allowed, loading only first file');
    }
    this.setState({ files });
  }

  onSubmit() {
    let data = new FormData();
    data.append('file', this.state.files[0]);
    fetch('http://localhost:3030/file', {
      method: 'POST',
      body: data,
      mode: 'no-cors'
    })
  }

  render() {
    const styles = require('./Editor.scss');
    const alert = this.props.status;
    return (
      <div className="container">

        {alert.display &&
        <div className={`col-xs-12 alert alert-${alert.level}`} role="alert">
          <strong>{alert.status} !!!</strong>
          {alert.message}
        </div>
        }
        <div className={styles.dropzone}>
          <Dropzone accept='.py' multiple={false} onDrop={this.onDrop.bind(this)}>
            <p>Drop your file here</p>
          </Dropzone>
        </div>
        {this.state.files.length > 0 &&
        <div>
          <p/>
          Selected file:
          <ul>{this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)}</ul>
        </div>}
        <p/>
        <p>
          <button onClick={this.onSubmit.bind(this)} type="button" className="btn btn-primary btn-lg btn-block">
            Submit
          </button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.processing,
});

export default connect(mapStateToProps)(Editor)
