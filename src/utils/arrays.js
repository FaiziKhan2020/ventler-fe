import uuid from 'react-uuid';

export const addDataToId = (arr, id, children) => {
  const newArr = [...arr];
  newArr.forEach((node) => {
    if (node.id === id) {
      node.children = [...(node.children || []), ...children];
    } else {
      addDataToId(node.children || [], id, children);
    }
  });
  return newArr;
};

function mapMyFilesStringsToMap(vectorstores) {
  const obj = {};
  vectorstores.forEach(function ({ path }) {
    path.split('/').reduce(function (r, e) {
      return r[e] || (r[e] = {});
    }, obj);
  });
  return obj;
}
function mapToArray(node, level = 0, parentNodeId) {
  return Object.entries(node).map(([k, v]) => {
    const id = uuid();
    const path = `${parentNodeId}/${k}`;
    return Object.values(v).length > 0
      ? {
          id,
          path,
          isPublic: true,
          title: k,
          children: mapToArray(v, level + 1, path),
        }
      : {
          id,
          path,
          file: {
            name: k,
          },
        };
  });
}

export const mapMyFiles = (vectorstores) => {
  const filesMap = mapMyFilesStringsToMap(vectorstores);
  const filesArray = mapToArray(filesMap, 0, 'public');

  return filesArray;
};
