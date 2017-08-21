import React from 'react'

import './DeleteContact.css'

const DeleteContact = ({ contactId, deleteContact, history }) => (
  <div className="alert alert-danger DeleteContact" role="alert">
    Are you sure? <strong onClick={() => deleteContact(contactId)}>YES</strong> | <strong onClick={() => history.push('/contacts')}>NO</strong>
  </div>
)

export default DeleteContact
