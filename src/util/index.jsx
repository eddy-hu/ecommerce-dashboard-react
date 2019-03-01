import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Util extends React.Component{
    constructor(props) {
        super(props);
    }
    
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type : param.type || 'get',
                url : param.url || '',
                dataType : param.dataType || 'json',
                data : param.data || null,
                success : res => {

                    console.log(res);
                    // request success
                    if(res.status === 0){
                        typeof resolve === 'function' && resolve(res.data,res.msg);

                    }else if(res.status === 10){ //didn't login

                       this.doLogin();
                    }else{
                        typeof reject === 'function' && reject(res.masg || res.data);
                    }
                },
                error : err=> {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
      
    }


    //redirect to login page
    //encodeURIComponent(window.location.pathname)
    doLogin(){
        console.log('do login');
      
       window.location.href = './login?redirect='+ encodeURIComponent(window.location.pathname);
    }
    //get URL  params
    getUrlParam(name){
        // xxxx.com?param=123&param1=456
        let querySrting =  window.location.search.split('?')[1] || '';
        // param=123&param1=456
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = querySrting.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // error tips
    errorTips(errMsg){
        alert(errMsg || 'Invalid username or password');
    }

    successTips(successMsg){
        alert(successMsg || 'Success');
    }

    setStorage(name, data){
        let dataType = typeof data;
        //json type
        if(dataType === 'object'){
            window.localStorage.setItem(name,JSON.stringify(data));
        }else if(['number', 'string', 'boolean'].indexOf(dataType) >=0){
            window.localStorage.setItem(name,data);
        }else{
            alert('cannot store this type data');
        }
    }
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }else{
            return '';
        }
    }

    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}


export default Util;