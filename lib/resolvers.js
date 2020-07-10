"use strict";

const connectDB = require("./db.js");
const { ObjectId } = require("mongodb");

module.exports = {
  // "Devuelve todos los cursos"
  Query: {
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
  },
};
