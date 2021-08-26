import { Col, Input, Layout, Row } from 'antd'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

import { CommonHeader } from '../common/header/CommonHeader'

import '../../styles/landing/index.css'

const { Search } = Input
const { Content } = Layout

interface LandingProps {
  initialData?: any
}

const Landing = ({ initialData }: LandingProps) => {
  const history = useHistory()

  useEffect(() => {
    const tokenId = localStorage.getItem('id')

    if (!tokenId) {
      history.push('/register')
    }
  }, [])

  const card = () => {
    const menu: string[] = ['음식', '식료품']
    return menu.map((m) => {
      return (
        <div className='landing-card-container' key={Math.random()}>
          <Row className='landing-card-title-row'>
            <Col offset={1} span={10}>
              <span className='landing-card-title-text'>{m}</span>
            </Col>
          </Row>
          <Row justify='center'>
            <Col span={8} style={{ textAlign: 'center' }}>
              <img
                className='landing-card-image'
                src='https://mp-seoul-image-production-s3.mangoplate.com/keyword_search/meta/pictures/tvsvgscjmukmnbnv.jpg?fit=around|600:400&crop=600:400;*,*&output-format=jpg&output-quality=80'
              />
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <img
                className='landing-card-image'
                src='https://mp-seoul-image-production-s3.mangoplate.com/keyword_search/meta/pictures/tvsvgscjmukmnbnv.jpg?fit=around|600:400&crop=600:400;*,*&output-format=jpg&output-quality=80'
              />
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <img
                className='landing-card-image'
                src='https://mp-seoul-image-production-s3.mangoplate.com/keyword_search/meta/pictures/tvsvgscjmukmnbnv.jpg?fit=around|600:400&crop=600:400;*,*&output-format=jpg&output-quality=80'
              />
            </Col>
          </Row>
        </div>
      )
    })
  }

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
              <Col xs={24} sm={{ span: 20, offset: 2 }} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
                <Search
                  placeholder='지역, 식당 또는 주소'
                  allowClear
                  enterButton='검색'
                  size='large'
                  onSearch={() => {
                    history.push('/search')
                  }}
                />
              </Col>
            </Row>
          </div>
          <div>{card()}</div>
        </Content>
      </Layout>
    </>
  )
}

export default Landing
