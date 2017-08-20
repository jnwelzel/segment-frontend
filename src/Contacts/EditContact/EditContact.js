import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import './EditContact.css'

class EditContact extends PureComponent {
  render() {
    return (
      <div className="EditContact">
        <form className="EditContact-form">
          <input type="text" className="form-control mb-2" placeholder="Name" ref={nameInput => this.nameInput = nameInput} name="name" />
          <input type="text" className="form-control mb-2" placeholder="Email" name="email" />
          <input type="number" className="form-control mb-2" placeholder="Age" name="age" />
          <input type="text" className="form-control mb-2" placeholder="State" name="state" />
          <input type="text" className="form-control mb-2" placeholder="Job title" name="jobTitle" />
          
          <div className="mt-3 text-right">
            <Link to="/contacts">Cancel</Link>
            <button className="btn btn-primary EditContact-save" type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

export default EditContact
