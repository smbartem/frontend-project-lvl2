const getSpace = (depth) => {
  const space = '    ';
  return space.repeat(depth);
};

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const innerValues = Object.entries(value).flatMap(([key, val]) => `${getSpace(depth)}    ${key}: ${stringify(val, depth + 1)}`);
  return `{\n${innerValues.join('\n')}\n${getSpace(depth)}}`;
};

const stylish = (diffTree) => {
  const iter = (node, depth) => {
    const stylishValues = node.flatMap((child) => {
      switch (child.status) {
        case 'deleted':
          return `${getSpace(depth)}  - ${child.key}: ${stringify(child.value, depth + 1)}`;
        case 'added':
          return `${getSpace(depth)}  + ${child.key}: ${stringify(child.value, depth + 1)}`;
        case 'unmodified':
          return `${getSpace(depth)}    ${child.key}: ${stringify(child.value, depth + 1)}`;
        case 'modified':
          return [
            `${getSpace(depth)}  - ${child.key}: ${stringify(child.firstObjectValue, depth + 1)}`,
            `${getSpace(depth)}  + ${child.key}: ${stringify(child.secondObjectValue, depth + 1)}`,
          ];
        case 'nested':
          return `${getSpace(depth)}    ${child.key}: ${iter(child.children, depth + 1)}`;
        default:
          throw new Error(`Unknown type of status: '${child.status}'!`);
      }
    });
    return `{\n${stylishValues.join('\n')}\n${getSpace(depth)}}`;
  };
  return iter(diffTree, 0);
};

export default stylish;
