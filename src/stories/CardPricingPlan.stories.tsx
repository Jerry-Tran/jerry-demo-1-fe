import type { Meta, StoryObj } from '@storybook/react';

import { CardPricingPlan } from '@/components';

import { IPricingPlanItem } from '@/interfaces';

import { IoMdCheckmark } from '@/utils/icons'


const meta: Meta<typeof CardPricingPlan> = {
  title: 'Components/CardPricingPlan',
  component: CardPricingPlan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const pricingPlanItem: IPricingPlanItem = {
  title: 'Basic Plan',
  description: 'This is a basic plan for individuals.',
  price: '$10',
  features: [
    { text: 'Feature 1', icon: <IoMdCheckmark/> },
    { text: 'Feature 2', icon: <IoMdCheckmark/> },
    { text: 'Feature 3', icon: <IoMdCheckmark/> },
  ],
};

export const Default: Story = {
  args: {
    pricingPlanItem,
  },
};

export const Premium: Story = {
  args: {
    pricingPlanItem: {
      ...pricingPlanItem,
      title: 'Premium Plan',
      description: 'This is a premium plan for businesses.',
      price: '$30',
      features: [
        { text: 'Feature 1', icon: <IoMdCheckmark/> },
        { text: 'Feature 2', icon: <IoMdCheckmark/> },
        { text: 'Feature 3', icon: <IoMdCheckmark/> },
        { text: 'Feature 4', icon: <IoMdCheckmark/> },
      ],
    },
  },
};
