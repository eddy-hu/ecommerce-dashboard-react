import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class MyEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
      }
    
      handleChange(value) {
        this.setState({ text: value })
      }
    
      render() {
        return (
          <ReactQuill theme="snow" value={this.state.text}
                      onChange={this.handleChange} />
        )
      }
    }
export default MyEditor;