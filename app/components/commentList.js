import React, { useState } from 'react';

const commentList = () => {
  const [isLineView, setIsLineView] = useState(true); // State to toggle between line and grid view

  const toggleView = () => {
    setIsLineView(!isLineView); // Toggle the view
  };

  return (
    <>
        <a className="operation-button" onClick={toggleView}>Toggle View</a>

        {isLineView && (    
        <div id="claim-list" className="claim-list grid">
          <div className="claim-wrapper">
            <div className="status "><div></div>Open</div>
            <div className="title">Claim Title</div>
            <hr></hr>
            <div className="description">The pain itself is very important, and it is followed by the education of the elitist, but at such a time it happens that there is a great deal of work and pain. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come out; they are in fault who abandon their duties and soften their hearts, that is toil.</div>
            <div className="upvote">+1</div>
          </div>
          <div className="claim-wrapper">
            <div className="status filled"><div></div>Resolved</div>
            <div className="title">Claim Title</div>
            <hr></hr>
            <div className="description">The pain itself is very important, and it is followed by the education of the elitist, but at such a time it happens that there is a great deal of work and pain. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come out; they are in fault who abandon their duties and soften their hearts, that is toil.</div>
            <div className="upvote">+1</div>
          </div>
        </div>
      )}
    </>
  );
};

export default commentList;
