function retrieveTranslation(translationData) {
  const obj = {}
  translationData.forEach(entry => obj[entry.keyName] = entry.value);
  return obj;
}

export default async ($axios, locale, strapiBackendUrl) => {
  const result = await $axios.get(`${strapiBackendUrl}/translation-keys?_locale=${locale}`);
  return retrieveTranslation(result.data);
}
