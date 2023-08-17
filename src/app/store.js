import { configureStore } from '@reduxjs/toolkit'

import contactReducer from '../features/contacts/contactsSlice'

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
})

export default store
