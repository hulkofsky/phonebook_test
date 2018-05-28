import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Header, Image, List, Input, Container, Card, Button, Modal } from 'semantic-ui-react'
import './App.css';

const doc = document;

class App extends Component {
  
  addContact() {
    const name = doc.querySelector('input[placeholder=Name]').value;
    const phone = doc.querySelector('input[placeholder=Phone]').value;
    const company = doc.querySelector('input[placeholder=Company]').value;
    const email = doc.querySelector('input[placeholder=Email]').value;

    const emailPattern = /^\w+@\w+\.\w{2,4}$/i;
    const phonePattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    const namePattern = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;

    const showError = (message) => {
      let errorDiv = document.createElement('div');

      if(doc.querySelector('.error')) doc.querySelector('.error').remove();
      errorDiv.classList.add("error");
      errorDiv.innerHTML = message;
      doc.querySelector('button[name=addContact]').parentElement.appendChild(errorDiv);
    };

    if(name.search(namePattern))  {
      showError('Invalid name!');
      return;
    };

    if(phone.search(phonePattern))  {
      showError('Invalid phone!');
      return;
    };

    if(company.search(namePattern))  {
      showError('Invalid company name!');
      return;
    };

    if(email.search(emailPattern)) {
      showError('Invalid email!');
      return;
    };

    const newContact = {
      name: name,
      phone: phone,
      company: company,
      email: email,
      photo: 'http://svgur.com/i/65U.svg'
    };

    if(doc.querySelector('.error')) doc.querySelector('.error').remove();

    this.props.onAddContact(newContact);
  }

  deleteContact(index){
    this.props.onDeleteContact(index);
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
                      <Button size='mini' color='red' onClick={() => {this.deleteContact(index)}}>Delete</Button>
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
                    <Button name='addContact' size='large' color='green' onClick={() => {this.addContact()}}>Add</Button>
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
      dispatch({type: 'ADD_CONTACT', payload: newContact});
    },

    onDeleteContact: (index)  => {
      dispatch({type: 'DELETE_CONTACT', payload: index});
    },

    onFindContact: (searchCriteria) => {
      dispatch({ type: 'FIND_CONTACT', payload: searchCriteria })
    },

    onSelectContact: (contact) => {
      dispatch({ type: 'SELECT_CONTACT', payload: contact })
    }
  })
)(App);
