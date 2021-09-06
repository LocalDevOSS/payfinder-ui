import { Col, Layout, Row } from 'antd'
import React from 'react'
import '../../../styles/common/header/index.css'
import { Link } from 'react-router-dom'

const { Header } = Layout

export const CommonHeader = () => (
  <Header id='header-container'>
    <Row>
      <Col span={24} offset={0}>
        <Link to='/'>
          <a className='header-text'>Pay Finder</a>
        </Link>
      </Col>
    </Row>
  </Header>
)
