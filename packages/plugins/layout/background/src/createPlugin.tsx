import * as React from 'react';

import { BackgroundSettings } from './types/settings';
import { BackgroundState } from './types/state';
import { BackgroundProps } from './types/component';
import BackgroundComponent from './Component';
import { defaultSettings } from './default/settings';
import { PluginBase, lazyLoad } from '@react-page/core';

const Icon = lazyLoad(() => import('@material-ui/icons/CropLandscape'));

const createPlugin = (settings: BackgroundSettings) => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const plugin: PluginBase<BackgroundState> = {
    Component: (props: BackgroundProps) => (
      <BackgroundComponent {...props} {...mergedSettings} />
    ),

    id: 'ory/editor/core/layout/background',
    version: '0.0.1',

    title: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    IconComponent: <Icon />,

    createInitialChildren:
      settings.getInitialChildren ||
      (() => [[{ plugin: settings.defaultPlugin.id }]]),

    handleFocusNextHotKey: () => Promise.reject(),
    handleFocusPreviousHotKey: () => Promise.reject(),
  };
  return plugin;
};

export default createPlugin;
