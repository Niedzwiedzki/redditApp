import React from 'react';
import {ReactComponent as RedditLogo} from '../../icons/reddit-logo.svg';
import {ReactComponent as CloseIcon} from '../../icons/close.svg';

const SelectedPost = props => {

  //Selected post displayed
  if(props.selected){
    return (
      <div className="selectedPost" id="selectedPost" onClick={props.close}>
        <div className="selectedPost__container">
          <div className="selectedPost__header">
              <div><CloseIcon className="selectedPost__close" id="selectedPost__close"/></div>
              <h2 className="selectedPost__title">{props.title}</h2>
              <a target="blank" href={"https://www.reddit.com" + props.link}><RedditLogo className="selectedPost__icon"/></a>
          </div>
          <div className="selectedPost__content"><img className="selectedPost__image" src={props.src} alt=""/></div>
          <div className="selectedPost__footer">
              <a className="selectedPost__link" target="blank" href={"https://www.reddit.com/r/" + props.subreddit}><p >subreddit: {props.subreddit}</p></a>
              <a className="selectedPost__link" target="blank" href={"https://www.reddit.com/user/" + props.author}><p>author: {props.author}</p></a>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default SelectedPost;
