const FILTER_NAMES = [`all`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const getRandomFilter = ({name}) => {
  return {
    name,
    count: Math.floor(Math.random() * 10)
  };
};

const generateFilters = () =>
  FILTER_NAMES.map(getRandomFilter);

export {generateFilters};
