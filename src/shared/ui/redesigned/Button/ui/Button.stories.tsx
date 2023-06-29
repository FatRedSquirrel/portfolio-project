import { Meta, StoryFn } from '@storybook/react';
import { Button } from './Button';
import { Icon } from '../../Icon';

export default {
  title: 'shared/redesigned/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

const children = 'Lorem, ipsum dolor.';

export const Clear = Template.bind({});
Clear.args = {
  variant: 'clear',
  children,
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outline',
  children,
};

export const Filled = Template.bind({});
Filled.args = {
  variant: 'filled',
  children,
};

export const Negative = Template.bind({});
Negative.args = {
  variant: 'negative',
  children,
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children,
};

export const WithAddonRight = Template.bind({});
WithAddonRight.args = {
  variant: 'filled',
  addonRight:
  <Icon
    Svg={() => (
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.3624 12.7738C9.96648 13.1588 9.95762 13.7919 10.3426 14.1879L15.2227 19.2064C15.4337 19.4234 15.7193 19.5242 15.9996 19.5075C16.2798 19.5242 16.5654 19.4234 16.7765 19.2064L21.6565 14.1879C22.0415 13.7919 22.0327 13.1588 21.6367 12.7738C21.2408 12.3888 20.6077 12.3976 20.2227 12.7936L15.9996 17.1365L11.7765 12.7936C11.3915 12.3976 10.7584 12.3888 10.3624 12.7738Z" fill="currentColor" />
      </svg>
    )}
  />,
  children,
};

export const WithAddonLeft = Template.bind({});
WithAddonLeft.args = {
  variant: 'filled',
  addonLeft:
  <Icon
    Svg={() => (
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.3624 12.7738C9.96648 13.1588 9.95762 13.7919 10.3426 14.1879L15.2227 19.2064C15.4337 19.4234 15.7193 19.5242 15.9996 19.5075C16.2798 19.5242 16.5654 19.4234 16.7765 19.2064L21.6565 14.1879C22.0415 13.7919 22.0327 13.1588 21.6367 12.7738C21.2408 12.3888 20.6077 12.3976 20.2227 12.7936L15.9996 17.1365L11.7765 12.7936C11.3915 12.3976 10.7584 12.3888 10.3624 12.7738Z" fill="currentColor" />
      </svg>
    )}
  />,
  children,
};

export const SizeM = Template.bind({});
SizeM.args = {
  variant: 'outline',
  size: 'm',
  children,
};

export const SizeL = Template.bind({});
SizeL.args = {
  variant: 'outline',
  size: 'l',
  children,
};

export const SizeXl = Template.bind({});
SizeXl.args = {
  variant: 'outline',
  size: 'xl',
  children,
};

// export type ButtonVariant = 'clear' | 'outline' | 'filled' | 'negative' | 'success';

// export type ButtonSize = 'm' | 'l' | 'xl';
