import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Header, Image, List, Input, Container, Card, Button } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  
  findContact() {
    const searchCriteria = document.querySelector('input[name=search]').value;
    this.props.onFindContact(searchCriteria);
  }
  
  selectContact(selectContact) {
    this.props.onSelectContact(selectContact);
  }

  details() {
    if(!this.props.selectContact) {
      return (<p>Choose contact..</p>)
    };
    
    return (
      <Card>
          <Image src={this.props.selectContact.photo} />
          <Card.Content>
              <Card.Header>
                  {this.props.selectContact.name}
              </Card.Header>
              <Card.Meta>
                  {this.props.selectContact.company}
              </Card.Meta>
              <Card.Description>
                  <p>Phone: {this.props.selectContact.phone}</p>
                  <p>E-mail: {this.props.selectContact.email}</p>
              </Card.Description>
          </Card.Content>
      </Card>
    );
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
              <List.Item key={index} onClick={() => this.selectContact(this.props.contacts[index])}>
                <Image avatar src={contact.photo}/>
                <List.Content>
                    <List.Header>{contact.name}</List.Header>
                    {contact.company}
                </List.Content>
                <Container className="right aligned">
                      <Button size='mini' color='yellow'>Change</Button>
                      <Button size='mini' color='red'>Delete</Button>
                </Container>
              </List.Item>
            )}
          </List>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header size='large'>Details:</Header>
            {console.log(this.state)}
            {this.details()}
        </Grid.Column>    
      </Grid>
    );
  }
}

export default connect(
  state => ({
    contacts: state.contacts.filter(contact =>  contact.name.toLowerCase().includes(state.filterContacts.toLowerCase())),
    selectContact: state.selectContact
  }),
  dispatch => ({
    onFindContact: (searchCriteria) => {
      dispatch({ type: 'FIND_CONTACT', payload: searchCriteria })
    },

    onSelectContact: (contact) => {
      dispatch({ type: 'SELECT_CONTACT', payload: contact })
    }
  })
)(App);
