import styles from './ContactList.module.css'

const ContactItem = ({ details }) => {
  return (
    <div className={styles['contact-list__item']}>
      {details.firstName} {details.lastName}
    </div>
  )
}

const ContactList = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} details={contact} />
      ))}
    </div>
  )
}

export default ContactList
