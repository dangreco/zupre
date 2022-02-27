import { useContext } from 'preact/hooks';
import { HassContext } from '@contexts';

const useUser = () => {
  const { hass } = useContext(HassContext);

  return hass?.user;
};

export default useUser;
