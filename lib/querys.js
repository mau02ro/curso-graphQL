"use stritc";
const connectDB = require("./db.js");
const { ObjectId } = require("mongodb");

module.exports = {
  getCourses: async () => {
    let db,
      courses = [];
    try {
      db = await connectDB();
      courses = await db.collection("cs").find().toArray();
    } catch (error) {
      console.error("getCourses: ", new Error(error));
    }
    return courses;
  },
  getCourse: async (root, { id }) => {
    let db,
      course = {};
    try {
      db = await connectDB();
      course = await db.collection("cs").findOne({ _id: ObjectId(id) });
    } catch (error) {
      console.error("getCourse: ", new Error(error));
    }
    return course;
  },
  getStudents: async () => {
    let db,
      students = [];
    try {
      db = await connectDB();
      students = await db.collection("students").find().toArray();
    } catch (error) {
      console.error("getStudents: ", new Error(error));
    }
    return students;
  },
  getStudent: async (root, { id }) => {
    let db,
      student = {};
    try {
      db = await connectDB();
      student = await db.collection("students").findOne({ _id: ObjectId(id) });
    } catch (error) {
      console.error("getStudent: ", new Error(error));
    }
    return student;
  },
};
