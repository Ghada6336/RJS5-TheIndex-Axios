import React, { Component } from "react";



// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";
import axios from "axios";
class App extends Component {
  state = {
    currentAuthor: null,
    authors:[] ,
    loading: true,

  };
async componentDidMount(){
  try{
    const getting= await axios.get('https://the-index-api.herokuapp.com/api/authors/');
    const authors=getting.data;
    this.setState({
      authors:authors ,
    loading: false,
    });
  
  }
  catch(t){
    console.error(t);

  }


};
 
  selectAuthor = async author => {
    
    try {
      this.setState({ loading :true });
    const getting= await axios.get(
      `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      );
    
    this.setState({
      currentAuthor:getting.data,
      loading: false,
    });
    }
    catch(error){
    console.error(error);
    }
  
};

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
     if  (this.state.loading) {
      return <Loading/>;
    }
    else if  (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return <AuthorList authors={this.state.authors} selectAuthor={this.selectAuthor} />;
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
