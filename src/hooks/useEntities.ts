import { useCallback } from 'preact/hooks';
import store from 'store';

const useEntities = (entityIds: string[]) => store(
  useCallback(
    ({ hass }) => Object.fromEntries(
      entityIds.map(
        (id) => [id, hass?.states[id]],
      ),
    ),
    [entityIds],
  ),
);

export default useEntities;
