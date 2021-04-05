import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {Button, Drawer, Form, Row, Col} from 'antd'
import VBasicFormItem, {IFormItemProps} from '../vBasicForm/components/FromItem'
import {FormContext} from '../vBasicForm/index'

/** 暴露到外部的属性 */
export interface DrawerFormImperative {
  /** 打开表单抽屉的回调 */
  openFormDrawer: (handleSubmit: (values: any) => void, editData?: any) => void
  /** 关闭表单抽屉的回调 */
  closeFormDrawer: () => void
}

/** 表单抽屉属性 */
interface IVBasicDrawerFormProps {
  /** 组件引用 */
  ref: any
  /** 标题 */
  title?: string
  /** 宽度 */
  width?: number
  /** 表单字段项 */
  formItems: IFormItemProps[]
  /** 自定义页脚 */
  cusformFooter?: React.ReactNode
}
/* eslint-disable-next-line */
const VBasicDrawerForm: React.FC<IVBasicDrawerFormProps> = forwardRef(
  (props, ref) => {
    /** 解构props */
    const {title, formItems, cusformFooter, width} = props
    const [visible, setVisible] = useState(false)
    const [editData, setEditData] = useState()
    const [closeFlag, setCloseFlag] = useState(false)
    /* eslint-disable-next-line */
    const submitFnRef = useRef((values: any) => {
      return
    })
    /** 从VBasicForm组件的context得到表单实例 */
    const [form] = Form.useForm()

    /** 处理关闭表单抽屉 */
    const handleCloseDrawer = () => {
      setVisible(false)
      setCloseFlag(true)
    }

    /** 处理点击抽屉页脚取消按钮 */
    const handleClickCancel = () => {
      handleCloseDrawer()
    }

    /** 处理点击抽屉页脚提交按钮 */
    const handleClickSubmit = () => {
      form.validateFields().then(values => {
        submitFnRef.current(values)
        handleCloseDrawer()
      })
    }

    /** 抽屉标题 */
    const drawerTitle = useMemo(() => {
      return editData ? '修改' + title : '添加' + title
    }, [title])

    /** 生成最终有用的FormItem字段 */
    const generatorFormFields = useMemo(() => {
      return formItems.map(item => {
        const {name, value} = item
        /** 编辑数据 */
        if (editData) {
          form.setFieldsValue({[name]: editData![name]})
          return {...item, value: editData![name]}
        }
        /** 新增数据 */
        form.setFieldsValue({[name]: value || ''})
        return {...item, value: value || ''}
      })
    }, [editData, formItems, closeFlag])

    /** 渲染表单项 */
    const renderFormItems = () => {
      /** 格式化数组将其变为偶数项 */
      const formatItems =
        generatorFormFields.length % 2 === 0
          ? generatorFormFields
          : [...generatorFormFields, null]
      /** 用于存储每行表单项 */
      const rowItems: any[] = []
      let i = 0
      while (i < formatItems.length) {
        /** 每次截取俩项 */
        const sliceArr = formatItems.slice(i, i + 2)
        let rowContent: React.ReactNode = null
        /** 生成当前表单项，如果其中一项为null，单行显示，否则俩个为一行 */
        const column1 = sliceArr[0]
        const column2 = sliceArr[1]
        rowContent = (
          <Row gutter={16} key={i}>
            <Col span={column2 ? 12 : 24}>
              <VBasicFormItem key={column1!.name} {...column1!} />
            </Col>
            {column2 ? (
              <Col span={12}>
                <VBasicFormItem key={column2?.name} {...column2} />
              </Col>
            ) : null}
          </Row>
        )
        rowItems.push(rowContent)
        /** 截取完后，指针先前移俩位 */
        i += 2
      }
      return rowItems.map(row => row)
    }

    /** 渲染抽屉页脚 */
    const renderFooter = useMemo(() => {
      return (
        cusformFooter || (
          <div style={{textAlign: 'right'}}>
            <Button onClick={handleClickCancel} className="mx-3">
              取消
            </Button>
            <Button type="primary" onClick={handleClickSubmit}>
              提交
            </Button>
          </div>
        )
      )
    }, [cusformFooter])

    /** 暴露组件属性 */
    useImperativeHandle<unknown, DrawerFormImperative>(ref, () => {
      return {
        openFormDrawer: (submitCallback, editData) => {
          submitFnRef.current = submitCallback
          setEditData(editData)
          setVisible(true)
          setCloseFlag(false)
        },
        closeFormDrawer: () => {
          handleCloseDrawer()
        },
      }
    })
    return (
      <Drawer
        visible={visible}
        title={drawerTitle}
        width={width}
        onClose={handleCloseDrawer}
        footer={renderFooter}
        bodyStyle={{paddingBottom: 80}}
      >
        <FormContext.Provider value={{form, closeFlag}}>
          <Form form={form} layout="vertical" hideRequiredMark>
            {renderFormItems()}
          </Form>
        </FormContext.Provider>
      </Drawer>
    )
  },
)

VBasicDrawerForm.defaultProps = {
  title: '抽屉表单',
  width: 720,
}

export default memo(VBasicDrawerForm)
