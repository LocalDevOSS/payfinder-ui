import { StoreModel } from '../../../types/store/store.types'

export const MapService = {
  init: (ref: any, options: any) => {
    // @ts-ignore
    return new window.kakao.maps.Map(ref, options) // 지도 생성 및 객체 리턴
  },
  initBound: () => {
    // @ts-ignore
    return new window.kakao.maps.LatLngBounds()
  },
  initPoint: (store: StoreModel) => {
    // @ts-ignore
    return new window.kakao.maps.LatLng(store.latitude, store.longitude)
  },
  initMarker: (point: any) => {
    // @ts-ignore
    return new window.kakao.maps.Marker({
      // @ts-ignore
      position: point, // 마커를 표시할 위치
      // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      // image : markerImage // 마커 이미지
    })
  },
  initOverlay: (content: string, map: any, marker: any) => {
    // @ts-ignore
    const overlay = new window.kakao.maps.CustomOverlay({
      content,
      map,
      position: marker.getPosition(),
    })
    return overlay
  },
}
