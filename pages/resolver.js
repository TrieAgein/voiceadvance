import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from "next/image";
import "../app/css/page.css";
import React, { useState } from 'react';
import CreateUser from '../app/components/createUser.js';
import Dropdown from '../app/components/dropdown.js';
import logo from '../app/public/logo.svg';
import avatar from '../app/public/avatar.jpg';
import CommentsList from "../app/components/commentsListResolver.js";
import Dropdownuser from '../app/components/dropdownUser.js';
import CategoryStatistics from "../app/components/categoryStatistics.js";
import Logout from "../app/components/logoutButton.js";



const Resolver = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [toggled, setToggled] = useState(true);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const handleLogout = async () => {
    // This function handles logout and redirection
    await signOut({ redirect: true, callbackUrl: '/login' });
};
  const toggleView = () => {
      setToggled(!toggled);
  };

  return (
      <div>
          <header>
              <div className="title">
                  <Image src={logo} width="50" alt="logo" />
                  VoiceAdvance
              </div>
              <div className="account-tab">
                  <div className="profile-pic">
                      <Image src={avatar} width='100' alt="profile" />
                  </div>
                  <div className="account-name">Resolver</div>
                  {/* Logout button */}
                  <Logout/>
              </div>
          </header>
          <content>
              <div className="operation-bar">
                  <div style={{ display: 'inline', float: 'right' }}>
                      <a className="operation-button" onClick={() => setSearch(input)}>Search</a>{' '}
                      <input value={input} className="search" placeholder="Search" type="text" onChange={(e) => setInput(e.target.value)} />{' '}
                  </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <div className="sidebar">
                      <Dropdown />
                      <Dropdownuser />
                      <CategoryStatistics />
                  </div>
                  <div id="claim-list" className={`claim-list ${toggled ? 'line' : 'grid'}`}>
                      <CommentsList search={search} />
                  </div>
              </div>
          </content>
          <footer className="footer"></footer>
      </div>
  );
}

export default Resolver;


/*const Resolver = () => {
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
        <div id="claim-list" classname="claim-list line">
          <CommentsList/>
        </div>
        </div>
        <div>
            <ResolveComment/>
        </div><br/><br/>
      </content>
      <footer className="footer"></footer>
    </div>
    );
  }

export default Resolver;*/