export const initParams = {
  pagination: { page: 1, pageSize: 10 },
  sorter: { field: null, type: "asc" },
};

export function getKey() {
  return (Math.random() * 1e18).toString(36).slice(0, 5).toUpperCase() + "";
}
