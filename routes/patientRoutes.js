const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/is-auth');
const patientController = require('../controller/patientController');

router.get("/getDoctors", isAuth, patientController.getDoctors);

router.post("/saveProfile", isAuth, patientController.saveProfile);

router.get("/getProfile", isAuth, patientController.getProfile);

router.get("/sendRequest/:doctorId", isAuth, patientController.sendRequest);

router.get("/getAppointedDoctors", isAuth, patientController.getAppointedDoctors);

router.get("/getPrescription/:doctorId", isAuth, patientController.getPrescription);

router.post("/sendProblem/:doctorId", isAuth, patientController.sendProblem);

router.get("/sendVideoRequest/:doctorId", isAuth, patientController.sendVideoRequest);

//routes for inside prediction page
router.post('/photos', isAuth, patientController.postPhoto);
router.post('/savePhoto', isAuth, patientController.postClickPhoto);

//routes for report page
router.get('/photos', isAuth, patientController.getPhoto);

// routes for trial prediction page
router.post('/trialPhoto', patientController.postTrialPhoto);
router.post('/trialClick', patientController.postTrialClick);

//routes for discussion forum
router.post('/saveForum', isAuth, patientController.saveForum);
router.get('/getForum', isAuth, patientController.getForum);

// routes for testing purpose
router.get('/prediction', patientController.getPrdiction);

module.exports = router;