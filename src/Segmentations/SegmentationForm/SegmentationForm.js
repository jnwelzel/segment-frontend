import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import TextFieldOptions from '../TextFieldOptions/TextFieldOptions'
import TextOptions from '../TextOptions'
import NumberFieldOptions from '../NumberFieldOptions/NumberFieldOptions'
import NumberOptions from '../NumberOptions'
import { api } from '../../utils/api'
import './SegmentationForm.css'

const OPERATOR_FIELD_NAMES = {
  name: 'nameOperator',
  email: 'emailOperator',
  age: 'ageOperator',
  state: 'stateOperator',
  jobTitle: 'jobTitleOperator',
}

const NEW_SEGMENTATION = {
  segmentationName: '',
  nameOperator: TextOptions.EQUALS_TO,
  nameValue: '',
  emailOperator: TextOptions.EQUALS_TO,
  emailValue: '',
  ageOperator: NumberOptions.EQUALS_TO,
  ageValue: 0,
  stateOperator: TextOptions.EQUALS_TO,
  stateValue: '',
  jobTitleOperator: TextOptions.EQUALS_TO,
  jobTitleValue: '',
}

class SegmentationForm extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      segmentationName: NEW_SEGMENTATION.segmentationName,
      name: NEW_SEGMENTATION.nameValue,
      nameOperator: NEW_SEGMENTATION.nameOperator,
      email: NEW_SEGMENTATION.emailValue,
      emailOperator: NEW_SEGMENTATION.emailOperator,
      age: NEW_SEGMENTATION.ageValue,
      ageOperator: NEW_SEGMENTATION.ageOperator,
      state: NEW_SEGMENTATION.stateValue,
      stateOperator: NEW_SEGMENTATION.stateOperator,
      jobTitle: NEW_SEGMENTATION.jobTitleValue,
      jobTitleOperator: NEW_SEGMENTATION.jobTitleOperator,
      successMessage: ''
    }
    
    this._onChangeFieldOperator = (type, fieldName, value) => this.onChangeFieldOperator(type, fieldName, value)
    this._onSubmit = event => this.onSubmit(event)
    this._onChangeInput = event => this.onChangeInput(event)
  }
  
  onChangeFieldOperator(type, fieldName, value) {
    const fieldTypeOptions = type === 'text' ? TextOptions : NumberOptions
    
    this.setState({
      [OPERATOR_FIELD_NAMES[fieldName]]: fieldTypeOptions[value]
    })
  }
  
  onSubmit(event) {
    event.preventDefault()
    
    const formEl = event.target
    const params = {
      segmentationName: formEl.segmentationName.value.trim(),
      nameOperator: this.state.nameOperator,
      nameValue: formEl.name.value.trim(),
      emailOperator: this.state.emailOperator,
      emailValue: formEl.email.value.trim(),
      ageOperator: this.state.ageOperator,
      ageValue: formEl.age.value,
      stateOperator: this.state.stateOperator,
      stateValue: formEl.state.value.trim(),
      jobTitleOperator: this.state.jobTitleOperator,
      jobTitleValue: formEl.jobTitle.value.trim()
    }
    
    if (this.props.match.params.segmentationId) {
      params.id = this.props.match.params.segmentationId
      api.put(`/segmentations/${params.id}`, params)
      .then(() => {
        this.props.history.push(`/segmentations/${params.id}`)
      })
    } else {
      api.post('/segmentations', params)
      .then(() => {
        this.props.history.push('/segmentations')
      })
    }
  }
  
  onChangeInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  componentDidMount() {
    this.segNameInput.focus()
    
    if (this.props.match.params.segmentationId) {
      api.get(`/segmentations/${this.props.match.params.segmentationId}`).then(({ data }) => {
        this.setState({
          segmentationName: data.segmentationName,
          nameOperator: TextOptions[data.nameOperator],
          name: data.nameValue,
          emailOperator: TextOptions[data.emailOperator],
          email: data.emailValue,
          ageOperator: NumberOptions[data.ageOperator],
          age: data.ageValue,
          stateOperator: TextOptions[data.stateOperator],
          state: data.stateValue,
          jobTitleOperator: TextOptions[data.jobTitleOperator],
          jobTitle: data.jobTitleValue,
        })
      })
    }
  }
  
  render() {
    return <div className="SegmentationForm">
      <h4>{this.props.match.params.segmentationId ? 'Edit Segmentation' : 'New Segmentation'}</h4>
      <hr/>
      <form onSubmit={this._onSubmit}>
        <div>
          <label htmlFor="segmentationName">Segmentation name</label>
          <input onChange={this._onChangeInput} value={this.state.segmentationName} type="text" id="segmentationName" name="segmentationName" ref={input => this.segNameInput = input} />
        </div>
        
        <div>
          <label htmlFor="name">Name</label>
          <TextFieldOptions value={this.state.name} onChangeOption={this._onChangeFieldOperator} fieldName="name" />
          <input onChange={this._onChangeInput} value={this.state.name} type="text" id="name" name="name" />
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <TextFieldOptions value={this.state.email} onChangeOption={this._onChangeFieldOperator} fieldName="email" />
          <input onChange={this._onChangeInput} value={this.state.email} type="text" id="email" name="email" />
        </div>
        
        <div>
          <label htmlFor="age">Age</label>
          <NumberFieldOptions value={this.state.age} onChangeOption={this._onChangeFieldOperator} fieldName="age" />
          <input onChange={this._onChangeInput} value={this.state.age} type="number" id="age" name="age" />
        </div>
        
        <div>
          <label htmlFor="state">State</label>
          <TextFieldOptions value={this.state.state} onChangeOption={this._onChangeFieldOperator} fieldName="state" />
          <input onChange={this._onChangeInput} value={this.state.state} type="text" id="state" name="state" />
        </div>
        
        <div>
          <label htmlFor="jobTitle">Job title</label>
          <TextFieldOptions value={this.state.jobTitle} onChangeOption={this._onChangeFieldOperator} fieldName="jobTitle" />
          <input onChange={this._onChangeInput} value={this.state.jobTitle} type="text" id="jobTitle" name="jobTitle" />
        </div>
        
        <div>
          <Link to="/segmentations">Cancel</Link>
          <button className="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
      
      {this.state.successMessage ?
        <div className="alert alert-success SegmentationForm-alert" role="alert">
          <strong>Yay!</strong> {this.state.successMessage}
        </div> :
        null
      }
    </div>
  }
}

export default SegmentationForm
