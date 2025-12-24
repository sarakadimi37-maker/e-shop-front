export interface Costumer {
  id:        number;
  firstName: string;
  lastName:  string;
  address:   Address;
  orders:    any[];
  favorites: any[];
}

export interface Address {
  id:      number;
  street:  string;
  city:    string;
  zipCode: string;
  country: string;
}
