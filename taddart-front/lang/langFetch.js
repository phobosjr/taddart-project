function retrieveTranslation(translation) {
  const obj = {}
  translation.forEach(entry => obj[entry.keyName] = entry.value);
  return obj;
}

export default async ($axios, locale) => {
  const result = await $axios.get(`/translation-key?_locale=${locale}`);
  return retrieveTranslation(result.data.translation);
}
