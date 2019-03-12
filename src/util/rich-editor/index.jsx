import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class MyEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { detail: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
      }
    
      handleChange(value) {
        this.setState({ text: value })
      }

      componentWillReceiveProps(nextProps){
          if(this.props.defaultDetail !== nextProps.defaultDetail)
              this.setState({
             detail: nextProps.defaultDetail,
              })

      }
    
      render() {
        return (
          <ReactQuill theme="snow" value={this.state.detail}
                      onChange={this.handleChange} />
        )
      }
    }
export default MyEditor;