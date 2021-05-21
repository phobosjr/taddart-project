import moment from 'moment'
moment.defineLocale('kab', {
  parentLocale: 'fr',
  months : [
    "Yannayer", "Furar", "Meghres", "Yebrir", "Maggu", "Yulyu", "Yulyuz",
    "Ghucht", "Chtember", "Tuber", "Nwamber", "Djember"
  ]
});

export default ({app})=> {
  const locale = app.i18n.locale;
  moment.locale(locale);
}
