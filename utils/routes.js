const routes = {
  home: "/",
  create: "/create",
  dashboard: "/dashboard",
  explore: "/explore",
  token: (id) => `/token/${id}`,
  sale: (id) => `/sale/${id}`,
};

export default routes;
