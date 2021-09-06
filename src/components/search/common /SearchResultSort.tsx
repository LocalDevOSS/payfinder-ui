import { Select } from 'antd'
import React from 'react'

const { Option } = Select

const SearchResultSort = () => (
  <Select style={{ width: 120 }} defaultValue='keyword'>
    <Option value='keyword'>키워드 순 </Option>
    <Option value='distance'>거리 순</Option>
  </Select>
)

export default SearchResultSort
