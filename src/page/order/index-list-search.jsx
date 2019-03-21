import React from 'react';

class ListSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber : '',
        }
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }

    onSearch(){
        this.props.onSearch(this.state.orderNumber);
    }
    onSearchKeywordKeyup(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }

    render(){
        return(
            <div className="row">
            <div className="col-md-12">
              <div className="form-inline">
              <div className="input-group mb-2 mr-sm-2">
                <select className="form-control">
                  <option>Search by order ID</option>
                </select>
                </div>
                <div className="input-group mb-2 mr-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Order ID"
                    name= "orderNumber"
                    onKeyUp={(e) => this.onSearchKeywordKeyup(e)}
                    onChange={(e) => this.onValueChange(e)}
                  />
                </div>
                <button  
                onClick={(e) => this.onSearch(e)}
                className="btn btn-primary mb-2">
                  Search
                </button>
              </div>
            </div>
          </div>

        )
    }
}

export default ListSearch;