export * from './local-storage';

export function getRandomCompanyName(length) {
  const syllables = [
    'tech',
    'soft',
    'info',
    'net',
    'data',
    'sys',
    'ware',
    'com',
    'ware',
    'sol',
    'gen',
    'log',
    'bit',
    'byte',
    'cyber',
    'web',
    'cloud',
    'dev',
  ];

  let companyName = '';

  while (companyName.length < length) {
    const randomSyllable =
      syllables[Math.floor(Math.random() * syllables.length)];
    if (companyName.length + randomSyllable.length <= length) {
      companyName += randomSyllable;
    }
  }

  // Trim the name to the exact length if it exceeds
  companyName = companyName.substring(0, length);

  // Capitalize the first letter to make it look like a proper name
  return companyName.charAt(0).toUpperCase() + companyName.slice(1);
}

export const formatDate = (d: Date | string) => {
  const date = typeof d === 'string' ? new Date(d) : d;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const formatAmount = amount => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export default {formatAmount, formatDate};
