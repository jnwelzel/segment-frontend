import { isValidEmail } from '../../utils/validation'

export const validateContactForm = event => {
  event.preventDefault()
  
  const errors = []
  const formFields = event.target.elements
  const name = formFields.name.value.trim()
  const email = formFields.email.value.trim()
  const age = formFields.age.value.trim()
  const state = formFields.state.value.trim()
  const jobTitle = formFields.jobTitle.value.trim()
  
  if(!name) {
    errors.push('Name cannot be blank')
  }
  
  if(!email) {
    errors.push('Email cannot be blank')
  } else if (!isValidEmail(email)) {
    errors.push('Invalid email address')
  }
  
  if(!age) {
    errors.push('Age cannot be blank')
  } else if (isNaN(age)) {
    errors.push('Age must be a number')
  }
  
  if(!state) {
    errors.push('State cannot be blank')
  }
  
  if(!jobTitle) {
    errors.push('Job title cannot be blank')
  }
  
  return { errors, name, email, age, state, jobTitle }
}
