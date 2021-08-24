import { Card, Col, Input, Layout, Row } from 'antd'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

import { CommonHeader } from '../common/header/CommonHeader'

import '../../styles/landing/index.css'

const { Search } = Input
const { Content, Footer } = Layout

interface LandingProps {
  initialData?: any
}

const card = () => {
  const menu: string[] = ['음식', '식료품', '의료', '의료', '의료', '의료', '의료', '의료']
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
            <Card
              bordered={false}
              style={{ width: 240 }}
              cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
            />
            Card content
          </Col>
          <Col span={8}>
            <Card
              bordered={false}
              style={{ width: 240 }}
              cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
            />
          </Col>
          <Col span={8}>
            <Card
              bordered={false}
              style={{ width: 240 }}
              cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
            />
          </Col>
        </Row>
      </div>
    )
  })
}

const Landing = ({ initialData }: LandingProps) => {
  const history = useHistory()

  useEffect(() => {
    const tokenId = localStorage.getItem('id')

    if (!tokenId) {
      history.push('/register')
    }
  }, [])

  return (
    <>
      <Layout style={{ height: '100%', background: '#fff' }}>
        <CommonHeader />
        <Content style={{ marginTop: 64 }}>
          <div id='landing-banner-container'>
            <div className='landing-banner-text-container'>
              <p>경기 지역 화폐 활성화!</p>
              <p>페이 파인더</p>
            </div>
            <Row className='landing-search-container'>
              <Col xs={24} sm={{ span: 20, offset: 2 }} md={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
                <Search placeholder='지역, 식당 또는 주소' allowClear enterButton='검색' size='large' />
              </Col>
            </Row>
          </div>
          <div className='site-card-wrapper'>{card()}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Pay Finder ©2021</Footer>
      </Layout>
    </>
  )
}

export default Landing
