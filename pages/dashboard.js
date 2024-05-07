"use client";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from "next/image";
import "../app/css/page.css";
import React, { useState, useEffect } from 'react';
import CreateUser from '../app/components/createUser.js';
import Dropdown from '../app/components/dropdown.js';
import logo from '../app/public/logo.svg';
import avatar from '../app/public/avatar.jpg';
import forgot from '../app/public/forgot.svg';
import Popup from '../app/components/Popup.js';
import CommentsList from '../app/components/commentsList.client.js';
import CategoryStatistics from "../app/components/categoryStatistics.js";
import Logout from "../app/components/logoutButton.js";


const Dashboard = () => {
    const { data: session } = useSession();
    const [toggled, setToggled] = useState(true);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
	const [name, setName] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This check ensures that we do not perform any action until we know the session state
        if (session === undefined) {
          setIsLoading(true);  // Keep loading if session isn't loaded yet
          return;  // Exiting early
        }
    
        if (!session) {
          router.replace('/login');
        } else if (session.user.role !== "Employee") {
          router.replace('/login');
        } else {
          setName(session.user.name);
        }
        setIsLoading(false);  // Set loading to false only after all checks
      }, [session, router]);  // Correct dependencies
    
      if (isLoading) {
        return <div>Loading...</div>; // Show loading while checking session
      }

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
                        <Popup />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <div className="sidebar">
                        <Dropdown />
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

export default Dashboard;
