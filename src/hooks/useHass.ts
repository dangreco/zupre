import store from 'store';

const useHass = () => store(({ hass }) => hass);

export default useHass;
