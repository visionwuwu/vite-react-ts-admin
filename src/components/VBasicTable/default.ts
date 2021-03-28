import {TablePaginationConfig} from 'antd/lib/table/interface'

export const defaultPagination: TablePaginationConfig = {
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `共 ${total} 条数据`,
  showTitle: true,
}
