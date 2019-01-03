import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import ReactToolTip from "react-tooltip";

//This component is responsible for updating what a user searches for.
class SearchBar extends Component {
  //store the term in state
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
  }

  onInputChange(term) {
    this.setState({
      term: term
    });
    //pass the term searched for to the app component so that we can query the Wikipedia API
    this.props.handleSearch(term);
  }
  render() {
    return (
      <Grid centered columns="equal">
        <Grid.Row mobile={16} computer={16}>
          <Grid.Column computer={8} tablet={16} mobile={16}>
            <div className="ui input">
              <input
                className="ui input"
                placeholder="Search..."
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)}
                data-tip
                data-for="cusSearch"
              />
              <Grid.Column width={4}>
                <ReactToolTip place="top" id="cusSearch" type="info">
                  <span>
                    Enter a search term, then press enter or click on the submit
                    button
                  </span>
                </ReactToolTip>
              </Grid.Column>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  handleSearch: undefined
};

export default SearchBar;
