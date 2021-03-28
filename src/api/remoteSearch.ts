import {AxiosResponse} from 'axios'
import request from 'utils/request'

enum RemoteSearch {
  remoteSearch = '/transaction/list',
}

export function remoteSearch<T>(): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RemoteSearch.remoteSearch,
    method: 'get',
  })
}
