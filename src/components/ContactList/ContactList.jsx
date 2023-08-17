import styles from './ContactList.module.css'

const ContactItem = ({ details, onClick }) => {
  return (
    <div className={styles['contact-list__item']} aria-hidden="false" onClick={onClick}>
      {details.firstName} {details.lastName}
    </div>
  )
}

const ContactList = ({ contacts, onItemClick }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} details={contact} onClick={() => onItemClick(contact)} />
      ))}
    </div>
  )
}

export default ContactList
