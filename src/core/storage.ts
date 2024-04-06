
type StorageArea = "local" | "sync";

export const storeFactory = (
  storage: typeof chrome.storage,
  mode: StorageArea
) => {
  const store = storage[mode];
  const getItem = async (name: string) => {
    const value = await store.get(name);
    return value[name];
  };
  const getItems = async (name: string[]) => {
    const values = await store.get(name);
    return values;
  };
  const removeItem = async (name: string | string[]) => {
    await store.remove(name);
  };
  const setItem = async (name: string, value: any) => {
    await store.set({
      [name]: value,
    });
  };
  const setItems = async (items: Record<string, any>) => {
    await store.set(items);
  };
  return {
    getItem,
    getItems,
    removeItem,
    setItem,
    setItems,
  };
};

const { getItem, setItem, removeItem, setItems, getItems } = storeFactory(
  chrome.storage,
  "sync"
);

export { getItem, setItem, removeItem, setItems, getItems };
