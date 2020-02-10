

export const STORAGE_ACTIONS = {
  STORE_DATA: 'STORE_',
  REMOVE_DATA: 'REMOVE_',
  GET_DATA: 'GET_',
};

export function storeDataAction(type, storageKey, data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
  return { type: STORAGE_ACTIONS.STORE_DATA + type, data };
}

export function removeDataAction(type) {
  return { type: STORAGE_ACTIONS.REMOVE_DATA + type };
}

export function getDataAction(type, storageKey) {
  const dataString = localStorage.getItem(storageKey);
  console.log("laaaaahh : ",dataString)
  const dataObject = dataString ? JSON.parse(dataString) : null;
  return { type: STORAGE_ACTIONS.GET_DATA + type, data: dataObject };
}
