import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { api } from '../../utils/api'

class ShowSegmentation extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      segmentation: {},
      contacts: []
    }
  }
  
  componentDidMount() {
    api.get(`/segmentations/${this.props.match.params.segmentationId}`)
    .then(({ data }) => {
        this.setState({
          segmentation: data
        })
      }
    )
  }
  
  render() {
    return <div>
      {Object.keys(this.state.segmentation).length > 0 ?
        <div>
          <h3>{this.state.segmentation.segmentationName}</h3>
          <hr/>
          {this.state.segmentation.contacts.length > 0 ?
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-default">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>State</th>
                    <th>Job Title</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.segmentation.contacts.map(contact => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.age}</td>
                      <td>{contact.state}</td>
                      <td>{contact.jobTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> :
            <div className="alert alert-warning"><strong>Ops!</strong> No contacts found for this segmentation.</div>
          }
        </div> :
        null
      }
      <div className="text-center">
        <Link to="/segmentations" className="btn btn-secondary">Back</Link>
      </div>
    </div>
  }
}

export default ShowSegmentation
