import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Header, Image, List, Input, Container, Card, Button, Modal } from 'semantic-ui-react'
import './App.css';

const doc = document;

class App extends Component {
  
  addContact() {
    const newContact = {
      name: doc.querySelector('input[placeholder=Name]').value,
      phone: doc.querySelector('input[placeholder=Phone]').value,
      company: doc.querySelector('input[placeholder=Company]').value,
      email: doc.querySelector('input[placeholder=Email]').value,
      photo: 'http://svgur.com/i/65U.svg'
    };

    console.log('hello')
    this.props.onAddContact(newContact);
  }

  findContact() {
    const searchCriteria = doc.querySelector('input[name=search]').value;
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
          <Header size='large'>Contacts:</Header>
          <Input name='search' icon='search' iconPosition='left' placeholder='Search users...'
            onChange={this.findContact.bind(this)}
          />
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

          <Modal trigger={<Button size='large' color='green'>Add</Button>}>
              <Modal.Header>Add Contact</Modal.Header>
              <Modal.Content>
                <Grid>
                  <Grid.Row>
                    <Input placeholder='Name'/>
                  </Grid.Row>
                  <Grid.Row>
                    <Input placeholder='Phone'/>
                  </Grid.Row>
                  <Grid.Row>
                    <Input placeholder='Company'/>
                  </Grid.Row>
                  <Grid.Row>
                    <Input placeholder='Email'/>
                  </Grid.Row>
                  <Grid.Row>
                    <Button size='large' color='green' onClick={() => {this.addContact()}}>Add</Button>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
            </Modal>
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
    onAddContact: (newContact) => {
      console.log(newContact);
      dispatch({type: 'ADD_CONTACT', payload: newContact});
    },

    onFindContact: (searchCriteria) => {
      dispatch({ type: 'FIND_CONTACT', payload: searchCriteria })
    },

    onSelectContact: (contact) => {
      dispatch({ type: 'SELECT_CONTACT', payload: contact })
    }
  })
)(App);
