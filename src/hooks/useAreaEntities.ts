import { HomeAssistant } from 'custom-card-helpers';
import { useEffect, useState } from 'preact/hooks';
import useHass from './useHass';
import useEntities from './useEntities';

async function fetchEntities(hass: HomeAssistant): Promise<any[]> {
  return hass.callWS({ type: 'config/entity_registry/list' });
}

async function fetchDevices(hass: HomeAssistant): Promise<any[]> {
  return hass.callWS({ type: 'config/device_registry/list' });
}

/**
 * same as useEntities but fetches from an area by its id
 */
const useAreaEntities = (areaId: string | null) => {
  const hass = useHass();
  const [entityIds, setEntityIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!hass || !areaId) return;

      const entities = await fetchEntities(hass);
      const devices = await fetchDevices(hass);

      const devicesInArea = devices
        .filter((device) => device.area_id === areaId)
        .map((device) => device.id);

      const relevantEntities = entities.filter(
        // eslint-disable-next-line comma-dangle
        (entity) => devicesInArea.includes(entity.device_id)
      );

      setEntityIds(relevantEntities.map((entity) => entity.entity_id));
    };

    fetchData();
  }, [hass, areaId]);

  return useEntities(entityIds);
};

export default useAreaEntities;
