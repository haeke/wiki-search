import React from "react";
import { Grid, Header, Icon } from "semantic-ui-react";

const HeaderTitle = () => (
  <Grid centered columns={4}>
    <Grid.Row mobile={16} computer={16}>
      <Header as="h2" icon>
        <Icon name="settings" />
        Wikipedia Search
        <Header.Subheader>
          Search for an item to get the top 10 results.
        </Header.Subheader>
      </Header>
    </Grid.Row>
  </Grid>
);

export default HeaderTitle;
