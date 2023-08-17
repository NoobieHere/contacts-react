import logo from './logo.svg'
import './App.css'
import ContactList from './components/ContactList/ContactList'
import ActionBtn from './components/ActionBtn/ActionBtn'

function App() {
  const DUMMY_CONTACT = [
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
  ]

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="App-logo" alt="logo" />
        React Contact List
      </header>
      <div className="contact-container">
        <div className="contact-container__header">
          <div className="contact-container__title">Contact List</div>
          <div className="contact-container__action">
            <ActionBtn action="add" onClick={() => {}} />
          </div>
        </div>
        <ContactList contacts={DUMMY_CONTACT} />
      </div>
      
    </div>
  )
}

export default App
