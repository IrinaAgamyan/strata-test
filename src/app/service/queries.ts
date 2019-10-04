import gql from 'graphql-tag';

export const continent = `
  continent {
    name
    code
  }`;

export const languages = `
  languages {
    name
    native
  }`;

export const countries = `
  countries {
    code
    name
    phone
    native
    currency
    ${languages}
    ${continent}
  }`;

export const allCountriesQuery = gql`
  query {
    ${countries}
  }
`;

