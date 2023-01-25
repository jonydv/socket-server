import { User } from './user';

export class UserList {
  private list: User[] = [];

  constructor() {}

  // Add a user
  public addUser(user: User) {
    this.list.push(user);
    console.log(this.list);
    return user;
  }

  public updateName(id: string, name: string) {
    for (let user of this.list) {
      if (user.id == id) {
        user.name = name;
        break;
      }
    }

    console.log(' ==============Updating user=============');
    console.log(this.list);
  }

  public getList() {
    return this.list.filter((user) => user.name != 'no-name');
  }

  public getUser(id: string) {
    return this.list.find((user) => user.id === id);
  }

  public getUsersInRoom(roomName: string) {
    return this.list.filter((user) => user.room === roomName);
  }

  public deleteUser(id: string) {
    const tempUser = this.getUser(id);

    this.list = this.list.filter((user) => user.id !== id);

    return tempUser;
  }
}
