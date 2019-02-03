import React, { Component } from "react";
import HeaderTitle from "./HeaderTitle";
import Articles from "./Articles";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

import { getSearch } from "../api/wikipedia";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      results: []
    };
  }

  componentDidMount() {
    //if there are items in localStorage get them or just render an empty array
    const results = JSON.parse(localStorage.getItem("search")) || [];

    //setState only if there are items in the result after initial mount
    if (results.length > 0) {
      this.setState({
        results: results
      });
    }
  }

  handleEnter = event => {
    //use event delegation to listen for when the enter key is press
    if (event.charCode === 13) {
      this.handleClick();
    }
  };

  handleClick = () => {
    this.setState({
      term: this.inputterm.value
    });
    this.getResults(this.inputterm.value);
  };

  //https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=${this.props.term}&prop=info&inprop=url&utf8=&format=json
  getResults = event => {
    if (event !== "") {
      getSearch(event).then(res => {
        //set local storage
        localStorage.setItem("search", JSON.stringify(res.data.query.search));
        this.setState({ results: res.data.query.search });
      });
    }

    return true;
  };

  render() {
    return (
      <React.Fragment>
        <div className="headerWrapper">
          <HeaderTitle />
        </div>
        <main className="mainWrapper">
          <SearchBar
            handleSearch={this.getResults}
            data-tip
            data-for="cusSearch"
          />
          <Articles results={this.state.results} />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
