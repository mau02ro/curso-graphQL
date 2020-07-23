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
  getPeople: async () => {
    let db,
      students = [];
    try {
      db = await connectDB();
      students = await db.collection("students").find().toArray();
    } catch (error) {
      console.error("getPeople: ", new Error(error));
    }
    return students;
  },
  getPerson: async (root, { id }) => {
    let db,
      student = {};
    try {
      db = await connectDB();
      student = await db.collection("students").findOne({ _id: ObjectId(id) });
    } catch (error) {
      console.error("getPersons: ", new Error(error));
    }
    return student;
  },
  searchItems: async (root, { keyword }) => {
    let db, items, courses, people;
    try {
      db = await connectDB();
      courses = await db
        .collection("cs")
        .find({ $text: { $search: keyword } })
        .toArray();
      people = await db
        .collection("students")
        .find({ $text: { $search: keyword } })
        .toArray();

      items = [...courses, ...people];
    } catch (error) {
      console.error("getPersons: ", new Error(error));
    }
    return items;
  },
};
