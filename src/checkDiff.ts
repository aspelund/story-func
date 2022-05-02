const checkDiff = (selectors, object, transformedObject) => {
  const source = JSON.parse(JSON.stringify(object));
  const dest = JSON.parse(JSON.stringify(transformedObject));
  selectors.forEach((selector: string) => {
    const parts = selector.split(".");
    parts.reduce(
      (res, cur, index) => {
        if (index === parts.length - 1) {
          if (res.object && res.object[cur] !== undefined) {
            delete res.object[cur];
          }
          if (
            res.transformedObject &&
            res.transformedObject[cur] !== undefined
          ) {
            delete res.transformedObject[cur];
          }
          return { object: null, transformedObject: null };
        }
        const newObject =
          res.object && res.object[cur] !== undefined ? res.object[cur] : null;
        const newTransformedObject =
          res.transformedObject && res.transformedObject[cur] !== undefined
            ? res.transformedObject[cur]
            : null;
        return { object: newObject, transformedObject: newTransformedObject };
      },
      { object: source, transformedObject: dest }
    );
  });
  return JSON.stringify(source) === JSON.stringify(dest);
};

export { checkDiff };
