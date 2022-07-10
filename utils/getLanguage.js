const englishLang = require("../config/en");
const russianLang = require("../config/ru");

const getLanguage = (user = {}) => user.lang === 'ru' ? russianLang : englishLang;

module.exports = getLanguage;
