import { Select } from 'antd'
import React from 'react'
import { isMobile } from 'react-device-detect'

import { StoreConf } from './conf/StoreConf'

const { Option } = Select

interface SearchResultStoreTypeFilterProps {
  storeType: string
  setStoreType: any
}

const SearchResultStoreTypeFilter = ({ storeType, setStoreType }: SearchResultStoreTypeFilterProps) => (
  <>
    <Select
      style={isMobile ? { width: 120 } : { width: 120, float: 'right' }}
      value={storeType}
      onChange={(value: string) => {
        setStoreType(value)
      }}
    >
      {StoreConf.storeType.map((p) => (
        <Option key={p.value} value={p.value}>
          {p.name}
        </Option>
      ))}
    </Select>
  </>
)

export default SearchResultStoreTypeFilter
