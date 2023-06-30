import { Preview } from '@storybook/react';

import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import {
  SuspenseDecorator,
} from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import {
  FeatureFlagsDecorator,
} from '../../src/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { Theme } from '../../src/shared/const/theme';
import { StoreDecorator } from '../../src/shared/config/storybook/StoreDecorator/StoreDecorator';

const preview: Preview = {
  decorators: [
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT),
    RouterDecorator,
    SuspenseDecorator,
    FeatureFlagsDecorator({}),
    StoreDecorator({}),
  ],
};

export default preview;
