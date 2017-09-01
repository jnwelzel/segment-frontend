import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import Template from '../Template/Template'
import Index from './Index'
import SegmentationForm from './SegmentationForm/SegmentationForm'
import ShowSegmentation from './ShowSegmentation/ShowSegmentation'

class Segmentations extends PureComponent {
  render() {
    return <Template>
      <Switch>
        <Route exact path={this.props.match.path} component={Index} />
        <Route path={`${this.props.match.path}/new`} component={SegmentationForm} />
        <Route path={`${this.props.match.path}/:segmentationId/edit`} component={SegmentationForm} />
        <Route path={`${this.props.match.path}/:segmentationId`} component={ShowSegmentation} />
      </Switch>
    </Template>
  }
}

export default Segmentations
