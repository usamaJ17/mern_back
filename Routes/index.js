const express = require("express");
const router = express.Router();


const authController = require("../Controller/authController");
const auth = require("../midleware/auth");
const Oppintment = require("../Controller/UserProgress");






// Import your route handlers
//user
router.post("/register", authController.userregister);
//login
router.post("/login", authController.userlogin);
//logout
router.post("/logout", auth.userauth, authController.userlogout);
router.get('/refresh', authController.userrefresh);



// Avalible Minner

router.get('/get-appointments' , auth.userauth , Oppintment.getUserOppintment);
router.post('/book-appointment' , auth.userauth , Oppintment.UserOppintment);
router.post('/addprofile' , auth.userauth , Oppintment.profiledata);
router.post('/send-appointment-email', async (req, res) => {
    try {
      const { appointmentDate, appointmentTime, email } = req.body;
  
      // Log the received details
      console.log('Received appointment details:', appointmentDate, appointmentTime, email);
  
      // Send email using Oppintment.sendMail
      const result = await Oppintment.sendMail({ appointmentDate, appointmentTime, email });
  
      // Log the result (you may want to log the actual email content here)
      console.log('Email sent successfully:', result);
  
      res.status(200).json({ message: 'Email sent successfully', result });
    } catch (error) {
      console.error('Error sending email:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
router.post('/send-profiledata-email', async (req, res) => {
    try {
      const {
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
      } = req.body;
  
      // Log the received details
      console.log(
        'Received profile details:',
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
        specificGoals
      );
  
      // Send email using sendMailWithPDF function
      const result = await Oppintment.sendMailWithPDF({
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
      });
  
      // Log the result (you may want to log the actual email content here)
      console.log('Email sent successfully:', result);
  
      res.status(200).json({ message: 'Email sent successfully', result });
    } catch (error) {
      console.error('Error sending email:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get("/question", Oppintment.getQuestion)

router.post("/postquestion", Oppintment.postQuestion)

  






module.exports = router;
