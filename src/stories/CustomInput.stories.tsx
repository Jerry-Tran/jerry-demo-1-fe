import { Meta, StoryFn } from '@storybook/react'; 
import { CustomInput } from '@/components'; 
import { useForm, Controller } from 'react-hook-form';
import { UserOutlined } from '@ant-design/icons';

type CustomInputArgs = {
  name: string;
  label: string;
  placeholder: string;
  prefixIcon?: JSX.Element;
  errors: Record<string, { message: string } | undefined>
};

const meta: Meta<typeof CustomInput> = {
  title: 'Components/CustomInput',
  component: CustomInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    errors: { control: 'object' },
  },
};

export default meta;

const Template: StoryFn<CustomInputArgs> = (args) => {
  const { control } = useForm();
  return (
    <Controller
      name={args.name}
      control={control}
      render={({ field }) => (
        <CustomInput {...args} control={control} {...field} />
      )}
    />
  );
};

export const Default = {
  render: Template,
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    prefixIcon: <UserOutlined />,
    errors: {}, 
  },
};

export const WithError = {
  render: Template,
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    prefixIcon: <UserOutlined />,
    errors: { username: { message: 'This field is required' } },
  },
};
