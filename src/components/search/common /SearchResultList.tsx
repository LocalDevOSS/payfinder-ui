import { GridLayout } from '@egjs/react-infinitegrid'
import { Button, Col, Divider, Row } from 'antd'
import React from 'react'

import { StoreModel } from '../../../types/store/store.types'
import { MapService } from '../../common/map/Map.service'

interface SearchResultListProps {
  stores?: StoreModel[]
  map?: any
}

const SearchResultList = ({ stores, map }: SearchResultListProps) => (
  <GridLayout
    style={{ marginTop: '50px', maxHeight: '800px', width: '100%', padding: 0 }}
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
    {stores &&
      stores.length > 0 &&
      stores.map((d) => (
        <Row key={Math.random()}>
          <Col>
            <Row id='search-list-row'>
              <Col span={24}>
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
                <Row style={{ marginTop: '10px' }}>
                  <Col span={22} offset={1}>
                    <Button
                      onClick={() => {
                        if (map && d.latitude && d.longitude) {
                          // 이동할 위도 경도 위치를 생성합니다
                          // @ts-ignore
                          const moveLatLon = new window.kakao.maps.LatLng(d.latitude, d.longitude)

                          const bounds = MapService.initBound()

                          const point = MapService.initPoint(d)
                          const marker = MapService.initMarker(point)

                          bounds.extend(point)

                          map.panTo(moveLatLon)
                          map.setBounds(bounds)

                          // @ts-ignore
                          const overlay = new window.kakao.maps.CustomOverlay({
                            // 오버레이에 띄울 내용
                            content:
                              `${
                                // eslint-disable-next-line no-useless-concat
                                `${'<div class="wrap">' + '    <div class="info">' + '        <div class="title">'}${
                                  d.name
                                }            <div class="close" onclick="closeOverlay()" title="닫기"></div>` +
                                `        </div>` +
                                `        <div class="body">` +
                                `            <div class="img">` +
                                `                <img src= `
                              }${'https://play-lh.googleusercontent.com/mOpGQGvsIJPzP4Uu23kf0toU8KbdM6BTSo9UByXO5aGP0UxH9zlPzmWnE9M5tfD2pyA'} width="73" height="70">` +
                              `           </div>` +
                              `            <div class="desc">` +
                              `                <div class="ellipsis">${d.type}</div>` +
                              `                <div class="jibun ellipsis">${d.address}</div>` +
                              `            </div>` +
                              `        </div>` +
                              `    </div>` +
                              `</div>`,
                            map,
                            position: marker.getPosition(),
                          })

                          overlay.setMap(map)

                          // 아무데나 클릭하게되면 overlay를 끄기
                          // @ts-ignore
                          window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
                            overlay.setMap(null)
                          })
                        }
                      }}
                    >
                      지도에서 확인
                    </Button>
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
)

export default SearchResultList
