import { Card, Col, Input, Layout, Row } from 'antd'
import React from 'react'
import '../../styles/landing/index.css'

const { Search } = Input
const { Header, Content, Footer } = Layout

interface LandingProps {
  initialData?: any
}

const card = () => {
  const menu: string[] = ['음식', '식료품', '의료']
  return menu.map((m) => {
    return (
      <div key={Math.random()}>
        <Row>
          <Col>
            <span style={{ color: 'black', fontSize: '20px' }}>{m}</span>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>Card content</Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>Card content</Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>Card content</Card>
          </Col>
        </Row>
      </div>
    )
  })
}

const Landing = ({ initialData }: LandingProps) => {
  return (
    <>
      <Layout style={{ height: '100%' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Row justify='start' style={{ width: '100%' }}>
            <Col span={22}>
              <div>
                <a style={{ color: 'white', fontSize: '16px' }}>Pay Finder</a>
              </div>
            </Col>
            <Col span={2}>
              <div>
                <a style={{ color: 'white', fontSize: '16px', marginRight: '30px' }}>로그인</a>
                <a style={{ color: 'white', fontSize: '16px' }}>회원가입</a>
              </div>
            </Col>
          </Row>
        </Header>
        <Content className='site-layout' style={{ marginTop: 64 }}>
          <div className='landing-banner-container' style={{ padding: 24, minHeight: 380 }}>
            <div className='landing-banner-text-container'>
              <p>경기 지역 화폐 활성화!</p>
              <p>페이 파인더</p>
            </div>
            <div className='landing-search-container'>
              <Search placeholder='지역, 식당 또는 주소' allowClear enterButton='검색' size='large' />
            </div>
          </div>
          <div className='site-card-wrapper'>{card()}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Pay Finder ©2021</Footer>
      </Layout>
    </>
  )
}

export default Landing
