import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import BlogPost from "./components/BlogPost.js";

import { FaRegNewspaper, FaRegImage } from "react-icons/fa";
import "./newsfeedForm.scss";

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

const styles = {
  root: {
    flexGrow: 1
  },
  tabsRoot: {
    borderBottom: "1px solid #FF5E3A"
  }
};

class NewsfeedForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: 0
    };
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="newsfeed-form ui-block">
        <Paper square className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              icon={<FaRegNewspaper />}
              classes={{ root: classes.tabRoot }}
              label="Blog Post"
            />
            <Tab
              icon={<FaRegImage />}
              classes={{ root: classes.tabRoot }}
              label="Multimedia"
            />
          </Tabs>
          {value === 0 && (
            <TabContainer>
              <BlogPost />
            </TabContainer>
          )}
          {value === 1 && <TabContainer>to be updated</TabContainer>}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NewsfeedForm);
