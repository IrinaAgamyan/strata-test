export interface Language {
  name: string;
  native: string;
}

interface Continent {
  code: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  phone: string;
  native: string;
  currency: string;
  languages: Language[];
  continent: Continent;
}
