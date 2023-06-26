import { StoryFn } from '@storybook/react';
import { setFeatureFlags } from '@/shared/features';
import { getAllFeatureFlags } from '@/shared/features/setGetFeatures';

export const NewDesignDecorator = (Story: StoryFn) => {
  setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });

  return (
    <div className='app_redesigned'>
      <Story />
    </div>
  );
};
