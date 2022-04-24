// https://mongoosejs.com/docs/queries.html

const db = require('./db')
const User = require('./models/user')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const findAll = async () => {
    const users = await User.find()
    console.log("All users:", users)
};

const runOne = async () => {
    await findAll()
    process.exit()
};

runOne()

const createUser = async () => {
    const user = new User({ name: "Carol", age: 24, status: "active" });
    await user.save();
    console.log("Created user:", user);
};

const deleteUser = async () => {
    const deleted = await User.deleteOne({ name: "Carol" });
    console.log(deleted);
};

const updateUser = async () => {
    const updated = await User.updateOne({ name: "Benny" }, { name: "Benjamin" });
    console.log(updated);
};

const findAllNames = async () => {
    const names = await User.find({}, "name");
    console.log("Names", names);
};

const findAllOlderThan25 = async () => {
    const usersOlderThan25 = await
        User.find({}).where("age").gt(25);
    console.log("Over 25", usersOlderThan25);
};

const activeAndLessThan25 = async () => {
    const activeAndLessThan25 = await User.find({ status: "active" })
        .where("age")
        .lt(25);
    console.log("Under 25", activeAndLessThan25);
};
const run = async () => {
    await findAll();
    await createUser()
    await deleteUser()
    await updateUser()
    await findAllNames()
    await findAllOlderThan25()
    await activeAndLessThan25()
    process.exit();
};
run();
