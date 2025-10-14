export interface ICategorySwitch {
  Companies: boolean;
  Services: boolean;
}

export interface ICategory {
  name: string;
  slug: string;
  switch: ICategorySwitch | null;
}

export interface ICategoriesResponse {
  success: boolean;
  data: ICategory[];
  error: string | null;
}

