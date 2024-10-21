import { IoMdCheckmark } from '../icons'
import {
  CloudOutlined,
  SafetyOutlined,
  UserSwitchOutlined,
  ToolOutlined,
  LockOutlined,
  DashboardOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined
} from '@ant-design/icons'

export const localStorageKeys = {
  currentEmail: 'currentEmail'
}

export const environmentKeys = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_EXTENSION_URL: import.meta.env.VITE_EXTENSION_URL
}

export const features = [
  {
    title: 'Enhanced Security',
    text: 'Keep your passwords safe with encryption.',
    icon: <SafetyOutlined />
  },
  {
    title: 'Easy Sharing',
    text: 'Securely share credentials with your team members.',
    icon: <UserSwitchOutlined />
  },
  {
    title: 'Cloud Sync',
    text: 'Access your passwords from anywhere, anytime.',
    icon: <CloudOutlined />
  },
  {
    title: 'Secure Backup',
    text: 'Never lose your data with our automated backup.',
    icon: <LockOutlined />
  },
  {
    title: 'Custom Integrations',
    text: 'Integrate with other tools to enhance your workflow.',
    icon: <ToolOutlined />
  },
  {
    title: 'Activity Monitoring',
    text: 'Track all activities to prevent unauthorized access.',
    icon: <DashboardOutlined />
  }
]

export const pricingPlanItems = [
  {
    title: 'Free',
    description: 'Get started and try our service before pricing',
    price: '$0',
    features: [
      {
        icon: <IoMdCheckmark />,
        text: 'Save account'
      },
      {
        icon: <IoMdCheckmark />,
        text: 'Limited workspace'
      }
    ]
  },
  {
    title: 'Starter',
    description: 'Best option for personal use and small projects.',
    price: '$19',
    features: [
      {
        icon: <IoMdCheckmark />,
        text: 'Basic configuration'
      },
      {
        icon: <IoMdCheckmark />,
        text: 'No setup or hidden fees'
      },
      {
        icon: <IoMdCheckmark />,
        text: 'Email support'
      }
    ]
  },
  {
    title: 'Professional',
    description: 'Ideal for freelancers and growing businesses.',
    price: '$49',
    features: [
      {
        icon: <IoMdCheckmark />,
        text: 'Advanced configuration'
      },
      {
        icon: <IoMdCheckmark />,
        text: 'Priority support'
      },
      {
        icon: <IoMdCheckmark />,
        text: 'Free updates'
      }
    ]
  },
  {
    title: 'Business',
    description: 'Perfect for small to medium-sized teams.',
    price: '$99',
    features: [
      {
        icon: <IoMdCheckmark />,
        text: 'Team collaboration tools'
      },
      {
        icon: <IoMdCheckmark />,
        text: 'Premium support'
      },
      {
        icon: <IoMdCheckmark />,
        text: 'Customizable features'
      }
    ]
  }
]

export const servicesInfo = [
  {
    title: 'Key Features',
    links: [
      'Securely store login information',
      'Auto-fill passwords',
      'User information security',
      'Easy account management',
      'Remember account information across multiple devices',
      'Organize information by categories',
      'Securely share information',
      'Account usage statistics',
      'Update and sync information',
      '24/7 customer support'
    ]
  },
  {
    title: 'Others',
    links: [
      'About Us',
      'Careers',
      'Contact Us',
      'Security Solutions',
      'Technology Innovation',
      'Our Activities',
      'Partnerships',
      'Blog'
    ]
  }
]

export const socialMedias = [
  {
    href: '#facebook',
    icon: <FacebookOutlined />
  },
  {
    href: '#twitter',
    icon: <TwitterOutlined />
  },
  {
    href: '#instagram',
    icon: <InstagramOutlined />
  },
  {
    href: '#linkedin',
    icon: <LinkedinOutlined />
  }
]

export const authFields = [
  {
    label: 'Username',
    name: 'name',
    placeholder: 'Enter your name',
    type: 'text'
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Enter your email',
    type: 'text'
  },
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Enter your password',
    type: 'password'
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeholder: 'Enter your password again',
    type: 'password'
  }
]

export const profileFields = [
  {
    label: 'Avatar',
    name: 'avatar',
    placeholder: 'Enter your email',
    type: 'text'
  },
  {
    label: 'Username',
    name: 'name',
    placeholder: 'Enter your name',
    type: 'text'
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Enter your email',
    type: 'text'
  },

  {
    label: 'Phone number',
    name: 'phoneNumber',
    placeholder: 'Enter your email',
    type: 'text'
  }
]

export const changePasswordFields = [
  {
    label: 'Current password',
    name: 'currentPassword',
    placeholder: 'Enter your current password',
    type: 'password'
  },
  {
    label: 'New password',
    name: 'newPassword',
    placeholder: 'Enter your new password',
    type: 'password'
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeholder: 'Enter your password again',
    type: 'password'
  }
]
