import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { validateContactForm } from './core'
import { api } from '../../utils/api'

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
    
    if (form.errors.length > 0) {
      this.setState({
        validationErrors: form.errors
      })
    } else {
      delete form.errors
      
      api.post('/contacts', { ...form })
        .then(({ data }) => {
          this.setState({
            validationErrors: [],
            successMessage: `"${data.name}" was added to the contacts list`
          })
        })
        .catch(error => {
          this.setState({
            validationErrors: [error.message]
          })
        })
    }
  }
  
  componentDidMount() {
    this.nameInput.focus()
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this._submitHandler}>
          <input type="text" placeholder="Name" ref={nameInput => this.nameInput = nameInput} name="name" />
          <input type="text" placeholder="Email" name="email" />
          <input type="number" placeholder="Age" name="age" />
          <input type="text" placeholder="State" name="state" />
          <input type="text" placeholder="Job title" name="jobTitle" />
          
          <button className="btn btn-primary" type="submit">Save</button>
          <Link to="/contacts">Cancel</Link>
        </form>
        
        {this.state.validationErrors.length > 0 ?
          <div className="alert alert-danger" role="alert">
            <strong>Oops!</strong>
            {this.state.validationErrors.map((error, index) => (
              <div key={index}>- {error}</div>
            ))}
          </div> :
          null
        }
        
        {this.state.successMessage ?
          <div className="alert alert-success" role="alert">
            <strong>Yay!</strong>
            <div>{this.state.successMessage} <button className="btn btn-link">Add another</button></div>
          </div> :
          null
        }
      </div>
    )
  }
}

export default NewContact
