import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Pagination, Space, Table } from 'antd'
import type { GetProp, TableProps } from 'antd'
import type { SorterResult } from 'antd/es/table/interface'

import { userService } from '@/services'
import { UserInfo } from '@/interfaces'
import { AppDispatch, RootState } from '@/store'
import { useBoolean } from '@/hooks'

type ColumnsType<T extends object = object> = TableProps<T>['columns']
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: SorterResult<UserInfo>['field']
  sortOrder?: SorterResult<UserInfo>['order']
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

const columns: ColumnsType<UserInfo> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <span>{text}</span>
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Accounts',
    dataIndex: 'accountscount',
    key: 'accounts'
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size='middle'>
        <Button type='primary' danger>
          Block
        </Button>
      </Space>
    )
  }
]

export function ManageUsers() {
  const dispatch = useDispatch<AppDispatch>()

  const { listUsers, totalItems } = useSelector((state: RootState) => state.user)

  const { value: loading, setTrue: setLoading, setFalse: setUnloading } = useBoolean(false)

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 1
    }
  })

  useEffect(() => {
    const fetchData = () => {
      const { current, pageSize } = tableParams.pagination || {}
      setLoading()
      dispatch(
        userService.getUsers({
          page: current || 1,
          limit: pageSize || 1
        })
      )
      setUnloading()
    }
    fetchData()
  }, [dispatch, setLoading, setUnloading, tableParams])

  const handleTableChange: TableProps<UserInfo>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: pagination.current,
        pageSize: pagination.pageSize
      },
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field
    })
  }

  useEffect(() => {
    if (totalItems) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: totalItems
        }
      }))
    }
  }, [totalItems])

  const handlePaginationChange = (page: number, pageSize: number) => {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: page,
        pageSize
      }
    }))
  }

  return (
    <>
      <Table<UserInfo>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={listUsers}
        loading={loading}
        pagination={false}
        onChange={handleTableChange}
      />

      <Pagination
        style={{ marginTop: 16, textAlign: 'center' }}
        current={tableParams.pagination?.current}
        showQuickJumper
        pageSize={tableParams.pagination?.pageSize}
        total={tableParams.pagination?.total}
        onChange={handlePaginationChange}
      />
    </>
  )
}
