import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

export default class Editor extends Component {

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      files: [],
    }
  }

  onDrop(files) {
    if(files.length > 1){
      alert('Only one file upload allowed, loading only first file');
    }
    this.setState({ files });
  }

  render() {
    const styles = require('./Editor.scss');
    return (
      <div className={styles.home}>
        <Dropzone accept='.py' multiple={false} onDrop={this.onDrop.bind(this)}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
        <ul>
          {this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)}
        </ul>
      </div>
    );
  }
}
