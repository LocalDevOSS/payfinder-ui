import * as querystring from 'querystring'

import { Button, Col, Input, Layout, message, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import { CommonHeader } from '../common/header/CommonHeader'

import { LandingConf } from './conf/LandingConf'
import '../../styles/landing/index.css'
import LandingCardList from './LandingCardList'

const { Search } = Input
const { Content } = Layout

interface LandingProps {
  initialData?: any
}

const Landing = ({ initialData }: LandingProps) => {
  const history = useHistory()

  useEffect(() => {
    const payType = sessionStorage.getItem('payType')
    const storeType = sessionStorage.getItem('payType')

    if (!payType || !storeType) {
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
              <Col xs={24} sm={{ span: 20, offset: 2 }} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
                <Search
                  placeholder='지역, 식당 또는 주소'
                  allowClear
                  enterButton='검색'
                  size='large'
                  onSearch={(value) => {
                    if (!value) {
                      message.info('검색 키워드를 입력해주세요.')
                    } else {
                      history.push(
                        `/search?${querystring.stringify({
                          keyword: value,
                          payType: sessionStorage.getItem('payType'),
                          storeType: sessionStorage.getItem('storeType'),
                        })}`,
                      )
                    }
                  }}
                />
              </Col>
            </Row>
            <Row className='landing-search-container' justify='center'>
              <Button
                size='large'
                type='primary'
                style={{ textAlign: 'center' }}
                onClick={() => {
                  history.push(
                    `/search?${querystring.stringify({
                      payType: sessionStorage.getItem('payType'),
                      storeType: sessionStorage.getItem('storeType'),
                    })}`,
                  )
                }}
              >
                전체 가맹점 보기
              </Button>
            </Row>
          </div>
          <LandingCardList menu={LandingConf.menu} history={history} />
        </Content>
      </Layout>
    </>
  )
}

export default Landing
