import { StoryFn } from '@storybook/react';
import { setFeatureFlags } from '@/shared/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeatureFlagsDecorator = (features: FeatureFlags) => (Story: StoryFn) => {
  setFeatureFlags(features);

  return <Story />;
};
