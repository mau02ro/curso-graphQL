"use strict";
const connectDB = require("./db.js");
const { ObjectId } = require("mongodb");

// ----------------------------------------------------
// ----------------------------------------------------
//  Course mutation
// ----------------------------------------------------
// ----------------------------------------------------
const COURSE = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: "",
      topic: "",
    };

    const newCourse = Object.assign(defaults, input);
    let db;
    let course;
    try {
      db = await connectDB();
      course = await db.collection("cs").insertOne(newCourse);
      input._id = course.insertedId;
    } catch (error) {
      console.error("createCourse:", new Error(error));
    }
    return input;
  },
  editCourse: async (root, { _id, input }) => {
    let db;
    let course;
    try {
      db = await connectDB();
      await db.collection("cs").updateOne(
        { _id: ObjectId(_id) },
        {
          $set: input,
        }
      );
      course = await db.collection("cs").findOne({ _id: ObjectId(_id) });
    } catch (error) {
      console.error("editCourse:", new Error(error));
    }
    return course;
  },
  deleteCourse: async (root, { _id }) => {
    let db;
    let message = "";
    console.log(_id);
    try {
      db = await connectDB();
      await db.collection("cs").deleteOne({ _id: ObjectId(_id) });
      message = "Course delete!";
    } catch (error) {
      message = "Error on delete!";
      console.error("deleteCourse:", new Error(error));
    }
    return message;
  },
};

// ----------------------------------------------------
// ----------------------------------------------------
//  Student mutation
// ----------------------------------------------------
// ----------------------------------------------------
const STUDENT = {
  createStudent: async (root, { input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      student = await db.collection("students").insertOne(input);
      input._id = student.insertedId;
    } catch (error) {
      console.error("createStudent:", new Error(error));
    }
    return input;
  },
  editStudent: async (root, { _id, input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      await db.collection("students").updateOne(
        { _id: ObjectId(_id) },
        {
          $set: input,
        }
      );
      student = await db.collection("students").findOne({ _id: ObjectId(_id) });
    } catch (error) {
      console.error("editStudent:", new Error(error));
    }
    return student;
  },
  deleteStudent: async (root, { _id }) => {
    let db;
    let message = "";
    try {
      db = await connectDB();
      await db.collection("students").deleteOne({ _id: ObjectId(_id) });
      message = "Course delete!";
    } catch (error) {
      message = "Error on delete!";
      console.error("deleteCourse:", new Error(error));
    }
    return message;
  },
  addPeople: async (root, { courseID, personID }) => {
    let db, person, course;
    try {
      db = await connectDB();
      course = await db.collection("cs").findOne({ _id: ObjectId(courseID) });
      person = await db
        .collection("students")
        .findOne({ _id: ObjectId(personID) });
      if (!course || !person)
        throw new Error("La persona o el curso no existe");

      await db
        .collection("cs")
        .updateOne(
          { _id: ObjectId(courseID) },
          { $addToSet: { people: ObjectId(personID) } }
        );
    } catch (error) {
      console.error("addPeople:", new Error(error));
    }
    return course;
  },
};

module.exports = Object.assign(COURSE, STUDENT);
