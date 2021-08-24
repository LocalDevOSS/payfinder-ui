import { Col, Layout, Row } from 'antd'
import React from 'react'

const { Header } = Layout

export const CommonHeader = () => (
  <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    <Row justify='start' style={{ width: '100%' }}>
      <Col xs={14} sm={14} md={18} lg={22}>
        <div>
          <a style={{ color: 'white', fontSize: '18px' }}>Pay Finder</a>
        </div>
      </Col>
    </Row>
  </Header>
)
