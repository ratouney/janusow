import React from 'react';
import {
  IntlProvider,
  addLocaleData,
} from 'react-intl';
import { connect } from 'react-redux';

import localesData from './../../locales/';


addLocaleData([...localesData]);

// const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

const ConnectedIntlProvider = ({ lang, children }) => {
  const language = lang;
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
  const messages = localesData[languageWithoutRegionCode] || localesData[language] || localesData.de;

  console.log('Language : ', language);
  console.log('languageWithoutRegionCode : ', languageWithoutRegionCode);
  console.log('Messages : ', messages);
  console.log('LocaleData : ', localesData);

  return (
    <IntlProvider locale="en" messages={messages}>
      {children}
    </IntlProvider>
  );
};

function mapStateToProps(state) {
  return {
    lang: state.settingsReducer.language,
  };
}

export default connect(mapStateToProps)(ConnectedIntlProvider);
