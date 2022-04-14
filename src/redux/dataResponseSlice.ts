import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataResponseProps} from '../types/types';

const initValue: DataResponseProps = {
  coord: {
    lat: 0,
    lon: 0,
  },
  weather: [
    {
      id: 0,
      main: '',
      description: '',
      icon: '',
    },
  ],
  base: '',
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
    gust: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: '',
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  id: 0,
  name: '',
  cod: 0,
  rain:{
    "1h":1.15
  }
};
export const DataResponseSlice = createSlice({
  name: 'weather',
  initialState: initValue,
  reducers: {
    onGetData: (state, action: PayloadAction<DataResponseProps>) => {
      state.base = action.payload.base;
      state.clouds = action.payload.clouds;
      state.cod = action.payload.cod;
      state.coord = action.payload.coord;
      state.dt = action.payload.dt;
      state.id = action.payload.id;
      state.main = action.payload.main;
      state.name = action.payload.name;
      state.sys = action.payload.sys;
      state.timezone = action.payload.timezone;
      state.visibility = action.payload.visibility;
      state.weather = action.payload.weather;
      state.wind = action.payload.wind;
      state.rain = action.payload.rain
    },
    onAddToFavorite:(state,action:PayloadAction<DataResponseProps>) =>{
        state.base = action.payload.base;
        state.clouds = action.payload.clouds;
        state.cod = action.payload.cod;
        state.coord = action.payload.coord;
        state.dt = action.payload.dt;
        state.id = action.payload.id;
        state.main = action.payload.main;
        state.name = action.payload.name;
        state.sys = action.payload.sys;
        state.timezone = action.payload.timezone;
        state.visibility = action.payload.visibility;
        state.weather = action.payload.weather;
        state.wind = action.payload.wind;
        state.rain = action.payload.rain
    }
  },
});

export const {onGetData,onAddToFavorite} = DataResponseSlice.actions
export default DataResponseSlice.reducer

