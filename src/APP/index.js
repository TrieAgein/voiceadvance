import React from 'react';
// import style from './App.css';
/* /* <link href="/const.css" rel="stylesheet" /> */

function Login() {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Login - VoiceAdvance</title>
      </head>
      <body>
        <wrapper>
          <content>
            <div className="popup-window">
              <div className="va-title">
                 <img className="western_digital-logo" src="/images/icons/logo.svg" alt="Western Digital Logo" />
                <img className="western_digital-logo" src="/images/icons/logo.svg" alt="Western Digital Logo" />
                VoiceAdvance
              </div>
              <div style={{ width: 'fit-content', margin: 'auto' }}>
                <p style={{ fontSize: '38px' }}>Login</p>
                <p>
                  Email:<br />
                  <input type="text" placeholder="username@company.com" />
                </p>
                <p>
                  Password:<br />
                  <input type="text" placeholder="Password" /><br />
                  <a style={{ fontSize: '75%' }} className="link">Forgot Password?</a>
                </p>
                {/* <a className="login-button" href="/dashboard.js">Login</a> */}
                <a className="login-button" href="/dashboard">Login</a>
              </div>
            </div>
          </content>
          <div className="footer"></div>
        </wrapper>
        <script src="/const.js"></script>
      </body>
    </>
  );
}

export default Login;
