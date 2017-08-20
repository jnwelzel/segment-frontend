import React, { PureComponent } from 'react'
import { NavLink, Route } from 'react-router-dom'

import Template from '../Template/Template'
import NewContact from './NewContact/NewContact'
import { api } from '../utils/api'

class Contacts extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      contacts: []
    }
  }
  
  componentDidMount() {
    api.get('/contacts')
      .then(({ data }) => {
        this.setState({
          contacts: data
        })
      })
  }
  
  render() {
    return (
      <Template>
        <NavLink to={`${this.props.match.url}/new`} className="btn btn-success">New contact</NavLink>
        <Route path={`${this.props.match.url}/new`} component={NewContact} />
        
        {this.state.contacts.length === 0 ?
          <div className="alert alert-warning" role="alert">
            <strong>Attention!</strong> No contacts to show.
          </div> :
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>State</th>
                <th>Job Title</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contacts.map(contact => (
                <tr>
                  <th>{contact.name}</th>
                  <th>{contact.email}</th>
                  <th>{contact.age}</th>
                  <th>{contact.state}</th>
                  <th>{contact.jobTitle}</th>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </Template>
    )
  }
}

export default Contacts
