import type { GetProp, UploadProps } from 'antd'
import axios from 'axios'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const uploadToCloudinary = async (file: FileType): Promise<string | null> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', import.meta.env.VITE_UPLOAD_ASSETS_NAME || '')

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload/`,
      formData
    )
    console.log('upload', response)
    if (response?.data.secure_url) {
      return response?.data.secure_url
    } else {
      throw new Error('Failed to upload image to Cloudinary')
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}
