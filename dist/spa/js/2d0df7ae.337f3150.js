(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0df7ae"],{"89a8":function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("q-page",{attrs:{padding:""}},[t("div",{staticClass:"text-h4 q-py-md"},[e._v("\n    Sign Up\n  ")]),t("form",{on:{submit:function(s){return s.preventDefault(),e.onSubmit(s)}}},[t("q-input",{ref:"email",staticStyle:{padding:"10px"},attrs:{filled:"",placeholder:"Email","lazy-rules":"",rules:[function(s){return e.validEmail||"Invalid email format."}]},model:{value:e.email,callback:function(s){e.email=s},expression:"email"}}),t("q-input",{ref:"username",staticStyle:{padding:"10px"},attrs:{filled:"",placeholder:"Username",rules:[function(e){return e.length<=20||"Please limit your username to 20 characters."}]},model:{value:e.username,callback:function(s){e.username=s},expression:"username"}}),t("q-input",{ref:"password",staticStyle:{padding:"10px"},attrs:{filled:"",placeholder:"Password",type:"password",rules:[function(e){return e.length<=100||"Please limit your password to 100 characters."}]},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}}),t("q-input",{ref:"confirmedPassword",staticStyle:{padding:"10px"},attrs:{filled:"",placeholder:"Confirm Password",type:"password","lazy-rules":"",rules:[function(s){return e.matchingPasswords||"Password doesn't match."}]},model:{value:e.confirmedPassword,callback:function(s){e.confirmedPassword=s},expression:"confirmedPassword"}}),t("div",{staticClass:"row justify-around",staticStyle:{margin:"30px"}},[t("q-btn",{attrs:{type:"submit",color:"primary",label:"Create Account",disable:!e.readyToSubmit}}),t("q-btn",{attrs:{color:"primary",label:"Reset"},on:{click:e.onReset}})],1)],1)])},i=[],r=t("3156"),n=t.n(r),l=t("2f62"),o=t("f90c"),d={name:"PageSignUp",data:function(){return{email:"",username:"",password:"",confirmedPassword:""}},computed:n()({validEmail:{cache:!1,get:function(){return o.isEmail(this.email)&&this.email.length<=50}},matchingPasswords:{cache:!1,get:function(){return this.password===this.confirmedPassword}},readyToSubmit:{cache:!1,get:function(){return this.email&&this.username&&this.password&&this.confirmedPassword&&this.username.length<=20&&this.password.length<=100&&this.validEmail&&this.matchingPasswords}}},Object(l["b"])(["loggedIn"])),watch:{loggedIn:function(e){e&&this.$router.push({name:"main"})}},methods:{onSubmit:function(){this.readyToSubmit&&this.$socket.emit("register",{username:this.username,email:this.email,password:this.password})},onReset:function(){this.email=null,this.username=null,this.password=null,this.confirmedPassword=null,this.$refs.email.resetValidation(),this.$refs.username.resetValidation(),this.$refs.password.resetValidation(),this.$refs.confirmedPassword.resetValidation()}}},u=d,c=t("2877"),m=Object(c["a"])(u,a,i,!1,null,null,null);s["default"]=m.exports}}]);