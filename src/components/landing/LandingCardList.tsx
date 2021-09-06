import { Col, Row } from 'antd'
import React from 'react'

interface LandingCardListProps {
  menu: string[]
}

const LandingCardList = ({ menu }: LandingCardListProps) => {
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
                  <Col className='landing-card-col' span={6} style={{ textAlign: 'center' }}>
                    <img
                      className='landing-card-image'
                      src='https://mp-seoul-image-production-s3.mangoplate.com/keyword_search/meta/pictures/tvsvgscjmukmnbnv.jpg?fit=around|600:400&crop=600:400;*,*&output-format=jpg&output-quality=80'
                    />
                    <div className='landing-card-text-container'>
                      <span className='landing-card-text'>#디저트</span>
                    </div>
                  </Col>
                  <Col className='landing-card-col' span={6} style={{ textAlign: 'center' }}>
                    <img
                      className='landing-card-image'
                      src='https://mp-seoul-image-production-s3.mangoplate.com/keyword_search/meta/pictures/tvsvgscjmukmnbnv.jpg?fit=around|600:400&crop=600:400;*,*&output-format=jpg&output-quality=80'
                    />
                    <div className='landing-card-text-container'>
                      <span className='landing-card-text'>#이탈리안</span>
                    </div>
                  </Col>
                  <Col className='landing-card-col' span={6} style={{ textAlign: 'center' }}>
                    <img
                      className='landing-card-image'
                      src='https://mp-seoul-image-production-s3.mangoplate.com/265831/hpyolebdl7lz8t.jpg?fit=around|600:400&crop=600:400;*,*&output-format=jpg&output-quality=80'
                    />
                    <div className='landing-card-text-container'>
                      <span className='landing-card-text'>#중식</span>
                    </div>
                  </Col>
                  <Col className='landing-card-col' span={6} style={{ textAlign: 'center' }}>
                    <img
                      className='landing-card-image'
                      src='https://mp-seoul-image-production-s3.mangoplate.com/265831/hpyolebdl7lz8t.jpg?fit=around|600:400&crop=600:400;*,*&output-format=jpg&output-quality=80'
                    />
                    <div className='landing-card-text-container'>
                      <span className='landing-card-text'>#일식</span>
                    </div>
                  </Col>
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
