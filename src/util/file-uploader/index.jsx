import FileUpload from './FileUpload';
import React, { Component } from 'react';

class FileUploader extends Component{
render(){
	/*set properties*/
	const options={
        baseUrl:'"http://admintest.happymmall.com/manage/product/upload.do"',
        fileFieldName: 'upload_file',
        dataType: 'json',
        chooseAndUpload : true,
        uploadSuccess: (res) => {
            this.props.onSuccess(res.data);
        },
        uploadError: (err) => {
            this.props.onError(err.message || 'Upload file failed');
        },
	}
	/*Use FileUpload with options*/
	/*Set two dom with ref*/
	return (
		<FileUpload options={options}>
			<button ref="chooseAndUpload" className="btn btn-xs btn-primary">Choose</button>
		</FileUpload>
	)	        
}

}

export default FileUploader;