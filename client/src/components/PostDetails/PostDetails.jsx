import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;


  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper} >
        <CircularProgress size="5em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2" color = 'secondary'>{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="h6" color = 'secondary'>Author  : {post.name}</Typography>
          <Typography variant="body1" color = 'textSecondary' component="h2">Posted at: [ {moment(post.createdAt).fromNow()} ] </Typography>
          <Typography variant="h6" color='secondary'>Content : </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>

      </div>
    </Paper>
  );
};

export default Post;
