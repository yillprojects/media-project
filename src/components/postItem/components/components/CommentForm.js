import React, { Component } from "react";
import { connect } from "react-redux";
import client from "../../../../axiosClient";

import { commentActions } from "redux/actions/index.js";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "reactstrap";


import defaultAvatar from "backend/static/profiles/defaultProfileAvatar.jpg";
import "./commentForm.scss";

import commentTypes from '../constants';


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
  _isMounted = false;

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      text: "",
      avatar: null
    };
  }

  componentDidMount() {
    this._isMounted = true;

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("currentUserId");
    const axios = client(token);

    axios
      .post(`api/profiles/${id}/get_fields`, { fields: ["avatar"] })
      .then(res => {
        if (this._isMounted) {
          const { avatar } = res.data.data;

          this.setState({
            avatar: avatar
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit(event) {
    event.preventDefault();

    const { text } = this.state;
    const { id, type  } = this.props;
    const token = localStorage.getItem("token");
    const axios = client(token);

    if (type === commentTypes.COMMENT) {
      const { addComment } = this.props;

      axios
      .post(`api/posts/${id}/add_comment`, {
        text
      })
      .then(res => addComment(res.data.data));
    } else {
      const { addReply } = this.props;

      axios
      .post(`api/comments/${id}/add_reply`, {
        text
      })
      .then(res => addReply(res.data.data));
    }

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
    const { classes, loading, type } = this.props;
    const { text, avatar } = this.state;

    return (
      <form className="comment-form form" onSubmit={this.handleSubmit}>
        <div className="post-author">
          <img
            src={
              avatar
                ? `http://localhost:8000/media/profiles/${avatar}`
                : defaultAvatar
            }
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
          { type === commentTypes.COMMENT? "Post Comment" : "Add Reply" }
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
