import React, { Component } from 'react';
import { Header, Icon, Grid, Message } from 'semantic-ui-react';
import axios from 'axios';
import sanitizeHTML from 'sanitize-html';

class App extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      results: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.getResults = this.getResults.bind(this);
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
        this.setState({ results: res.data.query.search });
      });
    }

    return '';
  }

  render() {
    var info = this.state.results.map((item) => {
      return (
        <Message key={item.title} divided>
          <Message.Header><h2>{item.title}</h2><a href={`http://en.wikipedia.org/wiki/${item.title}`}>Article</a></Message.Header>
          <Message.List><p>{sanitizeHTML(item.snippet)}</p></Message.List>
        </Message>
      );
    });
    return (
      <div>
        <Grid centered columns={4}>
          <Grid.Column>
              <Header as='h2' icon>
                <Icon name='settings' />
                Wikipedia Search
                <Header.Subheader>
                  Search for an item to get the top 10 results.
                </Header.Subheader>
              </Header>
          </Grid.Column>
        </Grid>
        <Grid centered columns='equal'>
          <Grid.Column width={8}>
              <div className="ui large input">
              <input ref={input => this.inputterm = input} placeholder='Search...' />
              <button className="ui button primary button-"primary large type="submit" onClick={() => this.handleClick()}>
                Search
              </button>
              </div>

          </Grid.Column>
        </Grid>
        <Grid centered columns={5}>
          <Grid.Column>
            <h2>Search Results</h2>
          </Grid.Column>
        </Grid>
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column width={8}>
              {info}
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
    </div>
    );
  }
}

export default App;
