## User List FrontEnd Code Test

Features

- sort by name, surname, age, and connectedUsers
- open modal to add/edit user
- add new user, edit user, delete user while maintaining ordering
- lazy render new users on scroll

Used immutable.js List to store and manipulate user data for better performance. The data is rendered by 15 users lazily. I've used react-infinite-scroll library to manage requesting new data chunks on scroll.
Used React.memo on presentational components to only re-render data that is changed.

## Live Demo

[Link](https://rawcdn.githack.com/zenott/user-list/748fd9f9a09c100a69c6878977f6c902041152e4/dist/index.html)

## Built With

- React
- Redux
- TypeScript
- Styled-components
- Tests with Jest / Enzyme
- Webpack

## Usage

### Prerequisites

- node
- npm

### Getting started

Clone the repository to your local machine

```
$ git clone https://github.com/zenott/user-list.git
```

Change into the project directory

```
$ cd user-list
```

Install dependencies

```
$ npm install
```

Start development server

```
$ npm run dev
```

### Run the test suite

```
$ npm run test
```

## Author

👤 **Balint Mendli**

- GitHub: [@zenott](https://github.com/zenott)
- Website: [mendli.com](https://mendli.com)
- Email: [balint@mendli.com](mailto:balint@mendli.com)

## Acknowledgments

- [immutable.js](https://github.com/nfl/react-helmet)
- [react-infinite-scroll-component](https://fontawesome.com/)
