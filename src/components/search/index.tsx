import * as queryString from 'querystring'

import { GridLayout } from '@egjs/react-infinitegrid'
import { Col, Divider, Input, Layout, Row, Select } from 'antd'
import axios from 'axios'
import dotProp from 'dot-prop-immutable'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'

import { StoreModel } from '../../types/store/store.types'
import '../../styles/search/index.css'
import { CommonHeader } from '../common/header/CommonHeader'
import { MapService } from '../common/map/Map.service'

const { Search } = Input
const { Content } = Layout
const { Option } = Select

interface SearchProps {
  initialData?: any
}

const SearchResult = ({ initialData }: SearchProps) => {
  const [keyword, setKeyword] = useState<string>()
  const [payType, setPayType] = useState<string>()
  const [storeType, setStoreType] = useState<string>()
  const [storeDummy, setStoreDummy] = useState<StoreModel[]>()

  const history = useHistory()
  const container = useRef(null) // 지도를 담을 영역의 DOM 레퍼런스

  const fetchDummy = (payType: string) => {
    const url = `http://localhost:8080/dummy${payType ? `?payType=${payType}` : ''}`
    axios.get(url).then((r) => {
      setStoreDummy(r.data.slice(0, 200).filter((s: StoreModel) => s.lat && s.logt))
    })
  }

  useEffect(() => {
    const query = queryString.parse(location.search.replace('?', ''))
    const { keyword, payType, storeType } = query
    if (keyword) {
      setKeyword(keyword.toString())
    }
    if (payType) {
      setPayType(payType.toString())
    }
    if (storeType) {
      setStoreType(storeType.toString())
    }
  }, [])

  useEffect(() => {
    if (payType) {
      let query = queryString.parse(location.search.replace('?', ''))
      query = dotProp.set(query, 'payType', payType)
      window.history.pushState({}, '', `/search?${queryString.stringify(query)}`)
      fetchDummy(payType)
    }
  }, [payType])

  useEffect(() => {
    if (storeDummy && storeDummy.length > 0) {
      const options = {
        // 지도를 생성할 때 필요한 기본 옵션
        // @ts-ignore
        // eslint-disable-next-line no-new
        center: new window.kakao.maps.LatLng(storeDummy[0].lat, storeDummy[0].logt), // 지도의 중심좌표.
        level: 3, // 지도의 레벨(확대, 축소 정도)
      }

      // 지도 생성 및 객체 리턴
      const map = MapService.init(container.current, options)

      // 지도를 재 설정할 범위 정보를 가지고 있을 LatLngBounds 객체를 생성
      const bounds = MapService.initBound()

      // 마커 클러스터러를 생성합니다
      // @ts-ignore
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 3, // 클러스터 할 최소 지도 레벨
      })

      const markers: any[] = []
      if (storeDummy) {
        storeDummy.forEach((store, index) => {
          const point = MapService.initPoint(store)

          const marker = MapService.initMarker(point)
          markers.push(marker)

          marker.setMap(map)
          bounds.extend(point)

          // @ts-ignore
          window.kakao.maps.event.addListener(marker, 'click', () => {
            // @ts-ignore
            const overlay = new window.kakao.maps.CustomOverlay({
              // 오버레이에 띄울 내용
              content:
                `${
                  // eslint-disable-next-line no-useless-concat
                  `${'<div class="wrap">' + '    <div class="info">' + '        <div class="title">'}${
                    store.name
                  }            <div class="close" onclick="closeOverlay()" title="닫기"></div>` +
                  `        </div>` +
                  `        <div class="body">` +
                  `            <div class="img">` +
                  `                <img src= `
                }${'https://mp-seoul-image-production-s3.mangoplate.com/430315/694014_1602948745934_49598?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80'} width="73" height="70">` +
                `           </div>` +
                `            <div class="desc">` +
                `                <div class="ellipsis">${store.address}</div>` +
                `                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>` +
                `                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>` +
                `            </div>` +
                `        </div>` +
                `    </div>` +
                `</div>`,
              map,
              position: marker.getPosition(),
            })
            // 아무데나 클릭하게되면 overlay를 끄기
            // @ts-ignore
            window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
              overlay.setMap(null)
            })
            overlay.setMap(map)
          })
        })
        clusterer.addMarkers(markers)
        map.setBounds(bounds)
      }
    }
    return () => {}
  }, [storeDummy])

  return (
    <>
      <Layout style={{ height: '100%', background: '#fff' }}>
        <CommonHeader />
        <Content style={{ marginTop: 64, overflowY: 'hidden' }}>
          <Row>
            <Col span={12}>
              <Row id='search-search-row'>
                <Col span={20} offset={2}>
                  <Search placeholder={keyword || '지역, 식당 또는 주소'} allowClear enterButton='검색' size='large' />
                </Col>
              </Row>
              <Row style={{ marginTop: '20px' }}>
                <Col span={20} offset={2}>
                  <Select style={{ width: 120 }} defaultValue='jack'>
                    <Option value='jack'>키워드 순 </Option>
                    <Option value='lucy'>거리 순</Option>
                  </Select>
                </Col>
              </Row>
              <Row style={{ marginTop: '20px' }}>
                <Col span={20} offset={2}>
                  <Select style={{ float: 'right', width: 120 }} defaultValue='음식점업'>
                    <Option value='음식점업'>음식점업 </Option>
                    <Option value='개인서비스업'>개인서비스업</Option>
                  </Select>
                  <Select
                    style={{ float: 'right', width: 120 }}
                    defaultValue='성남시'
                    onChange={(value: string) => {
                      setPayType(value)
                    }}
                  >
                    <Option value='성남시'>성남시 </Option>
                    <Option value='고양시'>고양시</Option>
                    <Option value='과천시'>과천시</Option>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={20} offset={2}>
                  <GridLayout
                    style={{ marginTop: '50px', maxHeight: '500px', width: '100%', padding: 0 }}
                    tag='ul'
                    options={{
                      isOverflowScroll: true,
                      isConstantSize: true,
                      useFit: false,
                      horizontal: false,
                      useRecycle: true,
                      isEqualSize: true,
                    }}
                  >
                    {storeDummy &&
                      storeDummy.length > 0 &&
                      storeDummy.map((d) => (
                        <Row key={Math.random()}>
                          <Col>
                            <Row id='search-list-row'>
                              <Col span={8}>
                                <img
                                  style={{ width: '100%', height: 'auto' }}
                                  src='https://mp-seoul-image-production-s3.mangoplate.com/430315/694014_1602948745934_49598?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80'
                                />
                              </Col>
                              <Col span={16}>
                                <Row>
                                  <Col span={22} offset={1}>
                                    <span style={{ fontSize: '30px' }}>{d.name}</span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={22} offset={1}>
                                    <span>{d.type}</span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={22} offset={1}>
                                    <span>{d.address}</span>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Divider style={{ border: '0.01px solid #d3d3d3' }} />
                            </Row>
                          </Col>
                        </Row>
                      ))}
                  </GridLayout>
                </Col>
              </Row>
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
