const Patient = require('../models/patientAuth');
const Doctor = require('../models/doctorAuth');
const Relation = require('../models/relation');
const Prescription = require('../models/prescription');
const Monitor = require('../models/monitorData');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Appointment = require('../models/appointments');
const fs = require('fs');
const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node');

const Photo = require('../models/photo');
const idu = require('image-data-uri');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.api_key
        }
    })
);


exports.getDoctors = async (req, res, next) => {
    const id = req.userId;
    try {
        var patient = await Patient.findById(id);
        var docInRel = await Relation.find({ patientId: id });
        var doctors = await Doctor.find();
        var reqDoc = patient.request;
        console.log(reqDoc);
        var relDoc = docInRel.map(el => el.doctorId.toString());
        console.log(relDoc);
        var fdoc = reqDoc.concat(relDoc);
        var filterDoc = doctors.filter(el => !fdoc.includes(el._id.toString()));
        console.log(filterDoc);
        res.status(200).json({ message: "success", users: filterDoc });
    } catch (err) {
        next(err);
    }
}

exports.saveProfile = async (req, res, next) => {
    const id = req.userId;
    const { location, gender, age, contact, weight, height, aboutMe, disease, medicines } = req.body;
    console.log(disease);
    console.log(medicines);
    try {
        const patient = await Patient.findById(id);
        patient.city = location.city;
        patient.state = location.state;
        patient.zip = parseInt(location.zip);
        patient.gender = gender;
        patient.age = parseInt(age);
        patient.contact1 = parseInt(contact.contact1);
        patient.contact2 = parseInt(contact.contact2);
        patient.weight = parseInt(weight);
        patient.height = parseInt(height);
        patient.disease = disease;
        patient.medicines = medicines;
        patient.aboutMe = aboutMe;
        var result = await patient.save();
        console.log(result);
        res.status(200).json({ message: "success", profile: result });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.getProfile = async (req, res, next) => {
    const id = req.userId;
    try {
        const profile = await Patient.findById(id);
        console.log(profile);
        var data = await Monitor.findOne({ patientId: id });
        console.log(data);
        res.status(200).json({ message: "success", profile: profile, monitorData: data });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.sendRequest = async (req, res, next) => {
    const docId = req.params.doctorId;
    const patientId = req.userId;
    console.log(docId);
    try {
        const doctor = await Doctor.findById(docId);
        const patient = await Patient.findById(patientId);
        patient.request.push(docId);
        await patient.save();
        doctor.invitation.push(patientId);
        await doctor.save();
        res.status(200).json({ message: "success" });
        console.log("email starting");
        const email = patient.email;
        const name = patient.name;
        const disease = patient.disease;
        const about = patient.aboutMe;
        transporter.sendMail({
            to: doctor.email,
            from: 'b518045@iiit-bh.ac.in',
            subject: 'New appointment request',
            html: `
                <h3>New appointment request from ${email}</h3>
                <p>Name: ${name}</p>
                <p>Disease: ${disease}</p>
                <p>About: ${about}</p>
                <p><a href="http://localhost:3000">Confirm Appointment</a></p>
            `
        });
        console.log("email sent");
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.getAppointedDoctors = async (req, res, next) => {
    const id = req.userId;
    try {
        var arr = [];
        const result = await Relation.find({ patientId: id });
        for (let i = 0; i < result.length; i++) {
            const docId = result[i].doctorId;
            const data = await Doctor.findById(docId);
            arr.push(data);
        }
        console.log("doctors", '\n');
        console.log(arr);
        res.status(200).json({ message: "success", arr: arr });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.getPrescription = async (req, res, next) => {
    const id = req.userId;
    const docId = req.params.doctorId;
    try {
        const result = await Relation.findOne({ doctorId: docId, patientId: id });
        const relationId = result._id;
        const resData = await Prescription.findOne({ relationId: relationId });
        var prescArr = [];
        var problemArr = [];
        var event = [];
        const eventData = await Appointment.find({ patientId: id, doctorId: docId });
        if (eventData) {
            event = eventData;
            console.log(event);
        }
        if (resData) {
            prescArr = resData.data;
            problemArr = resData.problem;
            console.log(prescArr, '\n', problemArr);
            res.status(200).json({ message: "success", prescArr: prescArr, problemArr: problemArr, event: event });
        } else {
            res.status(200).json({ message: "success", prescArr: prescArr, problemArr: problemArr, event: event });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.sendProblem = async (req, res, next) => {
    const id = req.userId;
    const docId = req.params.doctorId;
    try {
        const result = await Relation.findOne({ doctorId: docId, patientId: id });
        const relationId = result._id;
        const problem = req.body.problem;
        const time = req.body.time;
        const presc = await Prescription.findOne({ relationId: relationId });
        if (presc) {
            presc.problem.push({
                problemData: problem,
                time: time
            });
            const resu = await presc.save();
            console.log(resu);
        } else {
            const prescription = new Prescription({
                relationId: relationId,
                problem: {
                    problemData: problem,
                    time: time
                }
            });
            const resu = await prescription.save();
            console.log(resu);
        }
        const arr = await Prescription.findOne({ relationId: relationId });
        res.status(200).json({ message: "success", arr: arr });
    } catch (err) {

    }
}

exports.saveMonitorData = async (req, res, next) => {
    const { bloodpressure, diabetes, covid, calories, pulse } = req.body;
    const id = req.userId;
    try {
        const resu = await Monitor.findOne({ patientId: id });
        if (resu) {
            resu.patientId = id;
            resu.bloodpressure = bloodpressure;
            resu.diabetes = diabetes;
            resu.covid = covid;
            resu.calories = calories;
            resu.pulse = pulse;
            const result = await resu.save();
            console.log(result); res.status(200).json({ message: "success", arr: result });
        } else {
            const data = new Monitor({
                bloodpressure: bloodpressure,
                diabetes: diabetes,
                covid: covid,
                calories: calories,
                pulse: pulse,
                patientId: id
            });
            const result = await data.save();
            console.log(result);
            res.status(200).json({ message: "success", arr: result });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.sendVideoRequest = async (req, res, next) => {
    const docId = req.params.doctorId;
    const patientId = req.userId;
    try {
        const doctor = await Doctor.findById(docId);
        const d = new Date();
        const obj = {
            patientId: patientId,
            date: d.toDateString()
        };
        doctor.appointment.push(obj);
        await doctor.save();
        console.log("sent");
        res.status(200).json({ message: "success" });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.postPhoto = async (req, res, next) => {
    try {
        console.log("hello");
        const id = req.userId;
        var url = req.file.path.replace("\\","/");
        const imgContents = fs.readFileSync(url);
        const img = tfn.node.decodeImage(imgContents, channels = 3);
        var img1 = img.resizeNearestNeighbor([224, 224]).toFloat().div(255.0);
        var img2 = img1.reshape([1, 224, 224, 3]);
        const model = await tf.loadLayersModel('file://E:/WORKSPACE/skin_shield/skinShield/tfjs-models/model1/model.json');
        const prediction = await model.predict(img2).array();
        var report;
        var cancerDetect = ['Benign','Malignant'];
        if (prediction[0][0] > prediction[0][1]) {
            report = cancerDetect[0];
        } else {
            var cancerType = ['bcc', 'nv', 'melanoma'];
            var img3 = img.resizeNearestNeighbor([128, 128]).toFloat().div(255.0);
            var img4 = img3.reshape([1, 128, 128, 3]);
            const model2 = await tf.loadLayersModel('file://E:/WORKSPACE/skin_shield/skinShield/tfjs-models/model2/model.json');
            const predictCancer = await model2.predict(img4).array();
            if(predictCancer[0][0]>0.3)
                report = cancerType[0];
            else if(predictCancer[0][1]>0.3)
                report = cancerType[1];
            else{
                let i = predictCancer[0].indexOf(Math.max(...predictCancer[0]));
                report = cancerType[i];
            }
        }
        const monitor = new Monitor({
            patientId: id,
            photoUrl: req.file.path.replace("\\","/"),
            report: report
        });
        const result = await monitor.save();
        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            upload_error: 'Error while uploading file...Try again later.'
        });
    }
}

exports.getPhoto = async (req, res, next) => {
    try {
        const photos = await Monitor.find({patientId: req.userId});
        res.send(photos);
    } catch (error) {
        res.status(500).send({ get_error: 'Error while getting list of photos.' });
    }
}

exports.getSinglePhoto = async (req, res, next) => {
    try {
        const result = await Monitor.findById(req.params.id);
        res.set('Content-Type', 'image/jpeg');
        res.send(result.photo);
    } catch (error) {
        res.status(400).send({ get_error: 'Error while getting photo.' });
    }
}


// controllers for testing purpose

exports.getPrdiction = async (req, res, next) => {
    try {
        const imgContents = fs.readFileSync('images/photo-1601554295241.jpg');
        const img = tfn.node.decodeImage(imgContents, channels = 3);
        var img1 = img.resizeNearestNeighbor([224, 224]).toFloat().div(255.0);
        var img2 = img1.reshape([1, 224, 224, 3]);
        // console.log(imgContents);
        const model = await tf.loadLayersModel('file://E:/WORKSPACE/skin_shield/skinShield/tfjs-models/model1/model.json');
        const prediction = await model.predict(img2).array();
        console.log(prediction);
        if (prediction[0][0] > prediction[0][1]) {
            console.log("Cancer not detected!");
        } else {
            var arr = ['bcc', 'nv', 'melanoma'];
            var img3 = img.resizeNearestNeighbor([128, 128]).toFloat().div(255.0);
            var img4 = img3.reshape([1, 128, 128, 3]);
            const model2 = await tf.loadLayersModel('file://E:/WORKSPACE/skin_shield/skinShield/tfjs-models/model2/model.json');
            const predictCancer = await model2.predict(img4).array();
            console.log(predictCancer);
            if(predictCancer[0][0]>0.3)
                console.log(arr[0]);
            else if(predictCancer[0][1]>0.3)
                console.log(arr[1]);
            else{
                let i = predictCancer[0].indexOf(Math.max(...predictCancer[0]));
                console.log(arr[i]);
            }
            console.log("Cancer detected");
        }
        res.send({ message: "helllo" });
    }
    catch (err) {
        console.log(err);
    }
}

exports.postClickPhoto = async(req, res, next) => {
    try{
        console.log("hello");
        const dataUri = req.body.uri;
        const dt = Date.now();
        let filePath = `images/${dt}`;
        const result = await idu.outputFile(dataUri, filePath);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}