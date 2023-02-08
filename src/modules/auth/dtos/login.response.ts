export class LoginResponse {
  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }

  email: string;

  token: string;
}
