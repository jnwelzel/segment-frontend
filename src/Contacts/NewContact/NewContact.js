import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { validateContactForm } from './core'
import { api } from '../../utils/api'
import './NewContact.css'

class NewContact extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      validationErrors: [],
      successMessage: ''
    }
    
    this._submitHandler = event => this.submitHandler(event)
  }
  
  submitHandler(event) {
    event.preventDefault()
    
    const form = validateContactForm(event)
    const formEl = event.target
    
    if (form.errors.length > 0) {
      this.setState({
        validationErrors: form.errors
      })
    } else {
      delete form.errors
      
      api.post('/contacts', { ...form })
        .then(({ data }) => {
          formEl.reset()
          this.nameInput.focus()
          this.setState({
            validationErrors: [],
            successMessage: `"${data.name}" was added to the contacts list.`
          }, () => {
            this.props.getContacts()
          })
        })
        .catch(error => {
          const errorMessage = error.response.status === 409 ? 'Email address already in use' : error.message
          this.setState({
            validationErrors: [errorMessage]
          })
        })
    }
  }
  
  componentDidMount() {
    this.nameInput.focus()
  }
  
  render() {
    return (
      <div className="NewContact">
        <hr/>
        <form onSubmit={this._submitHandler} className="form-inline">
          <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Name" ref={nameInput => this.nameInput = nameInput} name="name" />
          <input type="email" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Email" name="email" />
          <input type="number" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Age" name="age" />
          <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="State" name="state" />
          <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Job title" name="jobTitle" />
          
          <div className="NewContact-buttons">
            <Link to="/contacts">Cancel</Link>
            <button className="btn btn-primary" type="submit">Save</button>
          </div>
        </form>
        
        {this.state.validationErrors.length > 0 ?
          <div className="alert alert-danger NewContact-alert" role="alert">
            <strong>Oops!</strong>
            {this.state.validationErrors.map((error, index) => (
              <div key={index}>- {error}</div>
            ))}
          </div> :
          null
        }
        
        {this.state.successMessage ?
          <div className="alert alert-success NewContact-alert" role="alert">
            <strong>Yay!</strong> {this.state.successMessage}
          </div> :
          null
        }
      </div>
    )
  }
}

export default NewContact
