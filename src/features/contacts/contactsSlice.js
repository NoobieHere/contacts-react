import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidV4 } from 'uuid'

const initialState = {
  feature: 'list',
  contacts: [
    // {
    //   id: 1,
    //   firstName: 'Test',
    //   middleName: 'Test',
    //   lastName: 'Contact',
    //   mobile: '099999999',
    //   email: 'test@contact.com',
    // },
    // {
    //   id: 2,
    //   firstName: 'Test 2',
    //   middleName: 'TestTwo',
    //   lastName: 'ContactTwo',
    //   mobile: '08888888',
    //   email: 'test2@contact.com',
    // },
  ],
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    changeFeature: (state, action) => {
      state.feature = action.payload
    },
    create: (state, action) => {
      state.contacts.push({ id: uuidV4(), ...action.payload })
    },
    update: (state, action) => {
      state.contacts = state.contacts.map((contact) =>
        contact.id === action.payload.id
          ? { ...contact, ...action.payload }
          : contact
      )
    },
    remove: (state, action) => {
      const indexes = state.contacts.map((c) => c.id)
      const cIdx = indexes.indexOf(action.payload)

      state.contacts.splice(cIdx, 1)
    },
  },
})

export default contactsSlice.reducer
export const { changeFeature, create, update, remove } = contactsSlice.actions
