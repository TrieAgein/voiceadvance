"use client";
import Image from "next/image";
import "./css/page.css";
import React from 'react';
import toggleView from './components/toggleView';
import CommentsList from './components/commentsList.client.js';
import CommentSubmitForm from './components/commentSubmitForm.js';
import Dropdown from './components/dropdown.js';
import logo from './public/logo.svg';
import avatar from './public/avatar.jpg';

// Import TestDbComponent or any other components if needed
export default function Home() {
  // You can define more functions for other buttons similarly

  return (
    <div>
    <header>
      <div className="title">
        {/* Assuming you want to use Image component but have it commented out */}
        <Image
            src={logo}
            width="50"
            margin="5"
            alt="logo"
          />
        VoiceAdvance
      </div>
      <div className="account-tab">
        <div className="profile-pic">
          <Image
            src={avatar}
            display ="inline"
            margin= "0 auto"
            margin-left ="-25%"
            width='100'
            height='0'
            alt="profile"
          />
        </div>
        <div className="account-name">Julien</div>
      </div>
    </header>
    <content>
    <div className="operation-bar">
      <div style={{ display: 'inline', float: 'right' }}>
        <a className="operation-button" onClick={toggleView}>Toggle View</a>{' '}
        <a className="operation-button">Search</a>{' '}
        <input className="search" placeholder="Search" type="text"/>{' '}
        <Popup/>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <div className="sidebar">
        <div className="dropdown-open">
          <Dropdown/>
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
    {/* <div id="claim-list" className="claim-list line">
      <CommentsList/>
    </div> */}
    </div>
    {/* <div>
      <CommentSubmitForm/>
    </div> */}
  </content>
  <footer className="footer"></footer>
</div>
  );
}
