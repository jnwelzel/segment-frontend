import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { api } from '../utils/api'

class Index extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      records: []
    }
  }
  
  fetchDatabaseRecords() {
    api.get('/segmentations?sort=segmentationName')
      .then(({ data }) => {
        this.setState({
          records: data
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  
  componentDidMount() {
    this.fetchDatabaseRecords()
  }
  
  render() {
    return <div>
      <Link to={`${this.props.match.path}/new`} className="btn btn-success">New segmentation</Link>
      
      {this.state.records.length === 0 ?
        <div className="alert alert-warning mt-3" role="alert">
          <strong>Nothing to show!</strong> Use the button above to create a new segmentation.
        </div> :
        <div>
          <hr/>
          {this.state.records.map(record => (
            <Link key={record.id} to={`${this.props.match.path}/${record.id}`}><div>{record.segmentationName}</div></Link>
          ))}
        </div>
      }
    </div>
  }
}

export default Index
