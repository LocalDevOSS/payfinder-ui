import querystring from 'querystring'

import { Col, Row } from 'antd'
import React from 'react'

import { LandingConf } from './conf/LandingConf'

interface LandingCardListProps {
  menu: string[]
  history: any
}

const LandingCardList = ({ menu, history }: LandingCardListProps) => {
  return (
    <>
      {menu.map((m) => {
        return (
          <div className='landing-card-container' key={Math.random()}>
            <Row className='landing-card-title-row'>
              <Col offset={1} span={10}>
                <span className='landing-card-title-text'>{m}</span>
              </Col>
            </Row>
            <Row>
              <Col offset={0} span={24}>
                <Row justify='center'>
                  {LandingConf.recoTag.map((t) => (
                    <Col
                      className='landing-card-col'
                      span={6}
                      style={{ textAlign: 'center' }}
                      key={t.name}
                      onClick={() => {
                        history.push(
                          `/search?${querystring.stringify({
                            keyword: t.name,
                            payType: sessionStorage.getItem('payType'),
                            storeType: sessionStorage.getItem('storeType'),
                          })}`,
                        )
                      }}
                    >
                      <img
                        className='landing-card-image'
                        src='https://mp-seoul-image-production-s3.mangoplate.com/keyword_search/meta/pictures/tvsvgscjmukmnbnv.jpg?fit=around|600:400&crop=600:400;*,*&output-format=jpg&output-quality=80'
                      />
                      <div className='landing-card-text-container'>
                        <span className='landing-card-text'>#{t.name}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
        )
      })}
    </>
  )
}

export default LandingCardList
