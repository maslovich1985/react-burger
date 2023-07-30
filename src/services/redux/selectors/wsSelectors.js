export const selectOrders = (store) => store.ws?.data?.orders;
export const selectOrdersTotal = (store) => store.ws?.data?.total;
export const selectOrdersTotalToday = (store) => store.ws?.data?.totalToday;
export const selectWsConnectionStatus = (store) => store.ws?.wsConnected;