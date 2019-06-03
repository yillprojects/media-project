import React, { Component } from "react";
import { connect } from "react-redux";
import client from '../../../../axiosClient';

import { commentActions } from "redux/actions/index.js";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "reactstrap";

import uuidv4 from "uuid/v4";

import "./commentForm.scss";

const styles = theme => ({
  cssFocused: {},
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: "#FF5E3A",
      borderWidth: "1.5px"
    }
  },
  notchedOutline: {}
});

class CommentFormConnected extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      text: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const { text } = this.state;
    const { addComment, post } = this.props;

    const token = localStorage.getItem('token');
    const axios = client(token);

    axios.post(`api/posts/${post}/add_comment`, {
        post_id: post,
        author: localStorage.getItem('currentUser'),
        text
    }).then(res => addComment(res.data.data));

    this.setState({
      text: ""
    });
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({
      text: value
    });
  }

  render() {
    const { classes, loading } = this.props;
    const { text } = this.state;

    return (
      <form className="comment-form form" onSubmit={this.handleSubmit}>
        <div className="post-author">
          <img
            src="https://via.placeholder.com/28"
            alt="user-img"
            style={{ height: 28, width: 28 }}
          />
          <TextField
            className="comment-textarea"
            id="mui-theme-provider-standard-input"
            variant="outlined"
            multiline
            rows={2}
            rowsMax={4}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              }
            }}
            value={text}
            onChange={this.handleChange}
          />
        </div>
        <Button className="send-btn mt-2" disabled={!text || loading}>
          Post Comment
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { loading } = state.comment;

  return {
    loading
  };
};

CommentFormConnected = withStyles(styles)(CommentFormConnected);
const CommentForm = connect(mapStateToProps)(CommentFormConnected);

export default CommentForm;
