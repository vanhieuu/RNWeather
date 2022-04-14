const BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const API_KEY = 'ff4e435271205c88932d00b01de139d8';
export const URL = {
  // getCurrentLocation:({lat,lon}:{lat:number,lon:number}) => BASE_URL + `/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  getData: (input: string) =>
    BASE_URL + `/weather?q=${input}&units=metric&APPID=${API_KEY}`,
  getImage: (iconCode: string) =>
    `http://openweathermap.org/img/wn/${iconCode}.png`,
  getDataFor5day: (name: string | undefined) =>
    BASE_URL + `/forecast?q=${name}&units=metric&APPID=${API_KEY}`,
  oneCall: ({lat, lon}: {lat: number | undefined; lon: number | undefined}) =>
    BASE_URL + `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alert&appid=${API_KEY}`,
  
};
