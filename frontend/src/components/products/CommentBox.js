import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getnewTk } from "../../redux/features/user/tokenSlide";

function CommentBox(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [commentText, setCommentText] = useState("");
  const user = useSelector((state) => state.user);
  const [login, setLogin] = useState(user.login);
  const { id } = useParams();
  const accessTk = useSelector((state) => state.token.accessTk);
  const { setFeedbacks } = props;

  async function submit() {
    //   console.log(feedback);
    try {
      const rep = await axios.put(
        `/api/books/addNewFeedback/${id}`,
        {
          customerid: user.user.user_info._id,
          rate: value,
          text: commentText,
        },
        {
          headers: {
            token: accessTk,
          },
        }
      );
      // console.log("day la: ",rep.data.updatedBook.feedbacks)
      console.log("day la: ", rep.data);
      setCommentText("");
      setValue(1);
      setFeedbacks(rep.data.feedbacks);
    } catch (err) {
      const newToken = await dispatch(getnewTk());

      // Use the new token in the PUT request
      try {
        const rep = await axios.put(
          `/api/books/addNewFeedback/${id}`,
          {
            customerid: user.user.user_info._id,
            rate: value,
            text: commentText,
          },
          {
            headers: {
              token: newToken, // Use the awaited token here
            },
          }
        );

        // Update the state with the new feedbacks
        console.log("day la: ", rep.data);
        setCommentText("");
        setValue(1);
        setFeedbacks(rep.data.feedbacks);
      } catch (err) {
        console.error(err);
      }
    }
    // Here you can add logic to send the comment to a server if needed
  }

  return (
    <div>
      {!login && (
        <TextField
          id="filled-multiline-static"
          label="Nhận xét"
          multiline
          rows={4}
          variant="filled"
          fullWidth
          inputProps={{ readOnly: true }}
          value={"Đăng nhập để viết nhận xét"}
          style={{ backgroundColor: "white" }}
        />
      )}
      {login && (
        <div>
          <Typography component="legend">Đánh giá</Typography>
          <Rating
            color="yellow"
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <div>
            <TextField
              id="filled-multiline-static"
              label="Nhận xét"
              multiline
              rows={4}
              variant="filled"
              fullWidth
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
            />
          </div>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={submit}>
              Submit
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
}

export default CommentBox;
