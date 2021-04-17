import React, {useEffect, useState} from 'react';
import axios from 'axios';
import noImage from '../../images/noimage.jpg';
import {ReactComponent as RedditLogo} from '../../icons/reddit-logo.svg';
import SelectedPost from '../SelectedPost/SelectedPost';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import FooterPagination from '../elements/footerPagination/FooterPagination';
import Spinner from '../elements/spinner/Spinner';
import Alert from '../elements/alert/Alert';


const PostsCollection = props => {

    const [posts, setPosts] = useState([]);
    const [marginPost, setMarginPost] = useState({});
    const [selected, setSelected] = useState(false);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);


    //whenever new subreddit is selected, post are fetched
    useEffect(() => {
        if(props.subreddit){
          request(true)
        }
      }, [props.subreddit]);


      //function that fetches pst from reddit api
      function request (newSubreddit, apiDetails='', direction) {
        setPosts([]);
        setLoading(true);
        axios.get(`https://www.reddit.com/${props.subreddit}.json?limit=10${apiDetails}`)
        .then(function (response) {
        let posts = response.data.data.children.filter(post => {
          return !post.data.stickied
        });

        setPosts(posts);
        setAlert(false);
        if (newSubreddit){
          setIndex(0)
        }
        //setting the selected subreddit in local storage
        localStorage.setItem("subreddit", props.subreddit)
        let firstChildren = posts[0]
        let lastChildren = posts[posts.length -1]
        setMarginPost({first: firstChildren.kind + "_" + firstChildren.data.id ,last: lastChildren.kind + "_" + lastChildren.data.id});
        //pagination: incrementing or decrmenting value
        if(direction==="newer"){
          setIndex(index-1)
        } else if(direction==="older") {
          setIndex(index+1)
        }
        })
        .catch(function (error) {
          console.log(error);
          setAlert(true);
          setPosts([])
        })
        .then(function () {
          setLoading(false)
        });  
      }

      //displaying full post
      function display (title, link, src, subreddit, author) {
          setSelected({title, link, src, subreddit, author})
          disableBodyScroll(document.querySelector('body'))
      }

      //closing full post
      function close (e){
        if(["selectedPost", "selectedPost__close", "selectedPost__path"].includes(e.target.id) ){
            setSelected(false)
            enableBodyScroll(document.querySelector('body'))
        }
      }

      //fetching subsequent post
      function next (){
        request(false, '&after='+ marginPost.last, "older");
      }

      //fetching previous post
      function previous (){
        request(false, '&before='+ marginPost.first, "newer");
    }
  
  return (
    <React.Fragment>
        <div className="app__box">
            {posts.map(post => {
                let src = null;
                if(post.data.thumbnail.match(/.*\.jpg/g)){
                src=post.data.thumbnail
                } else {
                    src=noImage
                }
                let title = post.data.title.length > 40 ? post.data.title.substring(0, 40) + "..." : post.data.title

                return( 
                <div key={post.data.id} className="post" onClick={() => display(post.data.title, post.data.permalink, src, post.data.subreddit, post.data.author)}>
                    <div className="post__header">
                        <h2 className="post__title">{title}</h2>
                        <a target="blank" href={"https://www.reddit.com" + post.data.permalink}><RedditLogo className="post__icon"/></a>
                    </div>
                    <div><img className="post__image" src={src} alt=""/></div>
                    <div className="post__footer">
                        <p className="post__blog">subreddit: {post.data.subreddit}</p>
                        <p className="post__author">author: {post.data.author}</p>
                    </div>
                </div>
                )
            })

            }
            <Spinner loading={loading} />
            <SelectedPost 
              title={selected.title} 
              link={selected.link} 
              src={selected.src} 
              subreddit={selected.subreddit} 
              author={selected.author} 
              close={(e) => close(e)}
              selected={selected}
              />
              <Alert show={alert} text="POSTS NOT FOUND" />
        </div>
        <FooterPagination next={next} previous={previous} index={index} posts={posts.length}/>
    </React.Fragment>
  );
};

export default PostsCollection;
