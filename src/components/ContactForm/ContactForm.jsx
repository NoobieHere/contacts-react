import { useState } from 'react'
import Input from '../Input/Input'
import styles from './ContactForm.module.css'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'

const ContactField = ({ id, type, label, onChange, value, isInteractive }) => {
  return (
    <div className={styles['contact-field']}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} disabled={isInteractive === undefined ? false : !isInteractive} type={type} onChange={onChange || (() => {})} value={value} />
    </div>
  )
}

const ContactForm = forwardRef(({details, isInteractive}, ref) => {
  const [contactForm, setContactForm] = useState(details || {
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

  useImperativeHandle(ref, () => ({
    values: () => {
      return contactForm
    }
  }))

  return (
    <div>
      <form autoComplete="off">
        <ContactField
          id="firstName"
          label="First Name"
          isInteractive={isInteractive}
          value={contactForm.firstName}
          onChange={handleChange('firstName')}
        />
        <ContactField
          id="middleName"
          label="Middle Name"
          isInteractive={isInteractive}
          value={contactForm.middleName}
          onChange={handleChange('middleName')}
        />
        <ContactField
          id="lastName"
          label="Last Name"
          isInteractive={isInteractive}
          value={contactForm.lastName}
          onChange={handleChange('lastName')}
        />
        <ContactField
          id="mobile"
          label="Mobile Number"
          isInteractive={isInteractive}
          value={contactForm.mobile}
          onChange={handleChange('mobile')}
        />
        <ContactField
          id="email"
          label="Email"
          isInteractive={isInteractive}
          value={contactForm.email}
          onChange={handleChange('email')}
        />
      </form>
    </div>
  )
})

export default ContactForm
