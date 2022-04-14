import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataWeatherDaily} from '../types/types';

export const initValue: DataWeatherDaily = {
  lat: 0,
  lon: 0,
  timezone: '',
  timezone_offset: 0,
  current: {
    dt: 0,
    sunrise: 0,
    sunset: 0,
    temp: 0,
    feels_like: 0,
    pressure: 0,
    humidity: 0,
    dew_point: 0,
    uvi: 0,
    clouds: 0,
    visibility: 0,
    wind_speed: 0,
    wind_deg: 0,
    wind_gust: 0,
    weather: [
      {
        id: 800,
        main: '',
        description: '',
        icon: '',
      },
    ],
  },
  daily: [
    {
      dt: 0,
      sunrise: 0,
      sunset: 0,
      moonrise: 0,
      moon_phase: 0,
      temp: {
        day: 0,
        min: 0,
        max: 0,
        night: 0,
        eve: 0,
        morn: 0,
      },
      feels_like: {
        day: 0,
        night: 0,
        eve: 0,
        morn: 0,
      },
      pressure: 0,
      humidity: 0,
      dew_point: 0,
      wind_speed: 0,
      wind_deg: 0,
      wind_guest: 0,
      weather: [
        {
          id: 0,
          main: '',
          description: '',
          icon: '',
        },
      ],
      clouds: 0,
      pop: 0,
      rain: 0,
      uvi: 0,
    },
  ],
};
export const Data5DaysSlice = createSlice({
  name: 'FiveDays',
  initialState: initValue,
  reducers: {
    onGetData5Days: (state, action: PayloadAction<DataWeatherDaily>) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
      state.timezone = action.payload.timezone;
      state.timezone_offset = action.payload.timezone_offset;
      state.daily = action.payload.daily;
      state.current = action.payload.current
    },
  },
});
export const {onGetData5Days} = Data5DaysSlice.actions;
export default Data5DaysSlice.reducer;
