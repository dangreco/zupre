import { createContext } from 'preact';
import { HomeAssistant } from 'custom-card-helpers';

interface HassContextValues {
  hass?: HomeAssistant;
  config?: any;
}

const HassContext = createContext<HassContextValues>({ });

export default HassContext;
