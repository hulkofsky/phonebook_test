import { combineReducers } from 'redux';

import contacts from './contacts'
import filterContacts from './filterContacts'

export default combineReducers({
    contacts,
    filterContacts
})