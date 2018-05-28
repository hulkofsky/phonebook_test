import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Header, Image, List, Input } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  
  findContact() {
    const searchCriteria = document.querySelector('input[name=search]').value;
    this.props.onFindContact(searchCriteria);
  }
  
  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Input name='search' icon='search' iconPosition='left' placeholder='Search users...'
            onChange={this.findContact.bind(this)} 
          />
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
    contacts: state.contacts.filter(contact =>  contact.name.toLowerCase().includes(state.filterContacts.toLowerCase()))
  }),
  dispatch => ({
    onFindContact: (searchCriteria) => {
      dispatch({ type: 'FIND_CONTACT', payload: searchCriteria })
    },
  })
)(App);
