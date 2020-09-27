const getSpace = (depth) => {
  const space = '    ';
  return space.repeat(depth);
};

const nestedValueToString = (object, depth1) => {
  const iter = (node, depth2) => {
    const innerValue = Object.entries(node).flatMap(([key, val]) => {
      if (typeof val !== 'object') {
        return `${getSpace(depth2 + 1)}${key}: ${val}`;
      }
      return `${getSpace(depth2 + 1)}${key}: ${iter(val, depth2 + 1)}`;
    });
    return `{\n${innerValue.join('\n')}\n${getSpace(depth2)}}`;
  };
  return iter(object, depth1);
};

const formatValue = (value, depth) => {
  if (typeof value === 'object') {
    return nestedValueToString(value, depth + 1);
  }
  return value;
};

const stylish = (diffTree) => {
  const iter = (node, depth) => {
    const stylishValue = node.flatMap((child) => {
      switch (child.status) {
        case 'deleted':
          return `${getSpace(depth)}  - ${child.key}: ${formatValue(child.value, depth)}`;
        case 'added':
          return `${getSpace(depth)}  + ${child.key}: ${formatValue(child.value, depth)}`;
        case 'unmodified':
          return `${getSpace(depth)}    ${child.key}: ${formatValue(child.value, depth)}`;
        case 'modified':
          return [
            `${getSpace(depth)}  - ${child.key}: ${formatValue(child.previousValue, depth)}`,
            `${getSpace(depth)}  + ${child.key}: ${formatValue(child.presentValue, depth)}`,
          ];
        case 'nested':
          return `${getSpace(depth)}    ${child.key}: ${iter(child.treeChild, depth + 1)}`;
        default:
          throw new Error('Error! Type is invalid');
      }
    });
    return `{\n${stylishValue.join('\n')}\n${getSpace(depth)}}`;
  };
  return iter(diffTree, 0);
};

export default stylish;
