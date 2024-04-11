export function Dashboard() {
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
          <div>
            <CommentSubmitForm/>
          </div>
        </main>
        
        <footer className="footer"></footer>
      </div>
    )
}