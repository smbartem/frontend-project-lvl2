const gap = 2;
const getSpace = (qty) => {
  const space = ' ';
  return space.repeat(qty);
};

const formatValue = (value, space) => {
  const objectToString = (object, space2) => {
    const iter = (node, space3) => {
      const entries = Object.entries(node);
      const result = entries.flatMap((child) => {
        const [key, val] = child;
        if (typeof val !== 'object') {
          return `${getSpace(space3 + gap)}${key}: ${val}`;
        }
        return `${getSpace(space3 + gap)}${key}: ${iter(val, space3 + gap + gap)}`;
      });
      return `{\n${result.join('\n')}\n${getSpace(space3 - gap)}}`;
    };
    return iter(object, space2 + gap);
  };
  const result = (typeof value !== 'object') ? value : objectToString(value, space + gap);
  return result;
};

const stylish = (diffTree) => {
  const iter = (node, depth) => {
    const space = depth * gap;
    const treeOfString = node.flatMap((child) => {
      switch (child.status) {
        case 'deleted':
          return `${getSpace(space)}- ${child.key}: ${formatValue(child.value, space)}`;
        case 'added':
          return `${getSpace(space)}+ ${child.key}: ${formatValue(child.value, space)}`;
        case 'unmodified':
          return `${getSpace(space)}  ${child.key}: ${formatValue(child.value, space)}`;
        case 'modified':
          return [`${getSpace(space)}- ${child.key}: ${formatValue(child.previousValue, space)}`, `${getSpace(space)}+ ${child.key}: ${formatValue(child.presentValue, space)}`];
        case 'hasInnerTree':
          return `${getSpace(space)}  ${child.key}: ${iter(child.treeChild, depth + gap)}`;
        default:
          throw new Error('Error! Type is invalid');
      }
    });
    return `{\n${treeOfString.join('\n')}\n${getSpace(space - gap)}}`;
  };
  return iter(diffTree, 1);
};

export default stylish;
