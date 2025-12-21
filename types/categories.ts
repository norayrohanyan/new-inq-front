export interface ICategorySwitch {
  Companies?: boolean;
  Services?: boolean;
  Apartments?: boolean;
  Cars?: boolean;
  [key: string]: boolean | undefined; // Allow dynamic properties
}

export interface ICategory {
  name: string;
  slug: string;
  switch: ICategorySwitch;
}

export interface ICategoriesResponse {
  success: boolean;
  data: ICategory[];
  error: string | null;
}

