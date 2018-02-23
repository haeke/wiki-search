import React, { Component } from 'react';
import { Header, Icon, Grid } from 'semantic-ui-react';
import axios from 'axios';
import ReactToolTip from 'react-tooltip';
import Articles from './Articles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      results: [],
    };

    this.handleEnter = this.handleEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentDidMount() {
    //if there are items in localStorage get them or just render an empty array
    const results = JSON.parse(localStorage.getItem('search')) || [];

    //setState only if there are items in the result after initial mount
    if (results.length > 0) {
      this.setState({
        results: results,
      });
    }
  }

  handleEnter(event) {
    //use event delegation to listen for when the enter key is press
    if (event.charCode === 13) {
      this.handleClick();
    }
  }

  handleClick() {
    console.log('search term is: ' + this.inputterm.value);
    this.setState({
      term: this.inputterm.value,
    });
    this.getResults(this.inputterm.value);
  }

  //https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=${this.props.term}&prop=info&inprop=url&utf8=&format=json
  getResults(event) {
    if (event !== '') {
      axios.get(`https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=${event}&prop=info&inprop=url&utf8=&format=json`).then((res) => {
        console.log(res.data.query.search);
        //set local storage
        localStorage.setItem('search', JSON.stringify(res.data.query.search));
        this.setState({ results: res.data.query.search });
      });
    }

    return '';
  }

  render() {
    return (
      <div className="container">
        <Grid centered columns={4}>
          <Grid.Row mobile={16} computer={16}>
                <Header as='h2' icon>
                  <Icon name='settings' />
                  Wikipedia Search
                  <Header.Subheader>
                    Search for an item to get the top 10 results.
                  </Header.Subheader>
                </Header>
          </Grid.Row>
        </Grid>
        <Grid centered columns='equal'>
          <Grid.Row mobile={16} computer={16}>
            <Grid.Column computer={8} tablet={16} mobile={16}>
                <div className="ui input">
                <input ref={input => this.inputterm = input} placeholder='Search...' onKeyPress={this.handleEnter} data-tip data-for='cusSearch'/>
                <Grid.Column width={4}>
                  <ReactToolTip place="top" id='cusSearch' type='info'>
                    <span>Enter a search term, then press enter or click on the submit button</span>
                  </ReactToolTip>
                </Grid.Column>
                <button className="ui button primary" type="submit" onClick={() => this.handleClick()}>
                  Search
                </button>
                </div>
            </Grid.Column>
        </Grid.Row>
        </Grid>
        <Grid centered columns={6}>
            <h2>Search Results</h2>
        </Grid>
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <Articles results={this.state.results}/>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
    </div>
    );
  }
}

export default App;
