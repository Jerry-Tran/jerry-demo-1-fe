import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { Form, Image, message, Upload } from 'antd'
import type { GetProp, UploadProps } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import { UploadRequestOption } from 'rc-upload/lib/interface'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { AppDispatch, RootState } from '@/store'

import { useBoolean } from '@/hooks'

import { userService } from '@/services'

import { ICurrentUser } from '@/interfaces'

import { CustomBtn, CustomInput } from '@/components'

import { profileFields } from '@/utils/constants'
import { uploadToCloudinary } from '@/utils/helpers'

import { ChangePassword } from './ChangePassword'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const profileSchema = yup.object().shape({
  name: yup.string().required('Please input your name!'),
  email: yup.string(),
  phoneNumber: yup.string().default(null)
})

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoggedIn, currentUser } = useSelector((state: RootState) => state.auth)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string>('')
  const { value: previewOpen, toggle: setPreviewOpen } = useBoolean(false)
  const { value: UploadLoading, setTrue: setUploadLoading, setFalse: setUploadUnloading } = useBoolean(false)
  const { value: loading, setTrue: setLoading, setFalse: setUnloading } = useBoolean(false)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(profileSchema)
  })

  useEffect(() => {
    setValue('name', currentUser?.name || '')
    setValue('email', currentUser?.email || '')
    setValue('phoneNumber', currentUser?.phoneNumber || '')
    setImageUrl(currentUser?.avatar || '')
  }, [currentUser, navigate, setValue])

  const handleUpdateProfile = async (profileData: Omit<ICurrentUser, 'id' | 'role' | 'email'>) => {
    try {
      setLoading()
      await dispatch(userService.updateProfile({ ...profileData, avatar: imageUrl }))
      setUnloading()
    } catch (error) {
      message.error('Update profile failed ' + error)
    } finally {
      setUploadUnloading()
    }
  }

  const handleUploadImage = async (options: UploadRequestOption) => {
    const { file } = options
    try {
      setUploadLoading()
      const uploadedUrl = await uploadToCloudinary(file as FileType)
      if (uploadedUrl) {
        setImageUrl(uploadedUrl)
        message.success('Image uploaded successfully!')
      }
    } catch (error) {
      message.error('Failed to upload image!' + error)
    } finally {
      setUploadUnloading()
    }
  }

  const handlePreviewImage = () => {
    setPreviewImage(imageUrl)
    setPreviewOpen()
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/forbidden')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <section className='flex flex-col bg-white border border-slate-200 py-6'>
      <div className='flex m-auto border-b border-gray-200 py-6 md:flex-row xs:flex-col xs:px-2'>
        <article className='flex flex-col justify-start mt-6 mr-6 text-slate-800 text-lg'>
          <h3 className='font-semibold'>Personal information</h3>
          <span>Use a permanent address where you can receive mail.</span>
        </article>
        <Form
          className='md:min-w-[400px] lg:min-w-[500px]'
          onSubmitCapture={handleSubmit(handleUpdateProfile)}
          layout='vertical'
        >
          {profileFields.map((field) => {
            return field.name === 'avatar' ? (
              <div key={field.name} className='flex flex-col justify-center items-center'>
                <Upload
                  name='avatar'
                  listType='picture-card'
                  showUploadList={false}
                  className='!flex !justify-center'
                  customRequest={handleUploadImage}
                >
                  {imageUrl ? (
                    <div className='relative w-full h-full'>
                      <img src={imageUrl} alt='avatar' className='w-full h-full rounded-md' />
                    </div>
                  ) : (
                    <button className='flex flex-col items-center justify-between border-0 outline-none' type='button'>
                      {UploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                      <span className='mt-2 text-lg text-slate-800'>Upload</span>
                    </button>
                  )}
                </Upload>
                {imageUrl && (
                  <button
                    className='w-[102px] text-lg bg-[#fafafa] mt-2 p-2 rounded-md'
                    onClick={handlePreviewImage}
                    type='button'
                  >
                    Preview
                  </button>
                )}
              </div>
            ) : (
              <CustomInput
                key={field.name}
                name={field.name}
                size='large'
                type={field.type}
                disabled={field.name === 'email'}
                label={field.label}
                control={control}
                errors={errors}
                placeholder={field.placeholder}
              />
            )
          })}

          <CustomBtn title='Save' type='primary' htmlType='submit' disabled={loading} loading={loading} />
        </Form>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: setPreviewOpen,
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}

      <ChangePassword />
    </section>
  )
}
