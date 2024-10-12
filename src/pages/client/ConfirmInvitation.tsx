import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import { CheckCircleOutlined } from '@ant-design/icons'

import { AppDispatch, RootState } from '@/store'

import { workspaceSharingService } from '@/services'

import { CustomBtn } from '@/components'

import { environmentKeys } from '@/utils/constants'

export const ConfirmInvitation = () => {
  const { inviteId } = useParams<{ inviteId: string }>()
  const dispatch = useDispatch<AppDispatch>()

  const errorResponse = useSelector((state: RootState) => state.workspaceSharing)

  useEffect(() => {
    if (inviteId) {
      dispatch(workspaceSharingService.confirmInvitationToWorkspace(inviteId))
    }
  }, [inviteId, dispatch, errorResponse])

  const handleOpenExtension = () => {
    window.open(environmentKeys.VITE_EXTENSION_URL)
  }
  return (
    <section>
      {errorResponse.error === 'USER_NOT_FOUND' ? (
        <div className='relative z-10 text-center p-6 bg-white/30 rounded-lg shadow-lg'>
          <h1 className='text-5xl font-extrabold text-white mb-4 drop-shadow-lg'>X Your email hasn't registered! X</h1>
          <span className='text-lg text-white mb-6'>Please register a credential to use our service</span>
          <br />
          <CustomBtn
            type='primary'
            to={`/register`}
            title='Click to register'
            className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold transition duration-300 ease-in-out hover:!from-pink-500 hover:!to-orange-500 hover:text-white mt-2'
          />
        </div>
      ) : (
        <div className='min-h-screen flex items-center justify-center bg-white'>
          <div className='bg-white p-10 rounded-md shadow-lg flex flex-col items-center border border-gray-100'>
            <CheckCircleOutlined className='text-green-500 text-6xl mb-4' />
            <h1 className='text-3xl font-bold text-gray-800 mb-4'>Invitation Confirmed!</h1>
            <span className='text-lg text-center text-gray-600 mb-4'>
              Congratulations! You accepted successfully. You can now proceed to extension and enjoy the
              platform.
            </span>

            <CustomBtn title='Go to extension' type='primary' onClick={handleOpenExtension} />
          </div>
        </div>
      )}
    </section>
  )
}
