/* eslint-disable radix */
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

export const generateReceiptTitle = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const receiptString = `Posted Receipt #R${timestamp}${randomNumber}`;
  return receiptString;
};

export const formatDateAndTime = date => {
  const pad = num => String(num).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
};

export function formatDataMonthWise(data) {
  const monthNames = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];
  function getMonthName(timestamp) {
    const date = new Date(parseInt(timestamp) * 1000);
    return monthNames[date.getMonth()];
  }

  const grouped = {};
  const last7Days = [];
  const currentDate = new Date();
  const sevenDaysAgo = currentDate.setDate(currentDate.getDate() - 7) / 1000;

  data.forEach(obj => {
    const createdTimestamp = parseInt(obj.created);
    const monthName = getMonthName(createdTimestamp);

    if (createdTimestamp >= sevenDaysAgo) {
      last7Days.push(obj);
    }

    if (!grouped[monthName]) {
      grouped[monthName] = [];
    }
    grouped[monthName].push(obj);
  });

  const result = Object.keys(grouped).map(
    monthName =>
      grouped[monthName]?.length && {
        title: monthName,
        data: grouped[monthName],
      },
  );

  result.sort(
    (a, b) => monthNames.indexOf(a.title) - monthNames.indexOf(b.title),
  );

  if (last7Days.length) {
    result.unshift({
      title: 'Letzte 7 Tage',
      data: last7Days,
    });
  }

  return result;
}

export default {
  formatAmount,
  formatDate,
  generateReceiptTitle,
  formatDateAndTime,
  formatDataMonthWise,
};
