class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private cpf: string,
    private password:string,
    private hasAdres: boolean = false
  ) {}

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getEmail(): string {
    return this.email;
  }
  public getCpf(): string {
    return this.cpf;
  }
  public getPassword(): string {
    return this.password;
  }
  public getHashAdress(): boolean {
    return this.hasAdres;
  }
}
export default User;
