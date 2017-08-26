import React from 'react'

import NumberOptions from '../NumberOptions'

const NumberFieldOptions = ({ value, onChangeOption, fieldName }) => (
  <select defaultValue={value} onChange={event => onChangeOption('number', fieldName, event.target.value)}>
    <option value={NumberOptions.EQUALS_TO}>=</option>
    <option value={NumberOptions.LESS_THAN}>&lt;</option>
    <option value={NumberOptions.LESS_THAN_EQUAL}>&lt;=</option>
    <option value={NumberOptions.GREATER_THAN}>&gt;</option>
    <option value={NumberOptions.GREATER_THAN_EQUAL}>&gt;=</option>
  </select>
)

export default NumberFieldOptions
