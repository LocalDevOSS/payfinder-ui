import * as queryString from 'querystring'

import { Col, Input, Layout, Row } from 'antd'
import dotProp from 'dot-prop-immutable'
import React, { useEffect, useRef, useState } from 'react'

import { StoreModel } from '../../../types/store/store.types'
import '../../../styles/search/mobile/index.css'
import { CommonHeader } from '../../common/header/CommonHeader'
import { MapService } from '../../common/map/Map.service'
import { SearchResultService } from '../common /SearchResult.service'
import SearchResultPayTypeFilter from '../common /SearchResultPayTypeFilter'
import SearchResultSort from '../common /SearchResultSort'
import SearchResultStoreTypeFilter from '../common /SearchResultStoreTypeFilter'

const { Search } = Input
const { Content } = Layout

interface SearchProps {
  initialData?: any
}

const SearchResultMobile = ({ initialData }: SearchProps) => {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>()

  // 지역 화페 종류
  const [payType, setPayType] = useState<string>()

  // 업종
  const [storeType, setStoreType] = useState<string>()

  const [stores, setStores] = useState<StoreModel[]>()

  const container = useRef(null) // 지도를 담을 영역의 DOM 레퍼런스

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
    let query = queryString.parse(location.search.replace('?', ''))

    query = dotProp.set(query, 'payType', payType)
    query = dotProp.set(query, 'storeType', storeType)
    window.history.pushState({}, '', `/search?${queryString.stringify(query)}`)

    if (payType && storeType && keyword) {
      SearchResultService.fetchStores(payType, storeType, keyword, setStores)
    }
  }, [payType, storeType, keyword])

  useEffect(() => {
    if (stores && stores.length > 0) {
      const options = {
        // 지도를 생성할 때 필요한 기본 옵션
        // @ts-ignore
        // eslint-disable-next-line no-new
        center: new window.kakao.maps.LatLng(stores[0].latitude, stores[0].longitude), // 지도의 중심좌표.
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
      if (stores) {
        stores.forEach((store, index) => {
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
                }${'https://play-lh.googleusercontent.com/mOpGQGvsIJPzP4Uu23kf0toU8KbdM6BTSo9UByXO5aGP0UxH9zlPzmWnE9M5tfD2pyA'} width="73" height="70">` +
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
  }, [stores])

  return (
    <>
      <Layout style={{ height: '100%', background: '#fff' }}>
        <CommonHeader />
        <Content style={{ overflowY: 'hidden' }}>
          <Row id='search-search-row'>
            <Col span={20} offset={2}>
              <Search
                placeholder={keyword || '지역, 식당 또는 주소'}
                allowClear
                enterButton='검색'
                size='large'
                onSearch={(value) => setKeyword(value)}
              />
            </Col>
          </Row>
          {/* 정렬 */}
          <Row style={{ marginTop: '20px' }}>
            <Col span={6} offset={2}>
              <SearchResultSort />
            </Col>
          </Row>

          {/* 필터 */}
          <Row style={{ marginTop: '20px' }}>
            <Col span={6} offset={2}>
              {storeType && <SearchResultStoreTypeFilter storeType={storeType} setStoreType={setStoreType} />}
            </Col>
            <Col span={6} offset={2}>
              {payType && <SearchResultPayTypeFilter payType={payType} setPayType={setPayType} />}
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <div id='search-map-container' style={{ width: '100%' }} ref={container} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  )
}

export default SearchResultMobile
