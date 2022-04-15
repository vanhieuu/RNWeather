import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataResponseProps} from '../types/types';

interface Props {
  data?: DataResponseProps[];
}

const initValue: Props = {
  data: [
    {
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
    },
  ],
};
export const AddItemSlice = createSlice({
    name:'favorite',
    initialState:initValue,
    reducers:{
        onAdd:(state,action:PayloadAction<Props>) =>{
            state.data = action.payload.data
        },
        onGetIndex:(state,action:PayloadAction<Props>)  =>{
            const index = initValue.data?.findIndex(el => el === el)
            state.data![index!] = action.payload.data![index!]
        },
    }
})
export const {onAdd,onGetIndex} = AddItemSlice.actions
export default AddItemSlice.reducer