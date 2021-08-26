import { Button, Col, Layout, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import { CommonHeader } from '../common/header/CommonHeader'
import '../../styles/register/index.css'

const { Content } = Layout
const { Option } = Select

interface RegisterProps {
  initialData?: any
}

const Register = ({ initialData }: RegisterProps) => {
  const [stepSeq, setStepSeq] = useState<number>(0)
  const history = useHistory()

  useEffect(() => {
    if (stepSeq === 2) {
      // fixme: 유저 등록 정보 처리
      localStorage.setItem('id', '0')
      history.push('/')
    }
  }, [stepSeq])

  const payTypeSelect = () => {
    return (
      <Select
        className='register-form-select'
        showSearch
        placeholder='페이 종류를 선택해주세요.'
        optionFilterProp='children'
      >
        <Option value='성남시'>성남시</Option>
        <Option value='용인시'>용인시</Option>
        <Option value='부천시'>부천시</Option>
      </Select>
    )
  }

  const storeTypeSelect = () => {
    return (
      <Select
        className='register-form-select'
        showSearch
        placeholder='판매점 종류를 선택해주세요.'
        optionFilterProp='children'
      >
        <Option value='성남시'>음식점</Option>
        <Option value='용인시'>병원</Option>
        <Option value='부천시'>마트</Option>
      </Select>
    )
  }

  return (
    <>
      <Layout style={{ height: '100%', background: '#fff' }}>
        <CommonHeader />
        <Content style={{ marginTop: 64 }}>
          <div id='register-form-container'>
            <div>
              <Row className='register-form-text-row'>
                <Col>
                  <span>
                    {stepSeq === 0 ? '1. 어떤 페이를 사용하실 건가요?' : '2. 원하시는 판매점의 종류가 있나요?'}
                  </span>
                </Col>
              </Row>
              <Row className='register-form-select-row'>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 24, offset: 0 }}
                  lg={{ span: 24, offset: 0 }}
                >
                  {stepSeq === 0 ? payTypeSelect() : storeTypeSelect()}
                </Col>
              </Row>
              <Row justify='space-between'>
                <Col>
                  <Button
                    id='register-form-button'
                    onClick={() => {
                      setStepSeq(stepSeq - 1)
                    }}
                    disabled={stepSeq === 0}
                  >
                    이전
                  </Button>
                </Col>
                <Col>
                  <Button
                    id='register-form-button'
                    type='primary'
                    onClick={() => {
                      setStepSeq(stepSeq + 1)
                    }}
                  >
                    다음
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  )
}

export default Register
