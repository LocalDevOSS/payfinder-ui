import { Button, Col, Layout, message, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import { CommonHeader } from '../common/header/CommonHeader'
import '../../styles/register/index.css'
import { StoreConf } from '../search/common /conf/StoreConf'

const { Content } = Layout
const { Option } = Select

interface RegisterProps {
  initialData?: any
}

const Register = ({ initialData }: RegisterProps) => {
  const [stepSeq, setStepSeq] = useState<number>(0)
  const [payType, setPayType] = useState<string>()
  const [storeType, setStoreType] = useState<string>()
  const history = useHistory()

  const handlePayTypeChange = (value: string) => {
    setPayType(value)
  }

  const handleStoreTypeChange = (value: string) => {
    setStoreType(value)
  }

  useEffect(() => {
    if (stepSeq === 2 && payType && storeType) {
      sessionStorage.setItem('payType', payType)
      sessionStorage.setItem('storeType', storeType)
      history.push('/')
    }
  }, [stepSeq])

  const payTypeSelect = () => {
    return (
      <Select className='register-form-select' placeholder='페이 종류를 선택해주세요.' onChange={handlePayTypeChange}>
        {StoreConf.payType.map((t) => (
          <Option key={t.value} value={t.value}>
            {t.name}
          </Option>
        ))}
      </Select>
    )
  }

  const storeTypeSelect = () => {
    return (
      <Select
        className='register-form-select'
        placeholder='판매점 종류를 선택해주세요.'
        onChange={handleStoreTypeChange}
      >
        {StoreConf.storeType.map((t) => (
          <Option key={t.value} value={t.value}>
            {t.name}
          </Option>
        ))}
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
                      if (stepSeq === 0 && !payType) {
                        message.warn('페이 종류를 입력해주세요.')
                      } else if (stepSeq === 1 && !storeType) {
                        message.warn('판매점 종류를 입력해주세요.')
                      } else {
                        setStepSeq(stepSeq + 1)
                      }
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
