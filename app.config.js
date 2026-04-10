const { expo } = require('./app.json');

module.exports = ({ config }) => ({
  ...config,
  ...expo,
  android: {
    ...expo.android,
    package: 'com.aliharoon3.barakatnutritionapp',
  },
});
