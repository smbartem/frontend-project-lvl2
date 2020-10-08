const getSpace = (depth) => {
  const space = '    ';
  return space.repeat(depth);
};

const stringify = (value, depth) => {
  if (typeof value !== 'object') {
    return value;
  }
  const innerValues = Object.entries(value).flatMap(([key, val]) => {
    if (typeof val !== 'object') {
      return `${getSpace(depth + 2)}${key}: ${val}`;
    }
    return `${getSpace(depth + 2)}${key}: ${stringify(val, depth + 1)}`;
  });
  return `{\n${innerValues.join('\n')}\n${getSpace(depth + 1)}}`;
};

const stylish = (diffTree) => {
  const iter = (node, depth) => {
    const stylishValues = node.flatMap((child) => {
      switch (child.status) {
        case 'deleted':
          return `${getSpace(depth)}  - ${child.key}: ${stringify(child.value, depth)}`;
        case 'added':
          return `${getSpace(depth)}  + ${child.key}: ${stringify(child.value, depth)}`;
        case 'unmodified':
          return `${getSpace(depth)}    ${child.key}: ${stringify(child.value, depth)}`;
        case 'modified':
          return [
            `${getSpace(depth)}  - ${child.key}: ${stringify(child.firstObjectValue, depth)}`,
            `${getSpace(depth)}  + ${child.key}: ${stringify(child.secondObjectValue, depth)}`,
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
