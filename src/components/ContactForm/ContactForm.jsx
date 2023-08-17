import { useState } from 'react'
import Input from '../Input/Input'
import styles from './ContactForm.module.css'

const ContactField = ({ id, type, label, onChange }) => {
  return (
    <div className={styles['contact-field']}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} type={type} onChange={onChange || (() => {})} />
    </div>
  )
}

const ContactForm = () => {
  const [contactForm, setContactForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    email: '',
  })

  const handleChange = (field) => (e) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  return (
    <div>
      <form autoComplete="off">
        <ContactField
          id="firstName"
          label="First Name"
          value={contactForm.firstName}
          onChange={handleChange('firstName')}
        />
        <ContactField
          id="middleName"
          label="Middle Name"
          value={contactForm.middleName}
          onChange={handleChange('middleName')}
        />
        <ContactField
          id="lastName"
          label="Last Name"
          value={contactForm.firstName}
          onChange={handleChange('lastName')}
        />
        <ContactField
          id="mobile"
          label="Mobile Number"
          value={contactForm.firstName}
          onChange={handleChange('mobile')}
        />
        <ContactField
          id="email"
          label="Email"
          value={contactForm.firstName}
          onChange={handleChange('email')}
        />
      </form>
    </div>
  )
}

export default ContactForm
