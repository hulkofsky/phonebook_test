import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Header, Image, List } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Header size='large'>Contacts:</Header>
          <List animated celled verticalAlign='middle'>
            {this.props.contacts.map((contact, index) => 
              <List.Item key={index}>
                <Image avatar src={contact.photo}/>
                <List.Content>
                    <List.Header>{contact.name}</List.Header>
                    {contact.company}
                </List.Content>
              </List.Item>
            )}
          </List>
          </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    contacts: state.contacts
  }),
  dispatch => ({})
)(App);
