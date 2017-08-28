import React, { PureComponent } from 'react'
import { NavLink, Link, Route } from 'react-router-dom'

import Template from '../Template/Template'
import NewContact from './NewContact/NewContact'
import DeleteContact from './DeleteContact/DeleteContact'
import EditContact from './EditContact/EditContact'
import { api } from '../utils/api'

class Contacts extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      contacts: []
    }
    
    this._getContacts = () => this.getContacts()
    this._deleteContact = contactId => this.deleteContact(contactId)
    this._updateContact = (contactId, contact) => this.updateContact(contactId, contact)
  }
  
  getContacts() {
    api.get('/contacts?sort=name')
      .then(({ data }) => {
        this.setState({
          contacts: data
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  
  deleteContact(contactId) {
    api.delete(`/contacts/${contactId}`)
      .then(() => {
        this.setState({
          successMessage: 'Contact successfully deleted.'
        }, () => {
          this.props.history.push('/contacts')
          this.getContacts()
        })
      })
  }
  
  componentDidMount() {
    this.getContacts()
  }
  
  render() {
    return (
      <Template>
        <NavLink to="/contacts/new" className="btn btn-success">New contact</NavLink>
        <Route exact path={`${this.props.match.path}/new`} render={() => <NewContact getContacts={this._getContacts} />} />
        
        {this.state.contacts.length === 0 ?
          <div className="alert alert-warning mt-3" role="alert">
            <strong>Nothing to show!</strong> Use the button above to create a new contact.
          </div> :
          <div className="table-responsive">
            <hr/>
            <table className="table">
              <thead className="thead-default">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>State</th>
                  <th>Job Title</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.state.contacts.map(contact => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.age}</td>
                    <td>{contact.state}</td>
                    <td>{contact.jobTitle}</td>
                    <td><Link to={`/contacts/edit/${contact.id}`}>Edit</Link> | <Link to={`/contacts/delete/${contact.id}`}>Delete</Link></td>
                    <Route exact path={`${this.props.match.url}/edit/${contact.id}`} render={() => <EditContact contact={contact} contactId={contact.id} getContacts={this._getContacts} history={this.props.history} />} />
                    <Route exact path={`${this.props.match.url}/delete/${contact.id}`} render={() => <DeleteContact contactId={contact.id} deleteContact={this._deleteContact} history={this.props.history} />} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </Template>
    )
  }
}

export default Contacts
