export interface  Roles {
  admin?: boolean;
  user?:boolean;
}

export interface  UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string ;
  roles: Roles;
}
