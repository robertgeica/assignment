export interface TableColumnData {
  label: string;
  field: string;
}

export interface TableRowData {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
}

export interface Book {
  title: string;
  author: string;
  genre: string;
  description: string;
}
