import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import "./HeaderTitle.css";

const HeaderTitle = () => (
  <Grid centered columns={4}>
    <Grid.Row mobile={16} computer={16}>
      <div className="headerWrapper">
        <Icon
          name="list ol"
          className="headerIcon"
          style={{ color: "purple", fontSize: "50px" }}
        />
        <div className="headerTitleWrapper">
          <h1 className="headerTitle">Wikipedia Search</h1>
          <div className="headerSubtitle">
            <h2 style={{ color: "purple" }}>
              Search for an item to get the top 10 results.
            </h2>
          </div>
        </div>
      </div>
    </Grid.Row>
  </Grid>
);

export default HeaderTitle;
