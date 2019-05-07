import React, { Component } from "react";
import { connect } from "react-redux";

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
      comment: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const { comment } = this.state;
    const { dispatch } = this.props;
    const id = uuidv4();

    dispatch(commentActions.addComment({ comment, id }));
    this.setState({
      comment: ""
    });
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({
      comment: value
    });
  }

  render() {
    const { classes, loading } = this.props;
    const { comment } = this.state;

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
            value={comment}
            onChange={this.handleChange}
          />
        </div>
        <Button className="send-btn mt-2" disabled={!comment || loading}>
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
