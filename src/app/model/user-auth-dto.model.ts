export interface UserDTO {
  "id": number;
  "firstname": string;
  "lastname": string;
  "phone": string;
  "email": string;
}

export interface AuthDTO {
  "pseudo": string;
  "password": string;
  "authority": string;
}

export interface UserAuthDTO {
  userDTO: UserDTO;
  authDTO: AuthDTO;
}

