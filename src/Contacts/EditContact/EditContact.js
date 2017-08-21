import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import './EditContact.css'
import { validateContactForm } from '../NewContact/core'
import { api } from '../../utils/api'

class EditContact extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      validationErrors: ''
    }
    
    this._submitHandler = event => this.submitHandler(event)
  }
  
  submitHandler(event) {
    event.preventDefault()
    
    const form = validateContactForm(event)
    
    if (form.errors.length > 0) {
      this.setState({
        validationErrors: form.errors.map(error => (<div>- {error}</div>))
      })
    } else {
      delete form.errors
      
      api.put(`contacts/${this.props.contactId}`, { ...form })
        .then(() => {
          this.props.getContacts()
          this.props.history.push('/contacts')
        }, error => {
          if (error.response.status === 409) {
            this.setState({
              validationErrors: ['Email address already in use.']
            })
          }
        })
    }
  }
  
  componentDidMount() {
    this.nameInput.focus()
    this.nameInput.value = this.props.contact.name
    this.emailInput.value = this.props.contact.email
    this.ageInput.value = this.props.contact.age
    this.stateInput.value = this.props.contact.state
    this.jobTitleInput.value = this.props.contact.jobTitle
  }
  
  render() {
    return (
      <div>
        <div className="EditContact">
          <form className="EditContact-form" onSubmit={this._submitHandler}>
            <input type="text" className="form-control mb-2" placeholder="Name" ref={input => this.nameInput = input} name="name" />
            <input type="text" className="form-control mb-2" placeholder="Email" ref={input => this.emailInput = input} name="email" />
            <input type="number" className="form-control mb-2" placeholder="Age" ref={input => this.ageInput = input} name="age" />
            <input type="text" className="form-control mb-2" placeholder="State" ref={input => this.stateInput = input} name="state" />
            <input type="text" className="form-control mb-2" placeholder="Job title" ref={input => this.jobTitleInput = input} name="jobTitle" />
            
            <div className="mt-3 text-right">
              <Link to="/contacts">Cancel</Link>
              <button className="btn btn-primary EditContact-save" type="submit">Save</button>
            </div>
          </form>
        </div>
        
        {this.state.validationErrors ?
          <div className="alert alert-danger EditContact-errors">
            <strong>Oops!</strong> {this.state.validationErrors}
          </div> :
          null
        }
      </div>
    )
  }
}

export default EditContact
