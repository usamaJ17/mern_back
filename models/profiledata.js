const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: Date, required: true },
  address: { type: String, required: true },
  occupation: { type: String },
  education: { type: String },
  gender: { type: String },
  maritalStatus: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  livingWith: { type: String },
  relationshipsDescription: { type: String },
  currentlyEmployed: { type: Boolean },
  physicalHealth: { type: String },
  seriousIllnesses: { type: Boolean },
  medicationOrSubstances: { type: String },
  mentalHealthSymptoms: { type: String },
  treatmentForMentalHealth: { type: String },
  suicidalThoughts: { type: Boolean },
  familyMentalHealth: { type: String },
  relationshipWithFamily: { type: String },
  childhoodAndYouth: { type: String },
  birthAndEarlyChildhood: { type: String },
  educationalAndCareerDevelopment: { type: String },
  significantLifeEvents: { type: String },
  typicalDiet: { type: String },
  regularExercise: { type: Boolean },
  consumptionHabits: { type: String },
  stressManagement: { type: String },
  relationshipDescription: { type: String },
  selfImage: { type: String },
  therapyExpectations: { type: String },
  specificGoals: { type: String },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
