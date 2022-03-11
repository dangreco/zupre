import { useEffect, useState } from 'preact/hooks';
import store from 'store';
import useEntity from './useEntity';

interface Datum {
  last_changed: Date;
  state: string;
}

interface HistoryConfig {
  start?: Date;
  end?: Date;
}

const useHistory = (entityId: string, config?: HistoryConfig) => {
  const entity = useEntity(entityId);
  const hass = store((state) => state.hass);
  const [history, setHistory] = useState<Datum[]>([]);

  const loadHistory = async () => {
    let url = 'history/period';
    if (config?.start) url += `/${config?.start.toISOString()}`;
    url += `?filter_entity_id=${entityId}`;
    if (config?.end) url += `&end_time=${config?.end.toISOString()}`;
    url += '&minimal_response';

    const [data] = await hass.callApi('GET', url);

    setHistory((h) => [
      ...h,
      ...data.map(
        (datum: any) => ({
          ...datum,
          last_changed: new Date(datum.last_changed),
        }),
      ),
    ]);
  };

  useEffect(() => {
    if (hass && !history.length) {
      loadHistory();
    }
  }, [entityId, hass]);

  useEffect(() => {
    if (!entity) return;

    setHistory((h) => [
      ...h,
      {
        last_changed: new Date(entity.last_changed),
        state: entity.state,
      },
    ]);
  }, [entity]);

  return {
    history,
    entity,
  };
};

export default useHistory;
