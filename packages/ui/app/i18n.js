/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 */
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/en.js'; // Add locale data for en
import '@formatjs/intl-relativetimeformat/dist/locale-data/zh.js'; // Add locale data for zh

import enTranslationMessages from './translations/en.json';
import zhTranslationMessages from './translations/zh.json';

export const DEFAULT_LOCALE = 'zh';

// prettier-ignore
export const appLocales = [
  'zh',
  'en',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, zhTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};
