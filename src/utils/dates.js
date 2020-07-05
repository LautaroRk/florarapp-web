export const dateToString = (dateObject) => {
  const date = twoDigits(dateObject.getDate());
  const month = twoDigits(dateObject.getMonth() + 1);
  const year = dateObject.getFullYear();
  const hours = twoDigits(dateObject.getHours());
  const minutes = twoDigits(dateObject.getMinutes());

  return `${date}/${month}${year !== new Date().getFullYear() ? '/' + year.substring(2,5) : ''} - ${hours}:${minutes}hs`;
};

export const msToTime = (ms) => {
  const hours = twoDigits(parseInt(ms / 3600000));
  const minutes = twoDigits(parseInt((ms - hours * 3600000) / 60000));
  const seconds = twoDigits(parseInt(((ms - hours * 3600000) - (minutes * 60000)) / 1000));

  return `${hours}:${minutes}:${seconds}`;
};

// Recibe fecha DATEVALUE (microsoft) y devuelve formato Date (js)
export const excelDateToJs = serial => {
  const utc_days  = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;                                        
  const date_info = new Date(utc_value * 1000);

  const fractional_day = serial - Math.floor(serial) + 0.0000001;

  let total_seconds = Math.floor(86400 * fractional_day) + 1; // @TODO: PROBAR

  const seconds = total_seconds % 60;

  total_seconds -= seconds;

  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate() + 1, hours, minutes, seconds);
};

export const twoDigits = (number) => {
  if (number < 10) return '0' + number;
  return number; 
};