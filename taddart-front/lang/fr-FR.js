import langFetch from "@/lang/langFetch";

export default ({store, $config})=>  {
  const strapiBackendUrl = process.client ? $config.clientSide.strapiBackendUrl : $config.serverSide.strapiBackendUrl;
  return langFetch(store.$axios, 'fr', strapiBackendUrl);
}

