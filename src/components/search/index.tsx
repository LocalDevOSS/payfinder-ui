import { Col, Input, Layout, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router'

import Restaurant from '../../interfaces/restaurant'
import { CommonHeader } from '../common/header/CommonHeader'

import '../../styles/search/index.css'

const { Search } = Input
const { Content } = Layout

interface SearchProps {
  initialData?: any
}

const SearchResult = ({ initialData }: SearchProps) => {
  const history = useHistory()
  const [search, setSearch] = useState(new URLSearchParams(useLocation().search).get('q') ?? '')
  const data: Restaurant[] = [
    {
      id: 0,
      imageUrl:
        'https://mp-seoul-image-production-s3.mangoplate.com/430315/694014_1602948745934_49598?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80',
      storeNm: '보타르기',
      desc: '신사/압구정 - 이탈리안',
    },

    {
      id: 1,
      imageUrl:
        'https://mp-seoul-image-production-s3.mangoplate.com/898026_1610362531874524.jpg?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80',
      storeNm: '스시 시미즈',
      desc: '신사/압구정 - 회/스시',
    },
    {
      id: 2,
      imageUrl:
        'https://mp-seoul-image-production-s3.mangoplate.com/898026_1610362531874524.jpg?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80',
      storeNm: '스시 시미즈',
      desc: '신사/압구정 - 회/스시',
    },
    {
      id: 3,
      imageUrl:
        'https://mp-seoul-image-production-s3.mangoplate.com/898026_1610362531874524.jpg?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80',
      storeNm: '스시 시미즈',
      desc: '신사/압구정 - 회/스시',
    },
    {
      id: 4,
      imageUrl:
        'https://mp-seoul-image-production-s3.mangoplate.com/898026_1610362531874524.jpg?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80',
      storeNm: '스시 시미즈',
      desc: '신사/압구정 - 회/스시',
    },
  ]

  const card = () => {
    return data.map((d) => (
      <Row id='search-list-row' key={d.id}>
        <Col span={18} offset={3}>
          <Row>
            <Col span={6}>
              <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={d.imageUrl} />
            </Col>
            <Col span={18}>
              <Row>
                <Col span={22} offset={1}>
                  <span style={{ fontSize: '30px' }}>{d.storeNm}</span>
                </Col>
              </Row>
              <Row>
                <Col span={22} offset={1}>
                  <span>{d.desc}</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    ))
  }

  const options = {
    // 지도를 생성할 때 필요한 기본 옵션
    // @ts-ignore
    // eslint-disable-next-line no-new
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
    level: 3, // 지도의 레벨(확대, 축소 정도)
  }

  const container = useRef(null) // 지도를 담을 영역의 DOM 레퍼런스

  useEffect(() => {
    // @ts-ignore
    // eslint-disable-next-line no-new
    new window.kakao.maps.Map(container.current, options) // 지도 생성 및 객체 리턴
    return () => {}
  }, [])

  return (
    <>
      <Layout style={{ height: '100%', background: '#fff' }}>
        <CommonHeader />
        <Content style={{ marginTop: 64 }}>
          <Row>
            <Col span={12}>
              <Row id='search-search-row'>
                <Col span={18} offset={3}>
                  <Search
                    value={search}
                    onChange={(v) => setSearch(v.target.value)}
                    placeholder='지역, 식당 또는 주소'
                    allowClear
                    enterButton='검색'
                    size='large'
                    onSearch={() => {
                      history.push(`/search?q=${search}`)
                    }}
                  />
                </Col>
              </Row>
              {card()}
            </Col>
            <Col span={12}>
              <div id='search-map-container' style={{ width: '100%', height: '100vh' }} ref={container} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  )
}

export default SearchResult
