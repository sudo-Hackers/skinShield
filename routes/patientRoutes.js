const express = require('express');
const router = express.Router();
const multer = require('multer');

const isAuth = require('../middleware/is-auth');
const patientController = require('../controller/patientController');


const upload = multer({
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
        cb(new Error('only upload files with jpg or jpeg or png format.'));
      }
      cb(undefined, true); // continue with upload
    }
  });

router.get("/getDoctors", isAuth, patientController.getDoctors);

router.post("/saveProfile", isAuth, patientController.saveProfile);

router.get("/getProfile", isAuth, patientController.getProfile);

router.get("/sendRequest/:doctorId", isAuth, patientController.sendRequest);

router.get("/getAppointedDoctors", isAuth, patientController.getAppointedDoctors);

router.get("/getPrescription/:doctorId", isAuth, patientController.getPrescription);

router.post("/sendProblem/:doctorId", isAuth, patientController.sendProblem);

router.post("/saveMonitorData", isAuth, patientController.saveMonitorData);

router.get("/sendVideoRequest/:doctorId", isAuth, patientController.sendVideoRequest);

router.post('/photos', isAuth, upload.single('photo'), patientController.postPhoto);

router.get('/photos', isAuth, patientController.getPhoto);

router.get('/photos/:id', patientController.getSinglePhoto);

module.exports = router;