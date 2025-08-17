
export interface Resource {
  name: string;
  description: string;
  link: string;
}

export interface ResultCategory {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
}
