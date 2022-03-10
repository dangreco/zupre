import store from 'store';
import { useCallback } from 'preact/hooks';

const useEntity = (entityId: string) => store(
  useCallback(
    ({ hass }) => hass?.states[entityId],
    [entityId],
  ),
);

export default useEntity;
