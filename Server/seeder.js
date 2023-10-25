import dotenv from 'dotenv';
import users from './src/data/users.js';
import {User} from './src/models/UserModel.js';

const importData = async () => {
  try {

    await User.deleteMany();
    //console.log(users);
    await User.insertMany(users);

    console.log('Data Imported!');
  } catch (error) {
    console.error(`${error}`);
  }
};

const destroyData = async () => {
  try {

    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// if (process.argv[2] === '-d') {
//   destroyData();
// } else {
//   importData();
// }

export const seeder = {
  importData,
  destroyData
}