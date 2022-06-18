import React from "react";
import { useState, useEffect } from "react";
import { commentService } from "../services/comment.service";
import { userService } from "../services/user.service";
import axios from "axios";

const ListComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `http://localhost:3040/comments`
      );
      setComments(result.data);
      console.log(result.data)
    };
    fetchItems();
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center mt-50 mb-50">

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Recent Comment</h4>
              </div>
              {comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <div className="comment-widgets m-b-20">
                    <div className="d-flex flex-row comment-row">
                      <div className="p-2">
                        <span className="round">
                          <img
                            src="https://i.imgur.com/uIgDDDd.jpg"
                            alt="user"
                            width="50"
                          />
                        </span>
                      </div>
                      <div className="comment-text w-100">
                        <div className="comment-footer">
                          <span className="date">{comment.movie_id}</span>
                          <span className="action-icons">
                            <a href="#" data-abc="true">
                              <i className="fa fa-pencil"></i>
                            </a>
                            <a href="#" data-abc="true">
                              <i className="fa fa-rotate-right"></i>
                            </a>
                            <a href="#" data-abc="true">
                              <i className="fa fa-heart"></i>
                            </a>
                          </span>
                        </div>
                        <p className="m-b-4 m-t-7">{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ListComments;
