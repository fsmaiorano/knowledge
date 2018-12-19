const existsOrError = (value: any, msg: string) => {
  if (!value) throw msg;
  if (Array.isArray(value) && value.length === 0) throw msg;
  if (typeof value === "string" && !value.trim()) throw msg;
};

const notExistsOrError = (value: any, msg: string) => {
  try {
    existsOrError(value, msg);
  } catch (msg) {
    return;
  }

  throw msg;
};

const equalsOrError = (valueA: any, valueB: any, msg: string) => {
  if (valueA !== valueB) throw msg;
};

export { existsOrError, notExistsOrError, equalsOrError };
