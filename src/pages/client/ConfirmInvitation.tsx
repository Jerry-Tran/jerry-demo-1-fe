import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/store'

import { workspaceSharingService } from '@/services'

import { CustomBtn, CustomError } from '@/components'

import { environmentKeys } from '@/utils/constants'

export const ConfirmInvitation = () => {
  const { inviteId } = useParams<{ inviteId: string }>()
  const dispatch = useDispatch<AppDispatch>()

  const { error, message } = useSelector((state: RootState) => state.workspaceSharing)

  useEffect(() => {
    if (inviteId) {
      dispatch(workspaceSharingService.confirmInvitationToWorkspace(inviteId))
    }
  }, [inviteId, dispatch])

  const handleOpenExtension = () => {
    window.open(environmentKeys.VITE_EXTENSION_URL)
  }
  return (
    <section className='flex min-h-screen'>
      <div className='m-auto'>
        {error && error === 'USER_NOT_FOUND' ? (
          <CustomError
            status='error'
            title='Your email has not been registered'
            subTitle='Please register a credential to use our service'
            extra={[
              <>
                <CustomBtn title='Register' to='/register' type='primary' className='!w-[120px]' />
              </>
            ]}
          />
        ) : error ? (
          <CustomError
            status='error'
            title='Confirm invitation failed'
            subTitle={message}
            extra={[
              <>
                <CustomBtn title='Back home' to='/' type='primary' className='!w-[120px]' />
              </>
            ]}
          />
        ) : (
          <CustomError
            status='success'
            title='Invitation Confirmed!'
            subTitle=' Congratulations! You accepted successfully. You can now proceed to extension and enjoy the platform.'
            extra={[
              <>
                <CustomBtn title='Go to extension' type='primary' onClick={handleOpenExtension} />
              </>
            ]}
          />
        )}
      </div>
    </section>
  )
}
