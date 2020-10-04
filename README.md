# Skin_sheild

> **Thanks to AGBI Hackathon and Judges for coming up with this hackathon and providing us a platform to exibit our skills**


```
This is under development phase
Complete practical(Production) build is still under development
```

### An all in one digital platform which bridges the gap between the patients and physicians for better care of your health during these days under monitorization from doctors. 

## 📌 Inspiration
Skin Cancer is the most common of all cancers. The number of deaths due to skin cancer is being increased at a rapid rate. However, the survival rate for skin cancer is near 99% when detected at an "Early Stage". So it is best to detect skin cancer as early as possible. 

There are a plethora of apps that can predict skin cancer. But our App not only detects whether the user has skin cancer but also predicts the kind of cancer. 
When a person gets diagnosed with skin cancer, he/she searches for nearby hospitals and requests an appointment with a doctor. But this is a tedious procedure. 
With our SkinShield App, we have made it easy to schedule video appointments with doctors. Our app also provides locations of nearby dermatologists. If a patient has any problems, he/she can discuss this with their appointed doctors. The doctor can provide prescriptions to the patient. 

"FEAR is the worst enemy of all". A person who is diagnosed with skin cancer immediately gets anxious and worried. As a solution to this, we have included a discussion forum in our App, where users can share inspiring stories about how they fought the disease and support each other in case of any queries.
We have also integrated a virtual assistant in our App so that the user can be guided to have easy and smooth navigation throughout the App.   
After the campaign is over, with good funding, we want to improve the deep learning model with extensive research. We want to tie up with some hospitals to get in touch with the doctors and have them associated with our App.
## Idea

Skin shield is progressive web application that is installable and it gives an app-like experience on desktop and mobile that are built and directly delivered by the web. It is aimed to detect skin cancer and simplify the doctor consultation and weekly monitoring in the times of this global pandemic.

## 🎯 What it does

1.Skin shield uses deep learning algorithms to predict skin cancer.

2.Our app allows the users to get a trial test first and if they are detected with skin cancer they can create account and track their weekly progress.

3.Doctors go through the patient’s report weekly and can prescribe medicines using virtual prescriptions.

4.Patients can fix video-appointments with their doctor whenever required

5.Skin shield stores the patient’s report in the database so that the doctor can monitor them.

6.Patients can share their experience with other users or read other’s experience using Discussion forums.

**Patient**
* A patient can predict the type of cancer and some possible treatments and preventions for the detected type of cancer.

* Moreover the patient can also view his/her weekly predicted report to keep a record fo his improvement.

* Next, we have a doctors panel where patient can go through doctors profile and request for appointment according to his requirements.

* Upon confirmation from doctor, we have one prescription panel where patient can view his doctors who will monitor them and go to the prescription page and tell the doctors about his problem and get prescribed by them.

* In the prescription panel we are also giving feature to appoint for video call. Patient can request for a video call and can view his scheduled event details once the doctor scheduled it.

* Next we have discussion forums where all the patients can discuss about their experiences with skin-cancer so that no one panics if he/she is diagonised.

* Patient can also view its nearest hospital based on his location and get its details like ambulance number for emergency use.

**Doctor**
* Upon login, doctor will get his dashboard where he get the patients whom he was monitoring. He can view each patient reports on weekly basis and monitor him.

* Next, prescription panel is available where he can prescribe his patient upon monitoring his data on daily basis.

* Doctor can schedule his video appointment through Meet using Google calendar when requested by the patient.

* Coming to rural uneducated people, we have developed a chatbot which can guide them to use the app. For minor consultation, chatbot can also provide you with the medicines details and the doctors details for easy use.



## .env file inside client
REACT_APP_PUBLIC_VAPID_KEY= ''
REACT_APP_LINK = 'http://localhost:3001'

## .env file in the main folder
MONGODB_URI = ''
api_key = ''


WEB_PUSH_CONTACT = 'mailto: b518045@iiit-bh.ac.in'
PUBLIC_VAPID_KEY = ''
PRIVATE_VAPID_KEY = ''

## steps to start it in development mode
1. npm i --save inside client 
2. npm i --save in the main folder
3. npm start in the main folder(server)
4. npm start inside client(client)
5. client runs in 3000 and server in 3001
6. now ready to go
