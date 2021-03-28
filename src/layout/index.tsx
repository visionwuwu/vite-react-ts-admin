import React from 'react'
import {Layout} from 'antd'
import Content from './Content'
import Sider from './Sider'
import Header from './Header'
import RightPanel from './RightPanel'
import TagsView from './TagsView'
import {connect} from 'react-redux'
import {StoreStateProps} from 'store/reducers'
import './index.less'

interface IBaseLayoutProps {}

const BaseLayout: React.FC<IBaseLayoutProps & IProps> = props => {
  const {openTagsView} = props

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider />
      <Layout>
        <Header />
        {openTagsView ? <TagsView /> : null}
        <Content />
        <RightPanel />
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state: StoreStateProps) => ({
  openTagsView: state.settings.openTagsView,
})

type IProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(BaseLayout)
