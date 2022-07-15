export const getProxyRoutes = () => {
  return process.env.proxy_urls?.trim().split(',');
}
;
