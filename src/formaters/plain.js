const onlyChangedUnit = (tree) => {
  const iter = (node, depth) => {
    const changedArray = node.flatMap((child) => {
      switch (child.status) {
        case 'added':
        case 'deleted':
          return { key: `${depth + child.key}.`, value: child.value, status: child.status };

        case 'modified':
          return {
            key: `${depth + child.key}.`, previousValue: child.previousValue, presentValue: child.presentValue, status: child.status,
          };

        case 'hasInnerTree':
          // eslint-disable-next-line no-case-declarations
          const newDepth = `${depth + child.key}.`;
          return iter(child.treeChild, newDepth);

        default:
          return undefined;
      }
    });
    return changedArray;
  };
  return iter(tree, '');
};

const changeObjectValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return `'${value}'`;
};

const plain = (tree) => {
  const unit = onlyChangedUnit(tree).filter((child) => child !== undefined);
  const changedArray = unit.map((child) => {
    switch (child.status) {
      case 'deleted':
        return `Property '${child.key.slice(0, child.key.length - 1)}' was removed`;
      case 'added':
        return `Property '${child.key.slice(0, child.key.length - 1)}' was added with value: ${changeObjectValue(child.value)}`;
      case 'modified':
        return `Property '${child.key.slice(0, child.key.length - 1)}' was updated. From ${changeObjectValue(child.previousValue)} to ${changeObjectValue(child.presentValue)}`;
      default:
        throw new Error('Error! Type is invalid');
    }
  });
  return `${changedArray.join('\n')}`;
};

export default plain;
