/* Annual S&P 500 total returns (price + reinvested dividends) and U.S. CPI-U
   year-over-year inflation, 1928-2024. Sources: Robert Shiller online dataset /
   S&P Dow Jones Indices (returns) and U.S. Bureau of Labor Statistics (CPI).
   Hardcoded so the tools work without any external API calls. */

export interface MarketYear {
  year: number;
  /* S&P 500 total return for the year, percent */
  totalReturn: number;
  /* CPI-U inflation for the year, percent */
  inflation: number;
}

export const MARKET_DATA: MarketYear[] = [
  { year: 1928, totalReturn: 43.81, inflation: -1.15 },
  { year: 1929, totalReturn: -8.3, inflation: 0.58 },
  { year: 1930, totalReturn: -25.12, inflation: -6.4 },
  { year: 1931, totalReturn: -43.84, inflation: -9.32 },
  { year: 1932, totalReturn: -8.64, inflation: -10.27 },
  { year: 1933, totalReturn: 49.98, inflation: 0.76 },
  { year: 1934, totalReturn: -1.19, inflation: 1.52 },
  { year: 1935, totalReturn: 46.74, inflation: 2.99 },
  { year: 1936, totalReturn: 31.94, inflation: 1.45 },
  { year: 1937, totalReturn: -35.34, inflation: 2.86 },
  { year: 1938, totalReturn: 29.28, inflation: -2.78 },
  { year: 1939, totalReturn: -1.1, inflation: 0 },
  { year: 1940, totalReturn: -10.67, inflation: 0.71 },
  { year: 1941, totalReturn: -12.77, inflation: 9.93 },
  { year: 1942, totalReturn: 19.17, inflation: 9.03 },
  { year: 1943, totalReturn: 25.06, inflation: 2.96 },
  { year: 1944, totalReturn: 19.03, inflation: 2.3 },
  { year: 1945, totalReturn: 35.82, inflation: 2.25 },
  { year: 1946, totalReturn: -8.43, inflation: 18.13 },
  { year: 1947, totalReturn: 5.2, inflation: 8.84 },
  { year: 1948, totalReturn: 5.7, inflation: 2.99 },
  { year: 1949, totalReturn: 18.3, inflation: -2.07 },
  { year: 1950, totalReturn: 30.81, inflation: 5.93 },
  { year: 1951, totalReturn: 23.68, inflation: 6 },
  { year: 1952, totalReturn: 18.15, inflation: 0.75 },
  { year: 1953, totalReturn: -1.21, inflation: 0.75 },
  { year: 1954, totalReturn: 52.56, inflation: -0.74 },
  { year: 1955, totalReturn: 32.6, inflation: 0.37 },
  { year: 1956, totalReturn: 7.44, inflation: 2.99 },
  { year: 1957, totalReturn: -10.46, inflation: 2.9 },
  { year: 1958, totalReturn: 43.72, inflation: 1.76 },
  { year: 1959, totalReturn: 12.06, inflation: 1.73 },
  { year: 1960, totalReturn: 0.34, inflation: 1.36 },
  { year: 1961, totalReturn: 26.64, inflation: 0.67 },
  { year: 1962, totalReturn: -8.81, inflation: 1.33 },
  { year: 1963, totalReturn: 22.61, inflation: 1.64 },
  { year: 1964, totalReturn: 16.42, inflation: 0.97 },
  { year: 1965, totalReturn: 12.4, inflation: 1.92 },
  { year: 1966, totalReturn: -9.97, inflation: 3.46 },
  { year: 1967, totalReturn: 23.8, inflation: 3.04 },
  { year: 1968, totalReturn: 10.81, inflation: 4.72 },
  { year: 1969, totalReturn: -8.24, inflation: 6.2 },
  { year: 1970, totalReturn: 3.56, inflation: 5.57 },
  { year: 1971, totalReturn: 14.22, inflation: 3.27 },
  { year: 1972, totalReturn: 18.76, inflation: 3.41 },
  { year: 1973, totalReturn: -14.31, inflation: 8.71 },
  { year: 1974, totalReturn: -25.9, inflation: 12.34 },
  { year: 1975, totalReturn: 37, inflation: 6.94 },
  { year: 1976, totalReturn: 23.83, inflation: 4.86 },
  { year: 1977, totalReturn: -6.98, inflation: 6.7 },
  { year: 1978, totalReturn: 6.51, inflation: 9.02 },
  { year: 1979, totalReturn: 18.52, inflation: 13.29 },
  { year: 1980, totalReturn: 31.74, inflation: 12.52 },
  { year: 1981, totalReturn: -4.7, inflation: 8.92 },
  { year: 1982, totalReturn: 20.42, inflation: 3.83 },
  { year: 1983, totalReturn: 22.34, inflation: 3.79 },
  { year: 1984, totalReturn: 6.15, inflation: 3.95 },
  { year: 1985, totalReturn: 31.24, inflation: 3.8 },
  { year: 1986, totalReturn: 18.49, inflation: 1.1 },
  { year: 1987, totalReturn: 5.81, inflation: 4.43 },
  { year: 1988, totalReturn: 16.54, inflation: 4.42 },
  { year: 1989, totalReturn: 31.48, inflation: 4.65 },
  { year: 1990, totalReturn: -3.06, inflation: 6.11 },
  { year: 1991, totalReturn: 30.23, inflation: 3.06 },
  { year: 1992, totalReturn: 7.49, inflation: 2.9 },
  { year: 1993, totalReturn: 9.97, inflation: 2.75 },
  { year: 1994, totalReturn: 1.33, inflation: 2.67 },
  { year: 1995, totalReturn: 37.2, inflation: 2.54 },
  { year: 1996, totalReturn: 22.68, inflation: 3.32 },
  { year: 1997, totalReturn: 33.1, inflation: 1.7 },
  { year: 1998, totalReturn: 28.34, inflation: 1.61 },
  { year: 1999, totalReturn: 20.89, inflation: 2.68 },
  { year: 2000, totalReturn: -9.03, inflation: 3.39 },
  { year: 2001, totalReturn: -11.85, inflation: 1.55 },
  { year: 2002, totalReturn: -21.97, inflation: 2.38 },
  { year: 2003, totalReturn: 28.36, inflation: 1.88 },
  { year: 2004, totalReturn: 10.74, inflation: 3.26 },
  { year: 2005, totalReturn: 4.83, inflation: 3.42 },
  { year: 2006, totalReturn: 15.61, inflation: 2.54 },
  { year: 2007, totalReturn: 5.48, inflation: 4.08 },
  { year: 2008, totalReturn: -36.55, inflation: 0.09 },
  { year: 2009, totalReturn: 25.94, inflation: 2.72 },
  { year: 2010, totalReturn: 14.82, inflation: 1.5 },
  { year: 2011, totalReturn: 2.1, inflation: 2.96 },
  { year: 2012, totalReturn: 15.89, inflation: 1.74 },
  { year: 2013, totalReturn: 32.15, inflation: 1.5 },
  { year: 2014, totalReturn: 13.52, inflation: 0.76 },
  { year: 2015, totalReturn: 1.38, inflation: 0.73 },
  { year: 2016, totalReturn: 11.77, inflation: 2.07 },
  { year: 2017, totalReturn: 21.61, inflation: 2.11 },
  { year: 2018, totalReturn: -4.23, inflation: 1.91 },
  { year: 2019, totalReturn: 31.21, inflation: 2.29 },
  { year: 2020, totalReturn: 18.02, inflation: 1.36 },
  { year: 2021, totalReturn: 28.47, inflation: 7.04 },
  { year: 2022, totalReturn: -18.04, inflation: 6.45 },
  { year: 2023, totalReturn: 26.06, inflation: 3.35 },
  { year: 2024, totalReturn: 25.02, inflation: 2.89 },
];

export const FIRST_YEAR = MARKET_DATA[0].year;
export const LAST_YEAR = MARKET_DATA[MARKET_DATA.length - 1].year;

/* Cumulative CPI index anchored at 1928 = 1: index[y] is the product of
   (1 + inflation) for every year up to and including y. */
export const CPI_INDEX: Record<number, number> = (() => {
  const index: Record<number, number> = {};
  let acc = 1;
  for (const row of MARKET_DATA) {
    acc *= 1 + row.inflation / 100;
    index[row.year] = acc;
  }
  return index;
})();
