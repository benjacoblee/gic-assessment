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
    - Run `cp .env.example .env`
    - Next, your `.env` file will require a `MONGODB_STR`. `mongoose` relies on this connection string. Example connection string: `mongodb://127.0.0.1:27017/app`
    - Run `seed()` to initialize the project with some data

```
    const { seed } = require("./seed");

    mongoose.connect(process.env.MONGODB_STR).then(
        () => {
            console.log("DB is ready to use!"); // call seed after DB is up
            seed();
        },
        (err) => console.log(err)
    );
```

- Then, run `npm start`
- For logo upload to work, you will need the appropriate environment variables (i.e. all variables prepended with `BACKBLAZE`).
  - Your Backblaze bucket type must be set to "public"
  - The application key must have "Read and Write" access, and must have access to your bucket

### Other

#### Testing

- DB should be seeded before running tests
- DB will be modified by tests. In order to prevent tests from modifying your "real data", you can change the `MONGODB_STR` to something else in the `.env` file
