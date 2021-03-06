import React, { Component } from 'react';


import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { FaRegNewspaper, FaRegImage } from 'react-icons/fa';
import BlogPost from './components/BlogPost.js';

import './newsfeedForm.scss';

function TabContainer(props) {
  const { children } = props;
  return <Typography component="div">{children}</Typography>;
}

const styles = {
  root: {
    flexGrow: 1
  },
  tabRoot: {
    color: '#888da8',
    '&$tabSelected': {
      color: '#FF5E3A'
    }
  },
  tabsIndicator: {
    backgroundColor: '#FF5E3A'
  },
  tabSelected: {}
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
    const { classes, addPost } = this.props;
    const { value } = this.state;

    return (
      <div className="newsfeed-form ui-block">
        <Paper square className={classes.root}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{
              root: classes.tabRoot,
              indicator: classes.tabsIndicator
            }}
          >
            <Tab
              icon={<FaRegNewspaper />}
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Blog Post"
            />
            <Tab
              icon={<FaRegImage />}
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Multimedia"
            />
          </Tabs>
          {value === 0 && (
            <TabContainer>
              <BlogPost addPost={addPost} />
            </TabContainer>
          )}
          {value === 1 && <TabContainer>to be updated</TabContainer>}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NewsfeedForm);
