import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  feature: 'list',
  contacts: [
    {
      id: 1,
      firstName: 'Test',
      middleName: 'Test',
      lastName: 'Contact',
      mobile: '099999999',
      email: 'test@contact.com',
    },
    {
      id: 2,
      firstName: 'Test 2',
      middleName: 'TestTwo',
      lastName: 'ContactTwo',
      mobile: '08888888',
      email: 'test2@contact.com',
    },
  ],
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
})

export default contactsSlice.reducer
