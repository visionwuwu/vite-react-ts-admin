import React from 'react'
import {
  DashboardOutlined,
  FileOutlined,
  SearchOutlined,
  LockOutlined,
  ClusterOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  UpCircleTwoTone,
  CaretDownOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  CopyOutlined,
  NotificationOutlined,
  MoreOutlined,
  RightOutlined,
  DownOutlined,
  RedoOutlined,
  ColumnHeightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  CloseOutlined,
  DeleteOutlined,
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  PayCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'

export type IconName =
  | 'HomeOutlined'
  | 'DashboardOutlined'
  | 'FileOutlined'
  | 'SearchOutlined'
  | 'LockOutlined'
  | 'ClusterOutlined'
  | 'ClusterOutlined'
  | 'UserOutlined'
  | 'SettingOutlined'
  | 'UpCircleTwoTone'
  | 'CaretDownOutlined'
  | 'QuestionCircleOutlined'
  | 'GlobalOutlined'
  | 'CopyOutlined'
  | 'NotificationOutlined'
  | 'MoreOutlined'
  | 'RightOutlined'
  | 'DownOutlined'
  | 'RedoOutlined'
  | 'ColumnHeightOutlined'
  | 'FullscreenExitOutlined'
  | 'FullscreenOutlined'
  | 'CloseOutlined'
  | 'DeleteOutlined'
  | 'FormOutlined'
  | 'MenuFoldOutlined'
  | 'MenuUnfoldOutlined'
  | 'MessageOutlined'
  | 'PayCircleOutlined'
  | 'ShoppingCartOutlined'

type AntdIconsProps = {
  [key in IconName]: any
}

const AntdIcons: AntdIconsProps = {
  HomeOutlined: <HomeOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  FileOutlined: <FileOutlined />,
  SearchOutlined: <SearchOutlined />,
  LockOutlined: <LockOutlined />,
  ClusterOutlined: <ClusterOutlined />,
  UserOutlined: <UserOutlined />,
  SettingOutlined: <SettingOutlined />,
  UpCircleTwoTone: <UpCircleTwoTone />,
  CaretDownOutlined: <CaretDownOutlined />,
  QuestionCircleOutlined: <QuestionCircleOutlined />,
  GlobalOutlined: <GlobalOutlined />,
  CopyOutlined: <CopyOutlined />,
  NotificationOutlined: <NotificationOutlined />,
  MoreOutlined: <MoreOutlined />,
  RightOutlined: <RightOutlined />,
  DownOutlined: <DownOutlined />,
  RedoOutlined: <RedoOutlined />,
  ColumnHeightOutlined: <ColumnHeightOutlined />,
  FullscreenExitOutlined: <FullscreenExitOutlined />,
  FullscreenOutlined: <FullscreenOutlined />,
  CloseOutlined: <CloseOutlined />,
  DeleteOutlined: <DeleteOutlined />,
  FormOutlined: <FormOutlined />,
  MenuFoldOutlined: <MenuFoldOutlined />,
  MenuUnfoldOutlined: <MenuUnfoldOutlined />,
  MessageOutlined: <MessageOutlined />,
  PayCircleOutlined: <PayCircleOutlined />,
  ShoppingCartOutlined: <ShoppingCartOutlined />,
}

export default AntdIcons
