import { GridLayout } from '@egjs/react-infinitegrid'
import { Col, Divider, Row } from 'antd'
import React from 'react'

import { StoreModel } from '../../../types/store/store.types'

interface SearchResultListProps {
  stores?: StoreModel[]
}

const SearchResultList = ({ stores }: SearchResultListProps) => (
  <GridLayout
    style={{ marginTop: '50px', maxHeight: '500px', width: '100%', padding: 0 }}
    tag='ul'
    options={{
      isOverflowScroll: true,
      isConstantSize: true,
      useFit: false,
      horizontal: false,
      useRecycle: true,
      isEqualSize: true,
    }}
  >
    {stores &&
      stores.length > 0 &&
      stores.map((d) => (
        <Row key={Math.random()}>
          <Col>
            <Row id='search-list-row'>
              <Col span={8}>
                <img
                  style={{ width: '100%', height: 'auto' }}
                  src='https://mp-seoul-image-production-s3.mangoplate.com/430315/694014_1602948745934_49598?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80'
                />
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={22} offset={1}>
                    <span style={{ fontSize: '30px' }}>{d.name}</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={22} offset={1}>
                    <span>{d.type}</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={22} offset={1}>
                    <span>{d.address}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Divider style={{ border: '0.01px solid #d3d3d3' }} />
            </Row>
          </Col>
        </Row>
      ))}
  </GridLayout>
)

export default SearchResultList
