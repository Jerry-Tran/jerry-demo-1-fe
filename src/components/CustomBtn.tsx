import { Button, Spin } from 'antd'
import { Link } from 'react-router-dom'

type ButtonProps = {
  title: string
  type?: 'default' | 'primary' | 'link' | 'text'
  className?: string
  to?: string
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  backgroundColor?: string
  children?: JSX.Element
}

export const CustomBtn = ({
  title,
  type = 'default',
  className = '',
  to = '',
  htmlType,
  onClick,
  disabled = false,
  loading = false,
  backgroundColor,
  children
}: ButtonProps) => {
  const btnClass = `w-full h-12 text-lg mt-4 font-semibold rounded-md bg-primary-800
    ${type !== 'primary' ? 'bg-white !text-primary-800 border-primary-800' : 'text-white hover:!bg-blue-700 '} 
    ${disabled ? 'disabled:bg-primary-800 disabled:text-white disabled:opacity-70 disabled:cursor-not-allowed' : ''} 
    ${className}`

  return to ? (
    <Button
      htmlType={htmlType}
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor }}
    >
      <Link to={to}>{loading ? <Spin className='text-rose-600' /> : title}</Link>
      {children}
    </Button>
  ) : (
    <Button
      htmlType={htmlType}
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor }}
    >
      {loading ? <Spin className='text-rose-600' /> : title}
      {children}
    </Button>
  )
}
