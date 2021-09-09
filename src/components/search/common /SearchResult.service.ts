import * as querystring from 'querystring'

import axios from 'axios'

import { RealConfig } from '../../../config/real/config-real'
import { StoreModel } from '../../../types/store/store.types'

export const SearchResultService = {
  fetchStores: (
    payType: string | undefined,
    storeType: string | undefined,
    keyword: string | undefined,
    setStore: any,
  ) => {
    let url = `${RealConfig.apiHost}/stores?`
    let postUrl = ''
    if (storeType === 'ALL') {
      if (keyword) {
        postUrl = querystring.stringify({
          pay_type: payType,
          keyword,
        })
      } else {
        postUrl = querystring.stringify({
          pay_type: payType,
        })
      }
    } else if (keyword) {
      postUrl = querystring.stringify({
        pay_type: payType,
        store_type: storeType,
        keyword,
      })
    } else {
      postUrl = querystring.stringify({
        pay_type: payType,
        store_type: storeType,
      })
    }

    url += postUrl

    axios.get(url).then((r) => {
      setStore(r.data.length === 0 ? [] : r.data.filter((s: StoreModel) => s.latitude && s.longitude))
    })
  },
}
