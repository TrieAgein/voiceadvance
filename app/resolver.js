import Dropdownuser from './components/dropdownUser.js';
import Dropdownstats from './components/dropdownStats.js';


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
          <CreateUser/>
        </div>
      </content>
      <footer className="footer"></footer>
    </div>
    );
  }