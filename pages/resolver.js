import Image from "next/image";
import "../app/css/page.css";
import React, { useState } from 'react';
import toggleView from '../app/components/toggleView.js';
import CreateUser from '../app/components/createUser.js';
import Dropdown from '../app/components/dropdown.js';
import logo from '../app/public/logo.svg';
import avatar from '../app/public/avatar.jpg';
import forgot from '../app/public/forgot.svg';
import Popup from '../app/components/Popup.js';
import Comment from '../app/components/comment.js'
import CommentsList from "../app/components/commentsList.client.js";
import ResolveComment from "../app/components/resolvecomment.js"
import Dropdownuser from '../app/components/dropdownUser.js';
import Dropdownstats from '../app/components/dropdownStats.js';


const Resolver = () => {
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
          <div className="account-name">Resolver</div>
        </div>
      </header>
      <content>
      <div className="operation-bar">
        <div style={{ display: 'inline', float: 'right' }}>
          <a className="operation-button" onClick={toggleView}>Toggle View</a>{' '}
          <a className="operation-button">Search</a>{' '}
          <input className="search" placeholder="Search" type="text"/>{' '}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <div className="sidebar">
          <div className="dropdown-open">
            <Dropdown/>
          </div>
          <div className="dropdown-open">
            <Dropdownuser/>
          </div>
          <div className="dropdown-open">
            <Dropdownstats/>
          </div>
          <div className="personal-statistics">
            <p>Resolver Statistics</p>
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
            </div>
            <hr />
          </div>
        </div>
        </div>
        <div id="claim-list" className="claim-list list">
          <CommentsList/>
        </div>
        <div>
          <ResolveComment/>
        </div><br/><br/>
      </content>
      <footer className="footer"></footer>
    </div>
    );
  }

export default Resolver;