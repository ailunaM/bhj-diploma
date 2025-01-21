/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const convertUrl = (data = {}, optionUrl) => {
  let url = `${optionUrl}?`;
  let count = 0;
  let dataLength = Object.keys(data).length - 1;
  for (let key in data) {
    url += `${key}=${data[key]}${count === dataLength ? '' : '&'}`;
    count++;
  }

  return url; // https://localhost:8000?mail=ivan@biz.pro&password=odinodin&test=js
};

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  const url = options.url;
  if (options.method === 'GET') {
    const data = options.data;
    const url = convertUrl(data, url);
    xhr.open('GET', url);
    xhr.send();
  }

  if (options.method === 'POST') {
    const formData = new FormData();
    for (let key in data) {
      formData.append(`${key}, ${data[key]}`);
    }
    xhr.open('POST', url);
    xhr.send(formData);
  }
};
