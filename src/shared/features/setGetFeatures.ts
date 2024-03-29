import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/app/providers/ThemeProvider/lib/ThemeContext';
import { FeatureFlags } from '../types/featureFlags';

const defaultFeatures: FeatureFlags = {
  isAppRedesigned: true,
};

let featureFlags: FeatureFlags = {
  ...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags[flag];
}

export function getAllFeatureFlags() {
  return featureFlags;
}
