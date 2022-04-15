import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ITheme {
  backgroundColor: string;
  textColor: string;
  dateTimeColor?: string;
  isThemeLight: boolean;
inputColor?:string
}
export const lightTheme: ITheme = {
  backgroundColor: '#EDF5F4',
  textColor: '#111827',
  dateTimeColor: '#6B7280',
  isThemeLight: true,
  inputColor:"#000"
};

export const darkTheme: ITheme = {
  backgroundColor: '#25364D',
  textColor: '#23B3F2',
  isThemeLight: false,
  dateTimeColor: '#23B3F2',
    inputColor:'#000'

};
const initValue: ITheme = darkTheme;

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initValue,
  reducers: {
    onUpdateTheme: (state, action: PayloadAction<ITheme>) => {
      state.backgroundColor = action.payload.backgroundColor;
      state.textColor = action.payload.textColor;
      state.isThemeLight = action.payload.isThemeLight;
    },
  },
});

// Action creators are generated for each case reducer function
export const {onUpdateTheme} = themeSlice.actions;

export default themeSlice.reducer;
