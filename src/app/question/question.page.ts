import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  current_step = 0;
  sel_list = [];
  current_progress = 33.2;
  total_point = 0;
  showHelp = false;

  question_point = [1,2,3,4];
  queries = [
    {
      title: "How long have you been training",
      question: ["About to start", "0-6 Months", "6-12 Months", "More than 12 months"],
    },
    {
      title: "What type of training do you currently do?",
      question: ["Cardio", "Resistance", "Both in the same session", "Both in separate sessions"],
    },
    {
      title: "How many times a week do you currently train?",
      question: ["1", "2", "3-4", "5+"],
    },
    {
      title: "Can you squat?",
      question: ["No (what’s a squat?)", "Yes but not with weights", "Yes holding dumbbells", "Yes barbell back squat with for 10 reps or more"],
    },
    {
      title: "How many press ups can you do?",
      question: ["Less than 5", "Up to 10 with my knees on the ground", "Up to 10 full press ups", "More than 10"],
    },
    {
      title: "Can you run 5k?",
      question: ["No", "Yes but I would have to walk part of it", "Yes at a steady pace", "Yes in less than 30mins"],
    },
    {
      title: "How many times a week do you play or train?",
      question: ["0-1", "2-3", "4+"],
    },
    {
      title: "What best describes a typical working day?",
      question: ["Mainly sitting at a desk eg office worker", "Some lite activity walking and presenting eg teacher", "Manual labour eg gardener, labour"],
    },
    {
      title: "How would you describe you activity level?",
      question: ["Low activity level spend day mainly sitting", "Moderately active eg short walks to commute", "Very active daily eg walking dog, cycle to work"],
    },
  ];

  helps = ["There is no such thing as an \"ideal\" time to start training, even today is the best day to set your wellness goals and start achieving them!",
          "Five major types of fitness training include flexibility exercise, dynamic strength-training, static strength-training, aerobic exercise and circuit training. A solid workout plan will incorporate all five of these major fitness training types to improve your health.",
          "When putting together your workout routine, the first major component you need to figure out is your exercise frequency.",
          "Squats are mostly known as a leg exercise, but they promote body-wide muscle building. Squats also help you to burn more fat, as one of the most time-efficient ways to burn more calories continually is by developing more muscle.",
          "There's no right number of push-ups for a person to do each day. The number you can do with good form depends on multiple factors, including your age, gender and fitness level. However, to significantly build strength in the muscles that a push-up targets, you will have to complete more push-ups than the average person each day.",
          "The answer is that it really depends on your current fitness level. Some people are fit enough to easily run that distance without any training, while other people might be really suffering and find it difficult to complete the the 5km distance.",
          "Everybody has wondered this at some point in their training career, from the complete beginner to the most advanced professional. Keeping active is crucial for staying healthy!",
          "We are sending lots of time sitting down at our desks buried in emails and unfortunately sitting is literally killing us. Under the dest bicycle, under the dest stepper or stability ball can save us during working hours!",
          "Activity levels are often determined by how hard your heart works when you exercise. They also describe the types of activities and exercises you typically perform in a week and your overall fitness level."];
  
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  goNext(param){
    if(this.current_step == this.queries.length-1){
      if(this.sel_list[this.current_step] == undefined || this.sel_list[this.current_step] == -1){
        this.sel_list[this.current_step] = param;
        this.total_point += this.question_point[param];  
      }
      else{
        this.total_point -= this.question_point[this.sel_list[this.current_step]];
        this.sel_list[this.current_step] = param;
        this.total_point += this.question_point[param];
      }
    }
    else{
      this.sel_list[this.current_step] = param;
      this.total_point += this.question_point[param];
      this.current_step += 1;
      this.current_progress += 8.3;
      if(this.current_progress > 99)
        this.current_progress = 100;
      document.getElementById("p-bar").style.width = this.current_progress + '%';
    }
  }

  goBack(){
    
    if(this.current_step == this.queries.length-1 && this.sel_list[this.current_step] != undefined && this.sel_list[this.current_step] != -1){
      this.total_point -= this.question_point[this.sel_list[this.current_step]];
      this.total_point -= this.question_point[this.sel_list[this.current_step-1]];
      this.sel_list[this.current_step] = -1;
      this.current_step--;
      this.current_progress = this.current_progress - 8.7;
    }
    else if(this.current_step == this.queries.length-1 && (this.sel_list[this.current_step] == undefined || this.sel_list[this.current_step] == -1)){
      this.sel_list[this.current_step] = -1;
      this.current_step--;
      this.current_progress = this.current_progress - 8.7;
    }  
    else if(this.current_step > 0){
      this.total_point -= this.question_point[this.sel_list[this.current_step-1]];
      this.sel_list[this.current_step] = -1;
      this.current_step--;
      this.current_progress = this.current_progress - 8.3;
      document.getElementById("p-bar").style.width = this.current_progress + '%';
    }
    else{
      this.navCtrl.pop();
    }
  }

  goNextPage(){
    if(this.sel_list[this.current_step] == undefined || this.sel_list[this.current_step] == -1)
      alert("Please select one");
    else{
      if(this.total_point >= 14)
        this.storage.set("level","intermediate");
      else
        this.storage.set("level", "beginner");
      this.router.navigate(['/program']);
    }
  }

}
/*

Welcome To Fitmate

Weight loss, gain muscle, eat healthy and feel like the best version of yourself! 
Fitmate is your personal trainer and expert in nutrition which makes your wellness goals more achievable then ever. Your workout routine and meal plans are personalised based on your fitness level and diet goals. Accept the challenge and start training today!
*/