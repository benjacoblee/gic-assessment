# Readme

### Running the project

This project uses `Node.js` version `16`

To run:

- `npm install`
- MongoDB must be up and running on your computer
- To seed the data, import the function into `./index.js`:

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
