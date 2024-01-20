const Appointment = require("../models/appoitment");
const nodemailer = require("nodemailer");
const Profile = require("../models/profiledata");
const Questionary = require("../models/questionary");
const pdf = require("html-pdf");


const Oppintment = {
  async UserOppintment(req, res, next) {
    const { date, time, user } = req.body;

    if (!date || !time || !user) {
      return res
        .status(400)
        .json({ error: "Date, time, and user are required." });
    }

    try {
      // Check if an appointment already exists for the given date, time, and user
      const existingAppointment = await Appointment.findOne({
        date,
        time,
        user,
      });

      if (existingAppointment) {
        return res.status(400).json({
          error: "Appointment already exists for this date, time, and user.",
        });
      }

      // If no existing appointment, create and save the new appointment
      const newAppointment = new Appointment({ date, time, user });
      await newAppointment.save();

      res.status(201).json(newAppointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res
        .status(500)
        .json({ error: error.message || "Internal server error." });
    }
  },
  async getUserOppintment(req, res, next) {
    try {
      const appointments = await Appointment.find();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  },
  async profiledata(req, res, next) {
    const {
      fullname,
      email,
      birthday,
      address,
      occupation,
      education,
      gender,
      maritalStatus,
      user,
      livingWith,
      relationshipsDescription,
      currentlyEmployed,
      physicalHealth,
      seriousIllnesses,
      medicationOrSubstances,
      mentalHealthSymptoms,
      treatmentForMentalHealth,
      suicidalThoughts,
      familyMentalHealth,
      relationshipWithFamily,
      childhoodAndYouth,
      birthAndEarlyChildhood,
      educationalAndCareerDevelopment,
      significantLifeEvents,
      typicalDiet,
      regularExercise,
      consumptionHabits,
      stressManagement,
      relationshipDescription,
      selfImage,
      therapyExpectations,
      specificGoals,
    } = req.body;
  
    if (!fullname || !email || !birthday || !address || !user) {
      return res
        .status(400)
        .json({ error: "fullname, email, and user are required." });
    }
  
    try {
      // If no existing appointment, create and save the new appointment
      const newProfile = new Profile({
        fullname,
        email,
        birthday,
        address,
        occupation,
        education,
        gender,
        maritalStatus,
        user,
        livingWith,
        relationshipsDescription,
        currentlyEmployed,
        physicalHealth,
        seriousIllnesses,
        medicationOrSubstances,
        mentalHealthSymptoms,
        treatmentForMentalHealth,
        suicidalThoughts,
        familyMentalHealth,
        relationshipWithFamily,
        childhoodAndYouth,
        birthAndEarlyChildhood,
        educationalAndCareerDevelopment,
        significantLifeEvents,
        typicalDiet,
        regularExercise,
        consumptionHabits,
        stressManagement,
        relationshipDescription,
        selfImage,
        therapyExpectations,
        specificGoals,
      });
  
      await newProfile.save();
  
      res.status(201).json(newProfile);
    } catch (error) {
      console.error("Error creating profile:", error);
      res
        .status(500)
        .json({ error: error.message || "Internal server error." });
    }
  },
  async sendMail({ email, appointmentDate, appointmentTime }) {
    try {
      const subject = "Appointment Details";
      const currentDate = new Date();

      // Create Transport Object
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Fixed recipient email address
      const toEmail = "zebimalik4567@gmail.com";

      // Send Mail
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: toEmail,
        subject: subject,
        html: `
          <div>
            <p>Appointment is Book by ${email} for ${appointmentDate} at ${appointmentTime}.</p>
          </div>
        `,
      });

      return { appointmentDate, appointmentTime };
    } catch (error) {
      throw error;
    }
  },
  async sendMailWithPDF({
    email,
    fullname,
    address,
    birthday,
    livingWith,
    relationshipsDescription,
    currentlyEmployed,
    physicalHealth,
    seriousIllnesses,
    medicationOrSubstances,
    mentalHealthSymptoms,
    treatmentForMentalHealth,
    suicidalThoughts,
    familyMentalHealth,
    relationshipWithFamily,
    childhoodAndYouth,
    birthAndEarlyChildhood,
    educationalAndCareerDevelopment,
    significantLifeEvents,
    typicalDiet,
    regularExercise,
    consumptionHabits,
    stressManagement,
    relationshipDescription,
    selfImage,
    therapyExpectations,
    specificGoals,
  }) {
    try {
      const subject = "User Profile Details";
  
      // Create HTML content for the PDF
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f2f2f2; color: #333;">
        <h2 style="color: #004080;">User Profile Details</h2>
        <p>
            Thank you for providing your profile details! Below are the details:
        </p>
        <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Full Name:</strong> ${fullname}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Birthday:</strong> ${birthday}</li>
            <li><strong>Living With:</strong> ${livingWith}</li>
            <li><strong>Relationships Description:</strong> ${relationshipsDescription}</li>
            <li><strong>Currently Employed:</strong> ${currentlyEmployed}</li>
            <li><strong>Physical Health:</strong> ${physicalHealth}</li>
            <li><strong>Serious Illnesses:</strong> ${seriousIllnesses}</li>
            <li><strong>Medication or Substances:</strong> ${medicationOrSubstances}</li>
            <li><strong>Mental Health Symptoms:</strong> ${mentalHealthSymptoms}</li>
            <li><strong>Treatment for Mental Health:</strong> ${treatmentForMentalHealth}</li>
            <li><strong>Suicidal Thoughts:</strong> ${suicidalThoughts}</li>
            <li><strong>Family Mental Health:</strong> ${familyMentalHealth}</li>
            <li><strong>Relationship with Family:</strong> ${relationshipWithFamily}</li>
            <li><strong>Childhood and Youth:</strong> ${childhoodAndYouth}</li>
            <li><strong>Birth and Early Childhood:</strong> ${birthAndEarlyChildhood}</li>
            <li><strong>Educational and Career Development:</strong> ${educationalAndCareerDevelopment}</li>
            <li><strong>Significant Life Events:</strong> ${significantLifeEvents}</li>
            <li><strong>Typical Diet:</strong> ${typicalDiet}</li>
            <li><strong>Regular Exercise:</strong> ${regularExercise}</li>
            <li><strong>Consumption Habits:</strong> ${consumptionHabits}</li>
            <li><strong>Stress Management:</strong> ${stressManagement}</li>
            <li><strong>Relationship Description:</strong> ${relationshipDescription}</li>
            <li><strong>Self Image:</strong> ${selfImage}</li>
            <li><strong>Therapy Expectations:</strong> ${therapyExpectations}</li>
            <li><strong>Specific Goals:</strong> ${specificGoals}</li>
        </ul>
        <p>
            Thank you for sharing your profile with us!
        </p>
    </div>
        `;
  
      // Convert HTML to PDF
      const pdfBuffer = await new Promise((resolve, reject) => {
        pdf.create(htmlContent).toBuffer((err, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buffer);
          }
        });
      });
  
      // Create Transport Object
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
  
      // Fixed recipient email address
      const toEmail = "zebimalik4567@gmail.com"; // Update with your desired recipient email
  
      // Send Mail with PDF attachment
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: toEmail,
        subject: subject,
        text: "User Profile Details",
        attachments: [
          {
            filename: "UserProfileDetails.pdf",
            content: pdfBuffer,
            encoding: "base64",
          },
        ],
      });
  
      return { email,
        fullname,
        address,
        birthday,
        livingWith,
        relationshipsDescription,
        currentlyEmployed,
        physicalHealth,
        seriousIllnesses,
        medicationOrSubstances,
        mentalHealthSymptoms,
        treatmentForMentalHealth,
        suicidalThoughts,
        familyMentalHealth,
        relationshipWithFamily,
        childhoodAndYouth,
        birthAndEarlyChildhood,
        educationalAndCareerDevelopment,
        significantLifeEvents,
        typicalDiet,
        regularExercise,
        consumptionHabits,
        stressManagement,
        relationshipDescription,
        selfImage,
        therapyExpectations,
        specificGoals, };
    } catch (error) {
      throw error;
    }
  },
  async getQuestion(req, res) {
    try {
      const questions = await Questionary.find();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async postQuestion(req, res) {
    const { question, options, correctAnswer, selectedAnswer } = req.body;
  
    try {
      const newQuestion = new Questionary({
        question,
        options,
        correctAnswer,
        selectedAnswer,
      });
  
      const savedQuestion = await newQuestion.save();
      res.json(savedQuestion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = Oppintment;
