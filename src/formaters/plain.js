const changeObjectValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return `'${value}'`;
};

const makePlainView = (tree) => {
  const iter = (node, parentKey) => {
    const result = node.flatMap((child) => {
      const keyPath = `${parentKey}${child.key}`;
      switch (child.status) {
        case 'added':
          return `Property '${keyPath}' was added with value: ${changeObjectValue(child.value)}`;
        case 'deleted':
          return `Property '${keyPath}' was removed`;
        case 'modified':
          return `Property '${keyPath}' was updated. From ${changeObjectValue(child.previousValue)} to ${changeObjectValue(child.presentValue)}`;
        case 'unmodified':
          return [];
        case 'nested':
          return iter(child.treeChild, `${keyPath}.`);
        default:
          throw new Error(`Unknown type of status: '${child.status}'!`);
      }
    });
    return result.filter((item) => item !== null);
  };
  return iter(tree, '');
};

export default (tree) => makePlainView(tree).join('\n');
