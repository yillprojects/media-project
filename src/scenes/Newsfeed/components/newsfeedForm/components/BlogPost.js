import React, { Component } from "react";

import _map from "lodash/map";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "reactstrap";

import { withStyles } from "@material-ui/core/styles";

import { FiCamera } from "react-icons/fi";
import { FaDesktop, FaMapMarkerAlt } from "react-icons/fa";

import {arrowGenerator, styles} from 'config/tooltipConfig.js';

import "./blogpost.scss";

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:hover:not($disabled):after": {
          borderBottomColor: "#FF5E3A"
        },

        "&:after": {
          borderBottomColor: "#FF5E3A"
        },

        "&:hover:not($disabled):not($error):not($focused):before": {
          borderBottom: "1.5px solid #FF5E3A"
        },
        "&:before": {
          borderBottomWidth: "0.5px"
        }
      }
    }
  }
});


const btn = [
  {
    id: 1,
    tooltip: "ADD PHOTOS",
    icon: <FiCamera />
  },
  {
    id: 2,
    tooltip: "TAG YOUR FRIENDS",
    icon: <FaDesktop />
  },
  {
    id: 3,
    tooltip: "ADD LOCATION",
    icon: <FaMapMarkerAlt />
  }
];

class BlogPost extends Component {
  state = {
    arrowRef: null
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className="blogpost-form mt-1">
        <div className="author-thumb">
          <img
            src="https://via.placeholder.com/35"
            alt="user-img"
            style={{ height: 35, width: 35 }}
          />
        </div>
        <MuiThemeProvider theme={theme}>
          <TextField
            id="mui-theme-provider-standard-input"
            label="Share what you are thinking here..."
            multiline={true}
            rows={8}
            rowsMax={8}
            fullWidth
          />
        </MuiThemeProvider>
        <div className="add-option-message">
          <div className="options-message">
            {_map(btn, item => {
              return (
                <Tooltip
                  key={item.id}
                  placement="top"
                  title={
                    <React.Fragment>
                      {item.tooltip}
                      <span
                        className={classes.arrow}
                        ref={this.handleArrowRef}
                      />
                    </React.Fragment>
                  }
                  classes={{ popper: classes.arrowPopper }}
                  PopperProps={{
                    popperOptions: {
                      modifiers: {
                        arrow: {
                          enabled: Boolean(this.state.arrowRef),
                          element: this.state.arrowRef
                        }
                      }
                    }
                  }}
                >
                  <button type="button" className="btn transparent-btn">
                    {item.icon}
                  </button>
                </Tooltip>
              );
            })}
          </div>
          <Button className="send-btn">Post Status</Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(BlogPost);
