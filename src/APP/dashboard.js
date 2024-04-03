// Try and replace the claim component to the component Simon made
// Can make the upvote a component since being reused
import React from 'react';
// import './const.css'; // Import CSS file

function Dashboard() {
  // Function to close the popup
  const closePopup = () => {
    document.getElementById('popup-wrapper').style.display = 'none';
  };

  // Function to toggle view
  const toggleView = () => {
    // Implement toggle view functionality here
  };

  return (
    <div>
      <div id="popup-wrapper">
        <div className="popup">
          <div className="close-button" onClick={closePopup}></div>
          <div id="popup-body"></div>
        </div>
      </div>
      <wrapper>
        <header>
          <div className="title">
            <img className="western_digital-logo" src="/images/icons/logo.svg" alt="Logo" />
            VoiceAdvance
          </div>
          <div className="account-tab">
            <div className="profile-pic">
              <img src="/images/avatar.jpg" alt="Profile" />
            </div>
            <div className="account-name">Julien</div>
          </div>
        </header>

        <content>
          <div className="operation-bar">
            <div style={{ display: 'inline', float: 'right' }}>
              <a className="operation-button" onClick={toggleView}>
                Toggle View
              </a>
              <a className="operation-button">Search</a>
              <input className="search" placeholder="Search" type="text" />
              <a className="button">
                New Claim <span style={{ fontSize: '150%' }}>+</span>
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <div className="sidebar">
              <div className="dropdown">
                <a
                  onClick={() =>
                    document.querySelector('.dropdown').classList.toggle('open')
                  }
                  className="title"
                >
                  Claims
                  <img src="images/icons/arrow.svg" alt="Arrow" />
                </a>
                <div className="content">
                  <a>All</a>
                  <a>Active</a>
                  <a>Manage</a>
                </div>
              </div>
              <div className="personal-statistics">
                <p>Personal Statistics</p>
                <hr />
                <div className="wrapper">
                  <div className="stat">
                    <center id="stat-postcount">0</center>
                    Posts
                  </div>
                  <div className="stat">
                    <center id="stat-resolvedcount">0</center>
                    Resolved
                  </div>
                  <div className="stat">
                    <center id="stat-upvotecount">0</center>
                    Upvotes
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div id="claim-list" className="claim-list line">
              {/* Render claim list dynamically here */}
            </div>
          </div>
        </content>
      </wrapper>
      <div className="footer"></div>
    </div>
  );
}

export default Dashboard;