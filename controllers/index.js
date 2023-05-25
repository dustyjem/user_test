const mongodb = require('../db/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const db = await mongodb.getDb();
  const result = await db.db('profolio').collection('user_testing').find().toArray();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const result = await db.db('profolio').collection('user_testing').find({ _id: userId }).toArray();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result[0]);
};

const create = async (req, res, next) => {
  const db = await mongodb.getDb();
  const contact = {
    first_name: req.body.first_name,
    middle_initial: req.body.middle_initial,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    objective: req.body.objective,
    school_name: req.body.school_name,
    school_location: req.body.school_location,
    degree: req.body.degree,
    major: req.body.major,
    minor: req.body.minor,
    gpa: req.body.gpa,
    graduation_date: req.body.graduation_date,
    job_title: req.body.job_title,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    job_description: req.body.job_description,
    skill: req.body.skill,
    project_title: req.body.project_title,
    project_description: req.body.project_description,
    project_link: req.body.project_link,
    award: req.body.award,
    certification: req.body.certification,
    volunteer_title: req.body.volunteer_title,
    volunteer_organization: req.body.volunteer_organization,
    volunteer_start_date: req.body.volunteer_start_date,
    volunteer_end_date: req.body.volunteer_end_date,
    volunteer_description: req.body.volunteer_description,
    language: req.body.language,
    reference: req.body.reference
  };
  const result = await db.db('profolio').collection('user_testing').insertOne(contact);

  res.setHeader('Content-Type', 'application/json');
  res.status(201).json({ id: result.insertedId });
};

const update = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const updatedContact = {
    name: req.body.firstName,
    lastName: req.body.lastName,
    favoriteColor: req.body.favoriteColor,
    firstName: req.body.firstName,
    email: req.body.email,
    birthday: req.body.birthday
  };
  const result = await db.db('profolio').collection('user_testing').updateOne(
    { _id: userId },
    { $set: updatedContact }
  );

  res.status(204).send();
};

const remove = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const result = await db.db('profolio').collection('user_testing').deleteOne({ _id: userId });

  res.status(204).send();
};

module.exports = { getAll, getSingle, create, update, remove };
