import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import Image from "next/image";
import "../app/css/page.css";
import React, { useState, useEffect } from 'react';
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
  const [name, setName] = useState('');

  useEffect(() => {
    // Check if the session exists
    if (session) {
        console.log(session); 
        // Redirect based on the user role
        if (session.user.role !== "Resolver") {
            router.replace('/login');
        }
		setName(session.user.name);
    } else {
        // Redirect to login if there is no session
        router.replace('/login');
    }
}, [session, router]);

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
                  
                  <div className="account-name">{name}</div>
                  {/* Logout button */}
                  <Logout/>
              </div>
          </header>
          <content>
              <div className="operation-bar">
                  <div style={{ display: 'inline', float: 'right' }}>
                      <a className="operation-button" onClick={toggleView}>Toggle View</a>
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