const FILTER_NAMES = [`all`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateFilters};
