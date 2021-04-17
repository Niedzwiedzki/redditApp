

import React, {useState, useEffect} from 'react';
import Header from './UI/dashboard/Header'
import PostsCollection from './UI/dashboard/PostsCollection'


function App() {

  const [selection, setSelection] = useState(false);
  const [subreddit, setSubreddit] = useState("");

  useEffect(() => {

    // get the name of the last selected subreddit from local storage. 
    // If there is no item: default subreddit selected
    if(localStorage.getItem("subreddit")){
      setSubreddit(localStorage.getItem("subreddit"))
    } else {
      setSubreddit("/r/2meirl4meirl")
    }
  },[])

  //display available subreddits
  function showOption (){
    setSelection(true)
  }

  //hide available subreddits
  function hideOption (e){
    if(e.target.id !== "subreddits"){
      setSelection(false)
    }
  }

  //subreddit selection by click
  function fetch (e){
    setSubreddit(e.target.id)
  }

  //subreddit selection by enter
  function submit (e, inputValue){
    e.preventDefault();
    setSubreddit("/r/" + inputValue)
  }

  return (
    <div className="app" onClick={hideOption}>
      <Header showOption={showOption} selection={selection} fetch={fetch} submit={(e, inputValue) => submit(e, inputValue)}/>
      <a className="title" target="blank" href={`https://www.reddit.com${subreddit}`}><h1 >{subreddit.replace("/r/", '').replace("/",'')}</h1></a>
      <PostsCollection subreddit={subreddit}/>
    </div>
  );
}

export default App;
