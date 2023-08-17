import { useState } from 'react'
import Input from '../Input/Input'
import styles from './ContactForm.module.css'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'

const ContactField = ({
  id,
  type,
  label,
  onChange,
  error,
  value,
  isInteractive,
}) => {
  return (
    <div className={styles['contact-field']}>
      <div className={styles['contact-field__label']}>
        <label htmlFor={id}>{label}</label>{' '}
        {error && <span className={styles.error}>{error}</span>}
      </div>
      <Input
        id={id}
        disabled={isInteractive === undefined ? false : !isInteractive}
        type={type}
        onChange={onChange || (() => {})}
        value={value}
      />
    </div>
  )
}

const initState = {
  firstName: '',
  middleName: '',
  lastName: '',
  mobile: '',
  email: '',
}

const ContactForm = forwardRef(({ details, isInteractive }, ref) => {
  const [contactForm, setContactForm] = useState(details || initState)
  const [errors, setErrors] = useState(initState)

  const isAlpha = (value) => {
    return /^[a-zA-Z]+([a-zA-Z]| {1})+$/.test(value)
  }

  const isValidMobile = (value) => {
    return /^[0-9]{11}$/.test(value)
  }

  const isValidEmail = (value) => {
    return /^\w+@\w+.com$/.test(value)
  }

  const validateName = (value, field) => {
    switch (true) {
      case !value:
        return 'Please enter a name.'
      case !isAlpha(value):
        return 'Please enter a valid name'
      case value.length < 2:
        return 'Please enter atleast 2 characters.'
      default:
        return ''
    }
  }

  const validateMobile = (value) => {
    switch (true) {
      case !value:
        return 'Please enter a mobile number.'
      case !isValidMobile(value):
        return 'Please enter a valid 11-digit mobile number.'
      default:
        return ''
    }
  }

  const validateEmail = (value) => {
    switch (true) {
      case !value:
        return 'Please enter an email.'
      case !isValidEmail(value):
        return 'Please enter a valid email.'
      default:
        return ''
    }
  }

  const validate = (field, value) => {
    let err = ''

    switch (true) {
      case ['firstName', 'middleName', 'lastName'].includes(field):
        err = validateName(value)
        break
      case field === 'mobile':
        err = validateMobile(value)
        break
      case field === 'email':
        err = validateEmail(value)
        break
      default:
        break
    }

    setErrors((prev) => ({
      ...prev,
      [field]: err,
    }))
  }

  const handleChange = (field) => (e) => {
    const { value } = e.target

    validate(field, value)

    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  useImperativeHandle(ref, () => ({
    values: () => {
      return contactForm
    },
    isValid: () => {
      Object.keys(errors).forEach((k) => {
        validate(k, contactForm[k])
      })

      const errCount = Object.values(errors).filter((e) => e !== '')
      return errCount.length === 0
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
          error={errors.firstName}
          onChange={handleChange('firstName')}
        />
        <ContactField
          id="middleName"
          label="Middle Name"
          isInteractive={isInteractive}
          value={contactForm.middleName}
          error={errors.middleName}
          onChange={handleChange('middleName')}
        />
        <ContactField
          id="lastName"
          label="Last Name"
          isInteractive={isInteractive}
          value={contactForm.lastName}
          error={errors.lastName}
          onChange={handleChange('lastName')}
        />
        <ContactField
          id="mobile"
          label="Mobile Number"
          isInteractive={isInteractive}
          value={contactForm.mobile}
          error={errors.mobile}
          onChange={handleChange('mobile')}
        />
        <ContactField
          id="email"
          label="Email"
          isInteractive={isInteractive}
          value={contactForm.email}
          error={errors.email}
          onChange={handleChange('email')}
        />
      </form>
    </div>
  )
})

export default ContactForm
