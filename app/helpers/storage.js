var storage = {
  set(name, data) {
    try {
      localStorage.setItem(name, JSON.stringify(data));

      return data;
    } catch {
      return data;
    }
  },
  get(name, defaultData) {
    var result = defaultData;

    try {
      result = localStorage.getItem(name);

      try {
        return JSON.parse(result) || defaultData;
      } catch {
        return result || defaultData;
      }
    } catch {
      return result || defaultData;
    }
  },
  remove(name) {
    try {
      localStorage.removeItem(name);
    } catch {
      console.error(e);
    }
  }
};
