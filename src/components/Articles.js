import React from "react";
import sanitizeHTML from "sanitize-html";
import { Grid, Message } from "semantic-ui-react";

//This component is used to print the resulting articles or show that there were no results
const Articles = ({ results }) => {
  //conditionally render either No Articles Found or the Articles data
  var info =
    results.length === 0 ? (
      <Message>
        <Message.Header>No Articles Found</Message.Header>
        <Message.List>Try searching for a different term.</Message.List>
      </Message>
    ) : (
      results.map(item => {
        return (
          <Message key={item.title}>
            <Message.Header>
              <a
                href={`http://en.wikipedia.org/wiki/${item.title}`}
                target="_blank"
              >
                {" "}
                <h1 className="articleHeader">{item.title}</h1>
              </a>
            </Message.Header>
            <hr className="articleRuler" />
            <Message.List>
              <p className="articleDescription">{sanitizeHTML(item.snippet)}</p>
            </Message.List>
          </Message>
        );
      })
    );
  return (
    <React.Fragment>
      <Grid centered columns={10}>
        <h2>Search Results</h2>
      </Grid>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column />
          <Grid.Column computer={8} tablet={16} mobile={16}>
            <div>{info}</div>
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default Articles;
