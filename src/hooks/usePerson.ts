import { useContext } from "preact/hooks";
import { HassContext } from "../contexts";

const usePerson = (id: string) => {
  const { hass } = useContext(HassContext);

  return Object.values(hass?.states || {}).find(
    (entity) => entity.entity_id === id || entity.attributes.user_id === id,
  );
}

export default usePerson;