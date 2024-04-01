"use client";
import Image from "next/image";
import styles from "./css/page.module.css";
import './globals.css';
import React from 'react';
import toggleView from './components/toggleView';
import CommentsList from './components/commentsList.client.js';
// Import TestDbComponent or any other components if needed

// function CommentSubmitForm() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [resolved, setResolved] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const commentData = { title, content, resolved };

//     try {
//       const response = await fetch('/api/comments', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(commentData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Comment posted successfully:', data);
//       // Clear form fields after successful submission
//       setTitle('');
//       setContent('');
//       setResolved(false);
//       alert('Comment submitted successfully!');
//     } catch (error) {
//       console.error('Failed to submit comment:', error);
//       alert('Failed to submit comment.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Submit a Comment</h2>
//       <label>
//         Title:
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Comment:
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Resolved:
//         <input
//           type="checkbox"
//           checked={resolved}
//           onChange={(e) => setResolved(e.target.checked)}
//         />
//       </label>
//       <br />
//       <button type="submit">Submit Comment</button>
//     </form>
//   );
// }

export default function Home() {
  // You can define more functions for other buttons similarly

  return (
    <div>
      <header>
        <div className={styles.title}>
          {/* Assuming you want to use Image component but have it commented out */}
          <img className={styles.western_digitalLogo} src="/images/icons/logo.svg" alt="Logo"/>
          VoiceAdvance
        </div>
        <div className={styles.accountTab}>
          <div className={styles.profilePic}>
            <img src="/images/avatar.jpg" alt="Profile"/>
          </div>
          <div className={styles.accountName}>Julien</div>
        </div>
      </header>
      
      <main>
        <div className={styles.operationBar}>
          <div style={{ display: 'inline', float: 'right' }}>
            <button className={styles.operationButton} onClick={toggleView}>Toggle View</button>
            <button className={styles.operationButton}>Search</button>
            <input className={styles.search} placeholder="Search" type="text"/>
            <button className={styles.button}>New Claim <span style={{ fontSize: '150%' }}>+</span></button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <div className={styles.sidebar}>
            <div className={styles.dropdown}>
              {/* Assuming you might want to use a button for toggling the dropdown */}
              {/* <button onClick={(e) => e.currentTarget.parentElement.classList.toggle('open')} className={styles.title}>Claims</button> */}
              <div className="content">
                <a href="#all">All</a>
                <a href="#active">Active</a>
                <a href="#manage">Manage</a> 
              </div>
            </div>
            <div className={styles.personalStatistics}>
              <p>Personal Statistics</p>
              <hr />
              <div className="wrapper">
                <div className="stat">
                  <div id="stat-postcount">0</div>
                  Posts
                </div>
                <div className="stat">
                  <div id="stat-resolvedcount">0</div>
                  Resolved
                </div>
                <div className="stat">
                  <div id="stat-upvotecount">0</div>
                  Upvotes
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div id="claimList" className={styles.claimList}>
        <CommentsList/>
        </div>
      </main>
      
      <footer className="footer"></footer>
    </div>
  );
}
