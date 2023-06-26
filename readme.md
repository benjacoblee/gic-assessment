# GIC Assessment

### Description

- An app for cafe & employee management

### Technologies Used

#### Server

- ExpressJS
- NodeJS
- MongoDB + Mongoose

### Installation and Usage

> This project uses `Node.js` version `16`

- Clone the repository
- Navigate to the repository
- Ensure `node_modules` are installed with `npm i`

  - Other requirements:

    - `mongodb` must be running on your machine
    - Run `seed()` to initialize the project with some data

```
    const { seed } = require("./seed");

    mongoose.connect("mongodb://127.0.0.1:27017/app").then(
        () => {
            console.log("DB is ready to use!"); // call seed after DB is up
            seed();
        },
        (err) => console.log(err)
    );
```

- Then, run `npm start`
- For logo upload to work, you will need the appropriate environment variables. Run `cp .env.example .env` and add your environment variables
