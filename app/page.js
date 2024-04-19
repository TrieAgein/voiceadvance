"use client";
import Image from "next/image";
import "./css/page.css";
import React from 'react';
import toggleView from './components/toggleView';
import CommentsList from './components/commentsList.client.js';
import CommentSubmitForm from './components/commentSubmitForm.js';
import CreateUser from './components/createUser.js';
import Dropdown from './components/dropdown.js';
import logo from './public/logo.svg';
import avatar from './public/avatar.jpg';
import forgot from './public/forgot.svg';
import Popup from './components/Popup.js';
import EditComment from './components/editComment.js';
import CommentList from './components/commentList.js';

// Import TestDbComponent or any other components if needed
export default function Home() {
  return (
    <div>
     <header>
      <div className="title">
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
        <CommentList/>
        {/* <a className="operation-button" onClick={toggleView}>Toggle View</a>{' '} */}
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
            <div id="claim-list" className="line">
            <div className="claim-wrapper">
              <div className="status "><div></div>Open</div>
              <div className="title">Claim Title</div>
              <hr></hr>
              <div className="description">The pain itself is very important, and it is followed by the education of the elitist, but at such a time it happens that there is a great deal of work and pain. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come out; they are in fault who abandon their duties and soften their hearts, that is toil.</div>
              <div className="upvote">+1</div>
            </div>
            <div class="claim-wrapper">
              <div class="status filled"><div></div>Resolved</div>
              <div class="title">Claim Title</div>
              <hr></hr>
              <div class="description">The pain itself is very important, and it is followed by the education of the elitist, but at such a time it happens that there is a great deal of work and pain. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come out; they are in fault who abandon their duties and soften their hearts, that is toil.</div>
              <div class="upvote">+1</div>
            </div>
    </div>
      </div>
      <div>
        <EditComment/>
      </div><br/>
      {/* The one with replies. The main one */}
      {/* <div id="claim-list" className="claim-list list">
        <CommentsList/>
      </div> */}
      <div>
        <CommentSubmitForm/>
      </div>
      {/* <div>
        <CreateUser/>
      </div> */}
    {/* <div id="claim-list" className="line">
      <div className="claim-wrapper">
        <div className="status "><div></div>Open</div>
        <div className="title">Claim Title</div>
        <hr></hr>
        <div className="description">The pain itself is very important, and it is followed by the education of the elitist, but at such a time it happens that there is a great deal of work and pain. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come out; they are in fault who abandon their duties and soften their hearts, that is toil.</div>
        <div className="upvote">+1</div>
      </div>
      <div class="claim-wrapper">
        <div class="status filled"><div></div>Resolved</div>
        <div class="title">Claim Title</div>
        <hr></hr>
        <div class="description">The pain itself is very important, and it is followed by the education of the elitist, but at such a time it happens that there is a great deal of work and pain. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come out; they are in fault who abandon their duties and soften their hearts, that is toil.</div>
        <div class="upvote">+1</div>
      </div>
    </div> */}

    </content>
    <footer className="footer"></footer>
  </div>
  );
}

