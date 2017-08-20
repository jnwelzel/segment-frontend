import React, { PureComponent } from 'react'

import './DeleteContact.css'

class DeleteContact extends PureComponent {
  render() {
    return (
      <div className="alert alert-danger DeleteContact" role="alert">
        Are you sure? <strong onClick={() => this.props.deleteContact(this.props.contactId)}>YES</strong> | <strong onClick={() => this.props.history.push('/contacts')}>NO</strong>
      </div>
    )
  }
}

export default DeleteContact
