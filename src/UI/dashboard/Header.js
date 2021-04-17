import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ReactComponent as RedditLogo} from '../../icons/reddit-logo.svg';
import {ReactComponent as RedditText} from '../../icons/reddit-text.svg';
import Options from '../elements/options/Options'

const Header = props => {

  const [options, setOptions] = useState([]);
  const [inputValue, setinputValue] = useState('');


  //fetching popular subreddits for selection
  useEffect(() => {
    populateSubreddits()
  }, []);

  //getting either post popular subreddits or subreddit searched by client
  function populateSubreddits (selection="subreddits/popular.json") {
    console.log("Miłosz Pajeski")
    axios.get(`https://www.reddit.com/${selection}`)
    .then(function (response) {
    setOptions(response.data.data.children)
    })
    .catch(function (error) {
    console.log(error);
    })
  }


  //fetching new subreddits for selection in each client key stroke
  function updateValue(e){
    setinputValue(e.target.value)
    let request = `api/subreddit_autocomplete_v2.json?query=${inputValue}&raw_json=1&gilding_detail=1`
    populateSubreddits(request)
  }


  return (
    <header className="header">
      <div>
        <RedditLogo className="header__logo"/>
      </div>
      <div className="header__search">
        <form className="form" onSubmit={(e) => props.submit(e, inputValue)}>
          <div className="form__container">
          <label htmlFor="subreddits">
          <input placeholder="search" autoComplete="off" className="form__input" type="text" id="subreddits" onFocus={props.showOption} value={inputValue} onChange={updateValue}/>
          </label>
            <Options options={options} show={props.selection} fetch={props.fetch} />
          </div>
        </form>
      </div>
      <div>
        <RedditText className="header__text"/>
      </div>
    </header>
  );
};

export default Header;
