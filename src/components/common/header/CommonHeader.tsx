import { Col, Layout, Row } from 'antd'
import React from 'react'
import '../../../styles/common/header/index.css'

const { Header } = Layout

export const CommonHeader = () => (
  <Header id='header-container'>
    <Row justify='start'>
      <Col span={24}>
        <a className='header-text'>Pay Finder</a>
      </Col>
    </Row>
  </Header>
)
