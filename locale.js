const i18n = {
  en: {
    'yes': 'Yes',
    'no': 'No',
    'confirm': 'Confirm',
    'confirm_to_exit': 'Exit?',
  },
  'zh-CN': {
    'yes': '是',
    'no': '否',
    'confirm': '确认',
    'confirm_to_exit': '确定要退出吗？'
  }
}

module.exports = function (locale, msg) {
  if (i18n[locale] === undefined) {
    locale = 'en'
  }
  return i18n[locale][msg]
}
