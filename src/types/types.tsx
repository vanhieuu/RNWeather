import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  ManagerLocation: undefined;
  DetailScreen: {
    item: DataResponseProps | undefined;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: {
    item: DataResponseProps[];
  };
  Favorite: undefined;
  SetLocation: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
export interface WeatherProps {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface MainWeatherProps {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}
export interface WinProp {
  speed: number;
  deg: number;
  gust: number;
}
export interface CloudProps {
  all: number;
}
export interface CoordProp {
  lon: number;
  lat: number;
}
export interface SysProps {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export enum YesNo {
  yes = 1,
  no = 2,
}

export interface PrecipitationProps {
  '1h': number;
}
export interface DataResponseProps {
  coord: CoordProp;
  weather: WeatherProps[];
  base: string;
  main: MainWeatherProps;
  visibility: number;
  wind: WinProp;
  clouds: CloudProps;
  dt: number;
  sys: SysProps;
  timezone: number;
  id: number;
  name: string;
  rain?: PrecipitationProps;
  cod: number;
}

export interface FeelsLikeProps {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface TempProps {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyProps {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moon_phase: number;
  temp: TempProps;
  feels_like: FeelsLikeProps;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_guest: number;
  weather: WeatherProps[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}
export interface CurrentProps {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherProps[];
}

export interface DataWeatherDaily {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: DailyProps[];
  current: CurrentProps;
}

export const DATA_COMPARE = [
  {
    code: '01d',
    icon: require('../assets/images/sun.png'),
    currentTime: 'day',
  },
  {
    code: '01n',
    icon: require('../assets/images/Night-FastWind.png'),
    currentTime: 'night',
  },
  {
    code: '02d',
    icon: require('../assets/images/sun-clouds.png'),
    currentTime: 'day',
  },
  {
    code: '02n',
    icon: require('../assets/images/Night-FastWind.png'),
    currentTime: 'night',
  },
  {
    code: '03d',
    icon: require('../assets/images/clouds.png'),
    currentTime: 'day',
  },
  {
    code: '03n',
    icon: require('../assets/images/Night-CloudFastWind.png'),
    currentTime: 'night',
  },
  {
    code: '04d',
    icon: require('../assets/images/clouds.png'),
    currentTime: 'day',
  },
  {
    code: '04n',
    icon: require('../assets/images/Night-CloudFastWind.png'),
    currentTime: 'night',
  },
  {
    code: '09d',
    icon: require('../assets/images/Day-CloudMidRain.png'),
    currentTime: 'day',
  },
  {
    code: '09n',
    icon: require('../assets/images/Night-CloudMidRain.png'),
    currentTime: 'night',
  },
  {
    code: '10d',
    icon: require('../assets/images/Day-CloudAngledRain.png'),
    currentTime: 'day',
  },
  {
    code: '10n',
    icon: require('../assets/images/Night-CloudMidRain.png'),
    currentTime: 'night',
  },
  {
    code: '11d',
    icon: require('../assets/images/lightning.png'),
    currentTime: 'day',
  },
  {
    code: '11n',
    icon: require('../assets/images/lightning.png'),
    currentTime: 'night',
  },
  {
    code: '13d',
    icon: require('../assets/images/clouds-snow.png'),
    currentTime: 'day',
  },
  {
    code: '13n',
    icon: require('../assets/images/clouds-snow.png'),
    currentTime: 'night',
  },
  {
    code: '50d',
    icon: require('../assets/images/clouds.png'),
    currentTime: 'day',
  },
  {
    code: '50n',
    icon: require('../assets/images/Night-CloudFastWind.png'),
    currentTime: 'night',
  },
];
