import React, { PureComponent } from 'react'
import { NavLink, Route } from 'react-router-dom'

import Template from '../Template/Template'
import NewSegmentation from './NewSegmentation/NewSegmentation'
import { api } from '../utils/api'

class Segmentations extends PureComponent {
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
          records: data._embedded.segmentations
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
    return <Template>
      <NavLink to={`${this.props.match.url}/new`} className="btn btn-success">New segmentation</NavLink>
      <Route exact path={`${this.props.match.url}/new`} render={() => <NewSegmentation />} />
      
      {this.state.records.length === 0 ?
        <div className="alert alert-warning mt-3" role="alert">
          <strong>Nothing to show!</strong> Use the button above to create a new segmentation.
        </div> :
        <div>{this.state.records.map(record => (<div key={record.id}>{record.segmentationName}</div>))}</div>
      }
    </Template>
  }
}

export default Segmentations
