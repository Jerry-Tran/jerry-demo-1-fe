import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Button, Modal, Pagination, Space, Table } from 'antd'
import type { GetProp, TableProps } from 'antd'
import type { SorterResult } from 'antd/es/table/interface'

import { useBoolean } from '@/hooks'

import { UserInfo } from '@/interfaces'

import { userService } from '@/services'

import { AppDispatch, RootState } from '@/store'

type ColumnsType<T extends object = object> = TableProps<T>['columns']
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>

type TableParams = {
  pagination?: TablePaginationConfig
  sortField?: SorterResult<UserInfo>['field']
  sortOrder?: SorterResult<UserInfo>['order']
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

export function ManageUsers() {
  const dispatch = useDispatch<AppDispatch>()

  const { listUsers, totalItems } = useSelector((state: RootState) => state.user)

  const { value: loading, setTrue: setLoading, setFalse: setUnloading } = useBoolean(false)

  const [activeUserId, setActiveUserId] = useState<string>('')

  const [deleteUserId, setDeleteUserId] = useState<string>('')

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20
    }
  })

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
  const handleCancelDelete = () => {
    setDeleteUserId('')
  }
  const handleCancelActive = () => {
    setActiveUserId('')
  }

  const handleDeactivateUser = async () => {
    try {
      setLoading()
      await dispatch(userService.deactivateUser(deleteUserId))
      handleCancelDelete()
    } catch (error) {
      console.error('Error deactivating user:', error)
    } finally {
      setUnloading()
    }
  }
  const handleActiveUser = async () => {
    try {
      setLoading()
      await dispatch(userService.activeUser(activeUserId))
      handleCancelActive()
    } catch (error) {
      console.error('Error deactivating user:', error)
    } finally {
      setUnloading()
    }
  }
  const handleConfirmDeactivateUser = (userId: string) => {
    setDeleteUserId(userId)
  }

  const handleConfirmActiveUser = (userId: string) => {
    setActiveUserId(userId)
  }
  const columns: ColumnsType<UserInfo> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
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
      title: 'Workspaces',
      dataIndex: 'workspacescount',
      key: 'workspaces'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        console.log('record', record)
        return (
          <Space size='middle'>
            {record.deleted ? (
              <Button type='primary' className='bg-primary-500' onClick={() => handleConfirmActiveUser(record.id)}>
                Active
              </Button>
            ) : (
              <Button type='primary' className='bg-gray-500' onClick={() => handleConfirmDeactivateUser(record.id)}>
                Deactivate
              </Button>
            )}
          </Space>
        )
      }
    }
  ]
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

  return (
    <section className='bg-gray-100'>
      <Modal
        open={!!deleteUserId}
        title='Warning'
        onCancel={handleCancelDelete}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button danger type='primary' onClick={handleDeactivateUser} loading={loading}>
              Deactivate
            </Button>
          </>
        )}
      >
        <span>This user will be deactivated. Are you sure?</span>
      </Modal>
      <Modal
        open={!!activeUserId}
        title='Warning'
        onCancel={handleCancelActive}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button type='primary' onClick={handleActiveUser} loading={loading}>
              Active
            </Button>
          </>
        )}
      >
        <span>This user will be active. Are you sure?</span>
      </Modal>
      <Table<UserInfo>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={listUsers}
        pagination={false}
        onChange={handleTableChange}
      />

      <Pagination
        className='p-4 text-center bg-white'
        current={tableParams.pagination?.current}
        showQuickJumper
        pageSize={tableParams.pagination?.pageSize}
        total={tableParams.pagination?.total}
        onChange={handlePaginationChange}
      />
    </section>
  )
}
