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
  xhr.responseType = 'json';
  const url = options.url;
  const callback = options.callback;
  const data = options.data;

  try {
    if (options.method === 'GET') {
      const convertedUrl = convertUrl(data, url);
      xhr.open('GET', convertedUrl);
      xhr.send();
    } else {
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      xhr.open(options.method, url);
      xhr.send(formData);
    }

    xhr.onload = function () {
      callback(null, xhr.response);
    };

    xhr.onerror = function () {
      callback(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    };
  } catch (e) {
    callback(e);
  }
};
