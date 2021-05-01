import langFetch from "@/lang/langFetch";

export default ({store})=>  {
  return langFetch(store.$axios, 'kab');
}

