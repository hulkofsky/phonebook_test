import { combineReducers } from 'redux';

import contacts from './contacts'
import filterContacts from './filterContacts'
import selectContact from './selectContact'

export default combineReducers({
    contacts,
    filterContacts,
    selectContact
})