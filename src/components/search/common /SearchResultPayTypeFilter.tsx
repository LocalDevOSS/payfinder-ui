import { Select } from 'antd'
import React from 'react'
import { isMobile } from 'react-device-detect'

import { StoreConf } from './conf/StoreConf'

const { Option } = Select

interface SearchResultPayTypeFilterProps {
  payType: string
  setPayType: any
}

const SearchResultPayTypeFilter = ({ payType, setPayType }: SearchResultPayTypeFilterProps) => (
  <Select
    style={isMobile ? { width: 120 } : { width: 120, float: 'right' }}
    value={payType}
    onChange={(value: string) => {
      setPayType(value)
    }}
  >
    {StoreConf.payType.map((p) => (
      <Option key={p.value} value={p.value}>
        {p.name}
      </Option>
    ))}
  </Select>
)

export default SearchResultPayTypeFilter
