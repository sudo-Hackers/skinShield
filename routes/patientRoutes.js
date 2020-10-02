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

router.post("/saveMonitorData", isAuth, patientController.saveMonitorData);

router.get("/sendVideoRequest/:doctorId", isAuth, patientController.sendVideoRequest);

router.post('/photos', isAuth, patientController.postPhoto);

router.get('/photos', isAuth, patientController.getPhoto);

router.get('/photos/:id', patientController.getSinglePhoto);

router.post('/trialPhoto', patientController.postTrialPhoto);

router.post('/savePhoto',patientController.postClickPhoto);

// routes for testing purpose
router.get('/prediction', patientController.getPrdiction);

module.exports = router;