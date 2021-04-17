import React from 'react';


const FooterPagination = props => {
  

  //disabling buttons in csome conditions (no more recent posts or the end of posts list)
  let newerClass = props.index === 0 ? "footerPagination__button--disabled" : "footerPagination__button--previous";
  let disabledNewer = props.index === 0 ? true : false;

  let olderClass = props.posts < 10 ? "footerPagination__button--disabled" : "footerPagination__button--next";
  let disabledOlder = props.posts < 10 ? true : false

  return (
    <div className="footerPagination">
      <button className={"footerPagination__button " + newerClass } disabled={disabledNewer} onClick={props.previous}>newer</button>
      <button className={"footerPagination__button " + olderClass} disabled={disabledOlder} onClick={props.next}>older</button>
    </div>
  );
}

export default FooterPagination;