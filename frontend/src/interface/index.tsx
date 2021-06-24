export interface IMovie {
  _id: string;
  name: string;
  title: string;
  vod: string;
  created: string;
  __v: number;
}

export type IDashboardContextState = {
  movies: IMovie[];
  throttledLoad: () => void;
};
