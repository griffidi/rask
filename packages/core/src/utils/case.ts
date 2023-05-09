export const toKebabCase = (value: string) => {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const toCamelCase = (value: string) => {
  return value.toLowerCase().replace(/(\-\w)/g, m => m[1].toUpperCase());
};

export const toDotCase = (value: string) => {
  return value
    .replace(/(?!^)([A-Z])/g, ' $1')
    .replace(/[_\s]+(?=[a-zA-Z])/g, '.')
    .toLowerCase();
};
