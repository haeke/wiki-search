import React from 'react';
import sanitizeHTML from 'sanitize-html';
import { Message } from 'semantic-ui-react';

//This component is used to print the resulting articles or show that there were no results
const Articles = ({ results }) => {
    //conditionally render either No Articles Found or the Articles data
    var info = results.length === 0 ?  (
      <Message>
        <Message.Header>No Articles Found</Message.Header>
        <Message.List>Try searching for a different term.</Message.List>
      </Message>
    ) :
    results.map((item) => {
      return (
        <Message key={item.title}>
          <Message.Header><h2>{item.title}</h2><a href={`http://en.wikipedia.org/wiki/${item.title}`}>Article</a></Message.Header>
          <Message.List><p>{sanitizeHTML(item.snippet)}</p></Message.List>
        </Message>
      );
    });
    return (
      <div>
        {info}
      </div>
    );
  };

export default Articles;
