/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from 'antd'
import { Controller } from 'react-hook-form'
import { Form } from 'antd'

type CustomInputProps = {
  name: string
  control: any
  errors: any
  label: string
  placeholder: string
  prefixIcon?: JSX.Element
}

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  errors,
  label,
  placeholder,
  prefixIcon = null
}) => {
  return (
    <Form.Item
      label={<span className='text-lg font-medium'>{label}</span>}
      className='mb-0 mt-6 text-lg font-medium'
      hasFeedback
      validateStatus={errors[name] ? 'error' : ''}
      help={errors[name]?.message}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            size='large'
            placeholder={placeholder}
            prefix={prefixIcon}
            className='text-lg font-medium border-1 border-gray-200 rounded-md hover:border-primary-800 focus-within:shadow-custom'
          />
        )}
      />
    </Form.Item>
  )
}
