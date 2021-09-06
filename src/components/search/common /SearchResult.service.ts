import * as querystring from 'querystring'

import axios from 'axios'

import { DevConfig } from '../../../config/dev/config-dev'
import { RealConfig } from '../../../config/real/config-real'
import { StoreModel } from '../../../types/store/store.types'

export const SearchResultService = {
  fetchStores: (
    payType: string | undefined,
    storeType: string | undefined,
    keyword: string | undefined,
    setStoreDummy: any,
  ) => {
    let url = `${RealConfig.apiHost}/stores?`
    let postUrl = ''
    if (storeType === 'ALL') {
      postUrl = querystring.stringify({
        pay_type: payType,
        keyword,
      })
    } else {
      postUrl = querystring.stringify({
        pay_type: payType,
        store_type: storeType,
        keyword,
      })
    }

    url += postUrl

    axios.get(url).then((r) => {
      setStoreDummy(r.data.slice(0, 200).filter((s: StoreModel) => s.latitude && s.longitude))
    })
  },
}
