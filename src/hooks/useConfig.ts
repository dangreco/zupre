import store from 'store';

const useConfig = () => store((state) => state.config);

export default useConfig;
