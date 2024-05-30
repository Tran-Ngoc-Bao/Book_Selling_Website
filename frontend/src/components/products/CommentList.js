import React from "react";
import { useParams } from "react-router-dom";
import styles from "./CommentList.module.css";

function CommentList({ feedback }) {
  const { id } = useParams();

  return (
    <div>
      {feedback &&
        feedback.map((comment) => (
          <div key={comment._id} className={styles.commentBox}>
            <p className={styles.commentHeader}>Người dùng: {comment.customerid}</p>
            <p className={styles.commentRate}>Đánh giá {comment.rate}/5</p>
            <p className={styles.commentText}>{comment.text}</p>
          </div>
        ))}
    </div>
  );
}

export default CommentList;
