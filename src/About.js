import React from "react"
import { Component } from "react";
import Accordion from 'react-bootstrap/Accordion'

class Profile extends Component {

  render() {
    /* DONE: render information about the developers */
    return <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Sarah Teklemariam</Accordion.Header>
        <Accordion.Body>
          I am aspiring Software Developer located in Fortlauderdale,FL. I was working as a nurse assistant in a hospital.I decided to change a career into tech industry.  I am palnning to take Javascript in 401 class.My goal is to acquire all the necessary coding skills  and become a successful software developer.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Tanesha</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>




    // <p>This app is made by Sarah and Tanesha</p>
  }
};

export default Profile;
