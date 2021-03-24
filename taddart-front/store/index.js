export const state = () => ({
  locales: ['kb', 'fr'],
  locale: 'kb'
})

export const getters = {
    locale: (state)=> state.locale
}

export const mutations = {
  switch: (state, lang)=> {
    state.locale = lang;
  }
}

export const actions = {
  switchLocale: (context, lang)=> {
      context.commit('switch', lang);
  }
}
