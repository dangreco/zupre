import create from 'zustand';
import { HomeAssistant } from 'custom-card-helpers';
import { Config } from 'types';

interface Store {
  hass?: HomeAssistant;
  config?: Config;
}

const store = create<Store>(() => ({}));

export default store;
