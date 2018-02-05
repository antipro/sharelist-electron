const i18n = {
  en: {
    'yes': 'Yes',
    'no': 'No',
    'confirm': 'Confirm',
    'confirm_to_exit': 'Exit?',
    'update_existed': 'Sharelist has a new version. Do you want to download it?',
    'preference_saved': 'Preference saved'
  },
  'zh-CN': {
    'yes': '是',
    'no': '否',
    'confirm': '确认',
    'confirm_to_exit': '确定要退出吗？',
    'update_existed': '分享清单有新的版本，你想要下载吗？',
    'preference_saved': '设置已保存'
  }
}

module.exports = function (locale, msg) {
  if (i18n[locale] === undefined) {
    locale = 'en'
  }
  return i18n[locale][msg]
}
