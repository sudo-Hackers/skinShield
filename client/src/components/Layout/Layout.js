import React, { Fragment } from 'react';
import './Layout.css';
// import ChatBot from '../chatbot/chatbot';

const layout = (props) => (
  <Fragment>
    <header className="main-header">{props.header}</header>
    {props.mobileNav}
    <main className="content">{props.children}</main>
    {/* <ChatBot /> */}
  </Fragment>
);

export default layout;
