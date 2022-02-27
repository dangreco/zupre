import { useContext } from 'preact/hooks';
import { HassContext } from '@contexts';

const useEntity = (id: string) => {
  const { hass } = useContext(HassContext);

  return hass?.states[id];
};

export default useEntity;
