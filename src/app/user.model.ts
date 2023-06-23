export class User {
    public id = 0;
    public token = 0;
    public name = "";
    public password = "";
    public rights = 0;      ///< 1- root, 0- ordinal user

    constructor(value: any = {}) {
        this.reset();
        try {
          let v;
          if (typeof value == 'string') {
                v = JSON.parse(value);
          } else {
              v = value;
          }
          if (typeof v !== 'undefined') {
              this.assign(v);
          }
        } catch (error) {
          
        }
      }

    public assign(value: object): any {
        if (typeof value !== 'undefined') {
            Object.assign(this, value);
        }
    }
  
    public logout(): void {
        this.reset();
        localStorage.removeItem('user');
    }

    private reset() {
        this.id = 0;
        this.token = 0;
        this.name = '';
        this.password = '';
        this.rights = 0;
    }
}
