import type { Meta, StoryObj } from '@storybook/react';

import ForbiddenPage from './ForbiddenPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta: Meta<typeof ForbiddenPage> = {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
};

type Story = StoryObj<typeof ForbiddenPage>;

export const Primary: Story = {
  render: () => <ForbiddenPage />,
};
Primary.decorators = [StoreDecorator({})];

export const PrimaryRedesigned: Story = {
  render: () => <ForbiddenPage />,
};
PrimaryRedesigned.decorators = [StoreDecorator({}), NewDesignDecorator];

export default meta;
