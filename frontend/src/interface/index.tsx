type Dispatch<A> = (value: A) => void;

export interface IMovie {
  _id: string;
  name: string;
  title: string;
  created: string;
  __v: number;
}

export type IDashboardContextState = {
  movies: IMovie[];
};
