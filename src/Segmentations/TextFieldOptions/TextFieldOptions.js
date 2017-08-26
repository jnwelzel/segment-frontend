import React from 'react'

import TextOptions from '../TextOptions'

const TextFieldOptions = ({ value, onChangeOption, fieldName }) => (
  <select defaultValue={value} onChange={event => onChangeOption('text', fieldName, event.target.value)}>
    <option value={TextOptions.EQUALS_TO}>equals to</option>
    <option value={TextOptions.CONTAINS}>contains</option>
    <option value={TextOptions.STARTS_WITH}>starts with</option>
    <option value={TextOptions.ENDS_WITH}>ends with</option>
  </select>
)

export default TextFieldOptions
