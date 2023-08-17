import { SwitchTransition, CSSTransition } from 'react-transition-group'
import logo from './logo.svg'
import './App.css'
import ContactList from './components/ContactList/ContactList'
import ActionBtn from './components/ActionBtn/ActionBtn'
import { useCallback, useMemo, useState, useRef } from 'react'
import ContactForm from './components/ContactForm/ContactForm'
import { useEffect } from 'react'

function App() {
  const [feature, setFeature] = useState('create')
  const listRef = useRef(null)
  const formRef = useRef(null)

  const nodeRef = useMemo(() => {
    if (feature === 'list') return listRef
    if (feature === 'create') return formRef
  }, [feature])

  const getTitle = useCallback(() => {
    if (feature === 'list') return 'Contact List'
    if (feature === 'create') return 'Add Contact'
  }, [feature])

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
          {feature !== 'list' && (
            <div className='contact-container__back'>
              <ActionBtn
              action="back"
              onClick={() => {
                setFeature('list')
              }}
            />
            </div>
          )}
          <div className="contact-container__title">{getTitle()}</div>
          <div className="contact-container__action">
            {feature === 'list' && (
              <ActionBtn
                action="add"
                onClick={() => {
                  setFeature('create')
                }}
              />
            )}
            {feature === 'create' && (
              <ActionBtn
                action="save"
                onClick={() => {
                  setFeature('list')
                }}
              />
            )}
          </div>
        </div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={feature}
            nodeRef={nodeRef}
            addEndListener={(done) => {
              nodeRef.current.addEventListener('transitionend', done, false)
            }}
            classNames="slide"
          >
            <div ref={nodeRef} className="contact-container__body">
              {feature === 'list' && <ContactList contacts={DUMMY_CONTACT} />}
              {feature === 'create' && <ContactForm />}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}

export default App
