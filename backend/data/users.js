import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Ayca Unlu",
    email: "ayca@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Yahya Unlu",
    email: "yahya@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
