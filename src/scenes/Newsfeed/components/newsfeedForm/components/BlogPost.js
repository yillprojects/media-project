import React, { Component } from "react";
import { connect } from "react-redux";
import client from "../../../../../axiosClient";

import _map from "lodash/map";

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "reactstrap";

import { FiCamera } from "react-icons/fi";
import { FaDesktop, FaMapMarkerAlt } from "react-icons/fa";

import { styles } from "config/tooltipConfig.js";

import "./blogpost.scss";

import defaultAvatar from "../../../../../backend/static/profiles/defaultProfileAvatar.jpg";

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
  constructor(props) {
    super(props);

    this.state = {
      arrowRef: null,
      text: ""
    };

    this.handleArrowRef = this.handleArrowRef.bind(this);
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { text } = this.state;
    const { addPost } = this.props;
    const token = localStorage.getItem("token");
    const axios = client(token);

    if (text !== "") {
      axios
        .post("api/posts/add", {
          text
        })
        .then(res => {
          console.log(res.data.data)
          addPost(res.data.data)});
      this.setState({
        text: ""
      });
    }
  };

  handleArrowRef(node) {
    this.setState({
      arrowRef: node
    });
  }

  render() {
    const { classes } = this.props;
    const { arrowRef, text } = this.state;

    return (
      <form className="blogpost-form form mt-1" onSubmit={this.handleSubmit}>
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
            multiline
            rows={8}
            rowsMax={8}
            fullWidth
            onChange={this.handleChange}
            value={text}
          />
        </MuiThemeProvider>
        <div className="add-option-message">
          <div className="options-message">
            {_map(btn, item => (
              <Tooltip
                key={item.id}
                placement="top"
                title={
                  <React.Fragment>
                    {item.tooltip}
                    <span className={classes.arrow} ref={this.handleArrowRef} />
                  </React.Fragment>
                }
                classes={{ popper: classes.arrowPopper }}
                PopperProps={{
                  popperOptions: {
                    modifiers: {
                      arrow: {
                        enabled: Boolean(arrowRef),
                        element: arrowRef
                      }
                    }
                  }
                }}
              >
                <button type="button" className="btn transparent-btn">
                  {item.icon}
                </button>
              </Tooltip>
            ))}
          </div>
          <Button className="send-btn">Post</Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authentication;
  return {
    currentUser: user
  };
};

export default connect(mapStateToProps)(withStyles(styles)(BlogPost));
