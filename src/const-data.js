const COLOR = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const COLORS = [
  COLOR.BLACK,
  COLOR.YELLOW,
  COLOR.BLUE,
  COLOR.GREEN,
  COLOR.PINK
];

const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const MONTH_NAMES = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const FilterType = {
  ALL: `all`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATING: `repeating`,
  TAGS: `tags`,
  TODAY: `today`
};

export {COLOR, COLORS, DAYS, MONTH_NAMES, FilterType};
