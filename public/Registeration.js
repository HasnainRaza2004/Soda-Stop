
// // ===================Regiteration Functionality============

function openRegister(){
   card.style.transform = "rotateY(-180deg)";
  };
    
    
 function openLogin(){
       card.style.transform = "rotateY(0deg)";
   };
    
   newhere.addEventListener("click", function(){
       openRegister();
        
      });
    alreadyaccount.addEventListener("click", function(){
       openLogin();
             });


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-wZwIberiniYCQK0AVWxBSRrMTC8CJS0",
  authDomain: "soda-stop.firebaseapp.com",
  databaseURL: "https://soda-stop-default-rtdb.firebaseio.com",
  projectId: "soda-stop",
  storageBucket: "soda-stop.appspot.com",
  messagingSenderId: "959207809758",
  appId: "1:959207809758:web:6087e9ccc536414f2a584f",
  measurementId: "G-N1D0JHYRFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

//================ Sign Up Work =============
var regForm = document.getElementById('regForm')
var loginForm = document.getElementById('loginForm')
var nameInp = document.getElementById("Fullname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var errorShow = document.getElementById("errorShow");
var logout = document.getElementById("logout");
// var signupBtn = document.getElementById("signup-Btn");
// var loginBtn = document.getElementById("login-Btn");


// logout.addEventListener("click",() =>{
//   signOut(auth).then((success) =>{
//     console.log(success.message);
//   })
// })


// signOut(auth).then((success) =>{
//       console.log(success.message);
//     })

regForm.onsubmit = (e) => {
  e.preventDefault()
  var obj = {
    name: nameInp.value,
    email: email.value,
    password: password.value,
  };

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      console.log("Sucess")
      registererror.innerHTML = "User Created Successfully";
      console.log(success.user.uid);
      obj.uid = success.user.uid;
       // ============= database work ===================
       const refrence = ref(db, "users/" + obj.uid);
       set(refrence, obj)
       .then(function (success){
        //  console.log(success.message);
          window.location.replace("index.html");
       })
    })
    .catch(function (rej) {
      console.log("User already Exist");
      console.log(rej.code);
      console.log(rej.message);
      registererror.innerHTML = `User already Exist`;
    });
};

 

loginForm.onsubmit = (e) => {
  e.preventDefault()
  var obj = {
    email: loginEmail.value,
    password: loginPassword.value,
  };
  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      console.log("User Sign in Successfully");
      console.log(success);
      errorShow.innerHTML = `User Created Successfully`;
      // window.location.assign("index.html");
      const loginReference = ref(db);
      get(child(loginReference, "users/" + success.user.uid))
        .then(function (userData) {
          console.log(userData.val());
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (rej) {
      console.log("User Sign in Rejected");
      console.log(rej.message);
      errorShow.innerHTML = `User not found`;
    });

  console.log(obj);
}

// function sendtoindex(){
//   if(errorShow.innerHTML = "User Created Successfully"){
//   };
  

// };

// signupBtn.addEventListener("click", function () {
//   sendtoindex();
// });
// loginBtn.addEventListener("click", function () {
  
// });
