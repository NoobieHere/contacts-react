import { SwitchTransition, CSSTransition } from 'react-transition-group'
import logo from './logo.svg'
import './App.css'
import ContactList from './components/ContactList/ContactList'
import ActionBtn from './components/ActionBtn/ActionBtn'
import { useCallback, useMemo, useState, useRef } from 'react'
import ContactForm from './components/ContactForm/ContactForm'
import { useDispatch, useSelector } from 'react-redux'
import { changeFeature, create, update, remove } from './features/contacts/contactsSlice'
import Button from './components/Button/Button'

function App() {
  const { feature, contacts } = useSelector((state) => state.contacts)
  const dispatch = useDispatch()

  const [currentContactDetail, setContactDetail] = useState()
  const [isDetailsInteractive, setIsDetailsInteractive] = useState(false)
  const listRef = useRef(null)
  const formRef = useRef(null)
  const contactFormRef = useRef(null)

  const nodeRef = useMemo(() => {
    if (feature === 'list') return listRef
    return formRef
  }, [feature])

  const getTitle = useCallback(() => {
    if (feature === 'list') return 'Contact List'
    if (feature === 'create') return 'Add Contact'
    if (feature === 'details') return 'Details'
  }, [feature])

  const goTo = (feature) => {
    dispatch(changeFeature(feature))
  }
  
  const handleDetailsAction = () => {
    if (isDetailsInteractive) {
      dispatch(update(contactFormRef.current.values()))
      goTo('list')
      setIsDetailsInteractive(false)
    } else {
      setIsDetailsInteractive(true)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="App-logo" alt="logo" />
        React Contact List
      </header>
      <div className="contact-container">
        <div className="contact-container__header">
          {feature !== 'list' && (
            <div className="contact-container__back">
              <ActionBtn
                action="back"
                onClick={() => {
                  goTo('list')
                  setIsDetailsInteractive(false)
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
                  goTo('create')
                }}
              />
            )}
            {feature === 'create' && (
              <ActionBtn
                action="save"
                onClick={() => {
                  goTo('list')
                  dispatch(create(contactFormRef.current.values()))
                }}
              />
            )}
            {feature === 'details' && (
              <ActionBtn
                action={isDetailsInteractive ? 'save' : 'edit'}
                onClick={handleDetailsAction}
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
              {feature === 'list' && (
                <ContactList
                  contacts={contacts}
                  onItemClick={(contact) => {
                    setContactDetail(contact)
                    goTo('details')
                  }}
                />
              )}
              {feature === 'create' && <ContactForm ref={contactFormRef} />}
              {feature === 'details' && (
                <>
                  <ContactForm
                    ref={contactFormRef}
                    isInteractive={isDetailsInteractive}
                    details={currentContactDetail}
                  />
                  <Button
                    className="fixBottom"
                    state='danger'
                    onClick={() => {
                      dispatch(remove(currentContactDetail.id))
                      goTo('list')
                    }}
                  >
                    Remove Contact
                  </Button>
                </>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}

export default App
