import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import TextFieldOptions from '../TextFieldOptions/TextFieldOptions'
import TextOptions from '../TextOptions'
import NumberFieldOptions from '../NumberFieldOptions/NumberFieldOptions'
import NumberOptions from '../NumberOptions'
import { api } from '../../utils/api'

const FIELD_NAMES = {
  name: 'name',
  email: 'email',
  age: 'age',
  state: 'state',
  jobTitle: 'jobTitle',
}

class NewSegmentation extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      name: TextOptions.EQUALS_TO,
      email: TextOptions.EQUALS_TO,
      age: NumberOptions.EQUALS_TO,
      state: TextOptions.EQUALS_TO,
      jobTitle: TextOptions.EQUALS_TO
    }
    
    this._onChangeFieldOperator = (type, fieldName, value) => this.onChangeFieldOperator(type, fieldName, value)
    this._onSubmit = event => this.onSubmit(event)
  }
  
  onChangeFieldOperator(type, fieldName, value) {
    const fieldTypeOptions = type === 'text' ? TextOptions : NumberOptions
    
    this.setState({
      [FIELD_NAMES[fieldName]]: fieldTypeOptions[value]
    })
  }
  
  onSubmit(event) {
    event.preventDefault()
    
    const formEl = event.target
    const params = {
      segmentationName: formEl.segmentationName.value.trim(),
      nameOperator: this.state.name,
      nameValue: formEl.name.value.trim(),
      emailOperator: this.state.email,
      emailValue: formEl.email.value.trim(),
      ageOperator: this.state.age,
      ageValue: formEl.age.value,
      stateOperator: this.state.state,
      stateValue: formEl.state.value.trim(),
      jobTitleOperator: this.state.jobTitle,
      jobTitleValue: formEl.jobTitle.value.trim(),
    }
    
    api.post('/segmentations', params)
      .then(response => {
        console.log(response)
      })
  }
  
  componentDidMount() {
    this.segNameInput.focus()
  }
  
  render() {
    return <form onSubmit={this._onSubmit}>
      <div>
        <label htmlFor="segmentationName">Segmentation name</label>
        <input type="text" id="segmentationName" name="segmentationName" ref={input => this.segNameInput = input} />
      </div>
      
      <label htmlFor="name">Name</label>
      <TextFieldOptions value={this.state.name} onChangeOption={this._onChangeFieldOperator} fieldName="name" />
      <input type="text" id="name" name="name" />
      
      <label htmlFor="email">Email</label>
      <TextFieldOptions value={this.state.email} onChangeOption={this._onChangeFieldOperator} fieldName="email" />
      <input type="text" id="email" name="email" />
      
      <label htmlFor="age">Age</label>
      <NumberFieldOptions value={this.state.age} onChangeOption={this._onChangeFieldOperator} fieldName="age" />
      <input type="number" id="age" name="age" />
      
      <label htmlFor="state">State</label>
      <TextFieldOptions value={this.state.state} onChangeOption={this._onChangeFieldOperator} fieldName="state" />
      <input type="text" id="state" name="state" />
      
      <label htmlFor="jobTitle">Job title</label>
      <TextFieldOptions value={this.state.jobTitle} onChangeOption={this._onChangeFieldOperator} fieldName="jobTitle" />
      <input type="text" id="jobTitle" name="jobTitle" />
      
      <div>
        <Link to="/segmentations">Cancel</Link>
        <button className="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  }
}

export default NewSegmentation
