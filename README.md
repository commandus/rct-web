# Rcr

```
npm install
sudo npm install -g @angular/cli
ng build

```

## Prerequisites

Install nvm

https://github.com/nvm-sh/nvm#installing-and-updating

If you wish to uninstall them at a later point (or re-install them under your
nvm` Nodes), you can remove them from the system Node as follows:
```
nvm use system
npm uninstall -g a_module
```

Install node.js:
```
nvm install --lts
nvm use --lts
```

```
cd rct-web
sudo apt install npm

sudo npm install -g @angular/cli
npm install
ng serve
```

## Deploy

```
cd ~/src/rct-web/dist/rcr;scp * user@kb-srv.ysn.ru:/var/www/html
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.
