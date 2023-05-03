/* initialize jsPsych */
var jsPsych = initJsPsych({
  show_progress_bar: true,
  on_finish: function () {
    //jsPsych.data.displayData();
    window.location = "https://yinlintan.github.io/singlish/procedures/thanks.html";
    proliferate.submit({ "trials": jsPsych.data.get().values() });
  },
  default_iti: 250
});

/* create timeline */
var timeline = [];

const sounds = [ // These are just the practice trial sounds! REAL trial sounds are in the audio folder
  '../practice/trial1_clip1.wav',
  '../practice/trial1_clip2.wav',
  '../practice/trial2_clip1.wav',
  '../practice/trial2_clip2.wav',
  '../practice/trial3_clip1.wav',
  '../practice/trial3_clip2.wav'
];

// Preloading files are needed to present the stimuli accurately.
const preload_practice = {
  type: jsPsychPreload,
  audio: sounds,
  max_load_time: 120000 // 2 minutes
}

var preload_trial = {
  type: jsPsychPreload,
  audio: preload_exp,
  max_load_time: 120000 // 2 minutes
}

timeline.push(preload_practice);
timeline.push(preload_trial);

/*
var stopCollection = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p>This study is currently not accepting new participants. Please check back again in the future.</p>',
    choices: "NO_KEYS",
};
timeline.push(stopCollection);
*/

// browser check
/*
var checkBrowser = {
  type: jsPsychBrowserCheck,
  inclusion_function: (data) => {
    return data.browser == 'chrome' && data.mobile === false
  },
  exclusion_message: (data) => {
    if(data.mobile){
      return '<p>You must use a desktop/laptop computer to participate in this experiment.</p>';
    } else if(data.browser !== 'chrome'){
      return '<p>You must use Chrome as your browser to complete this experiment.</p>'
    }
  }
};
timeline.push(checkBrowser);
*/

var instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
        <div class="text" id="instruction">
            <img src="../images/stanford_logo.png" alt="stanford logo" width="180" height="80">
            <p>In this experiment, you will be listening to pairs of audio clips that are spoken by people from Singapore.</p>
            <p>Each pair of audio clips will be played once in consecutive order. Your task is to decide which one of the clips sounds more Singlish.</p>
            <p>Singlish is a type of English that is spoken in Singapore. Some of the audio clips that you will hear are Singlish and others are not, but all of them are spoken by Singaporean speakers.</p>
            <p>Please ensure that you use earphones or headphones for the duration of this experiment.</p>
            <p>This experiment should be completed on a <b><u>desktop or laptop</u></b> using the <b><u>Google Chrome browser</u></b>.</p>
            <p>The experiment will take approximately 40 minutes. You will be compensated XX USD for your time.</p>
        </div>
      `,
  choices: ["Continue"],
  button_html: `<button class="continue-btn">%choice%</button>`,
};
timeline.push(instructions);

/* define welcome message trial */
var legalinfo = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
        <div class="text" id="irb">
            
                <h3>Nonmedical Human Participants Consent Form and Waiver of Documentation</h3>
                <p>
                    <strong>STUDY TITLE:</strong> Language Production and Comprehension Studies
                </p>
                <p><strong>PROTOCOL DIRECTOR:</strong> Meghan Sumner</p>
                <p>		
                    <strong>DESCRIPTION:</strong> We invite you to participate in a research study on language production and comprehension. In this experiment, you will complete a linguistic task online such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game.
                    </p>
                <p>		
                    <strong>RISKS AND BENEFITS:</strong> There are no known risks, costs, or discomforts in this study and this judgment is based on a large body of experience with the same or similar procedures with people of similar ages, sex, origins, etc. We cannot and do not guarantee or promise that you will receive any benefits from this study. You will help us to understand how people recognize and perceive auditory stimuli.
                </p>	
                <p>	
                    <strong>TIME INVOLVEMENT:</strong> Your participation in this experiment will take less than one hour.
                </p>
                <p>	
                    <strong>PAYMENTS:</strong> You will be paid for your participation at the posted rate, consisted with online payment standards.
                    </p>
                <p>		
                    <strong>SUBJECT'S RIGHTS:</strong> If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to answer particular questions. Your individual privacy will be maintained in all published and written data resulting from the study.
                </p>
                <p>			
                    <strong>CONTACT INFORMATION:</strong><BR>
                    Questions, Concerns, or Complaints: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, please contact Prof. Meghan Sumner at (650) 723-4284.
                </p>	
                <p>
                    Independent Contact: If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, Stanford, CA 94305-5401 or email irbnonmed@stanford.edu.
                </p>	
                <p>	
                    <strong>WAIVER OF DOCUMENTATION:</strong><BR>
                    If you agree to participate in this research, please continue to begin the study. 
                </p>	
                <p style="font-size: 80%">
                Approval Date: June, 30, 2021<BR>
                Expiration Date: Does Not Expire
                </p>
                
        </div>
      `,
  choices: ["Continue"],
  button_html: `<button class="continue-btn">%choice%</button>`,
};
timeline.push(legalinfo);

/* sound check 
Put one of the deleted processed audio clips and have them type in the last word in the clip.
*/
const soundcheck = {
  type: jsPsychCloze,
  text: `<center><BR><BR><audio controls src="../soundcheck.wav"></audio></center><BR><BR>Listen carefully to the audio clip above. Type the <b>last word</b> that was said into the blank below and press "Continue".<BR><BR>% friends %`,
  check_answers: true,
  button_text: 'Continue',
  mistake_fn: function () { alert("Wrong answer. Please make sure your audio is working properly and try again.") }
};
timeline.push(soundcheck);

/* practice trial instructions*/
var practiceinstructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <center>
        <p>You will now begin the practice trials.</p>
        <p>In each trial, two audio clips will play one after another. You will hear a variety of sentences and phrases spoken by different talkers from Singapore.</p>
        <p>Each audio clip will only be played once and you will not be able to replay them.</p>
        <p><strong>Your task is to decide which clip sounds more Singlish.</strong></p>
        <p><strong>Singlish is a type of English that is spoken in Singapore. Some of the audio clips that you will hear are Singlish and others are not, but all of them are spoken by Singaporean speakers.</strong></p>
        <p>You might hear some clips that sound similar to each other, but please do your best to respond as quickly as possible.</p>
        <p>Please place your left index finger on the "S" key and your right index finger on the "L" key.</p>
        <p><img src="../procedures/keyboard.png" width="500" style="margin-top:-10px"></p>
        <p>If the <strong>first clip</strong> sounds more Singlish, please <strong>press S</strong>.</p>
        <p>If the <strong>second clip</strong> sounds more Singlish, please <strong>press L</strong>.</p>
        <p><b>Respond as quickly as possible when both clips have finished playing.</b></p>
        <p>This is a timed task. If you do not respond in time, the next question will appear automatically.</p>
        <p><b>Please answer as quickly and accurately as possible.</b></p>
  </center>
        `,
  choices: ["Continue"],
  button_html: `<button class="continue-btn">%choice%</button>`,
};
timeline.push(practiceinstructions);

/* practice trials */
for (let i = 0; i < practice_trial_audio_objects.length; i++){
  timeline.push(practice_trial_audio_objects[i][0]);
  timeline.push(practice_trial_audio_objects[i][1]);
  timeline.push(practice_trial_response_objects[i]);
} 

/* REAL trial instructions */
var realinstructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <center>
        <p>You will now begin the experiment.</p>
        <p>In each trial, two audio clips will play one after another. You will hear a variety of sentences and phrases spoken by different talkers from Singapore.</p>
        <p>Each audio clip will only be played once and you will not be able to replay them.</p>
        <p><strong>Your task is to decide which clip sounds more Singlish.</strong></p>
        <p><strong>Singlish is a type of English that is spoken in Singapore. Some of the audio clips that you will hear are Singlish and others are not, but all of them are spoken by Singaporean speakers.</strong></p>
        <p>You might hear some clips that sound similar to each other, but please do your best to respond as quickly as possible.</p>
        <p>Please place your left index finger on the "S" key and your right index finger on the "L" key.</p>
        <p><img src="../procedures/keyboard.png" width="500" style="margin-top:-10px"></p>
        <p>If the <strong>first clip</strong> sounds more Singlish, please <strong>press S</strong>.</p>
        <p>If the <strong>second clip</strong> sounds more Singlish, please <strong>press L</strong>.</p>
        <p><b>Respond as quickly as possible when both clips have finished playing.</b></p>
        <p>This is a timed task. If you do not respond in time, the next question will appear automatically.</p>
        <p><b>Please answer as quickly and accurately as possible.</b></p>
  </center>
        `,
  choices: ["Continue"],
  button_html: `<button class="continue-btn">%choice%</button>`,
};
timeline.push(realinstructions);


/* REAL TRIALS */
for (i = 0; i < (NUM_TRIALS * NUM_BLOCKS); i++) { // for every trial
  timeline.push(all_trial_audio_objects[i][0]); // first audio obj
  timeline.push(all_trial_audio_objects[i][1]); // second audio obj
  timeline.push(all_trial_response_objects[i]); // response
}

/* survey 1: demographic questions */
var survey1 = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'html',
        prompt: `<p style="color: #000000">Please answer the following questions:</p>`,
      },
      {
        type: 'drop-down',
        prompt: "What state are you from?",
        name: 'state',
        options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'Colorado', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Mexico', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'South Carolina', 'South Dakota', 'Tennessee', 'Utah', 'Vermont', 'West Virginia', 'Wyoming', 'Prefer not to answer'],
        required: true,
      },
      {
        type: 'multi-choice',
        prompt: "What is your gender?",
        name: 'gender',
        options: ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to answer'],
        required: false,
      },
      {
        type: 'drop-down',
        prompt: "What year were you born?",
        name: 'age',
        options: ['2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', '1954', '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', '1945', '1944', '1943', '1942', '1941', '1940', '1939', '1938', '1937', '1936', '1935', '1934', '1933', 'Prefer not to answer'],
        required: true,
      },
      {
        type: 'multi-select',
        prompt: "What is your race? Please select all that apply.",
        name: 'race',
        options: ['American Indian or Alaskan Native', 'Asian', 'Black or African American', 'Hispanic or Latino', 'Native Hawaiian or Other Pacific Islander', 'White', 'Prefer not to answer'],
        required: true,
      },
      {
        type: 'text',
        prompt: "What is your estimated total monthly household income (in US dollars)?",
        name: 'income',
        textbox_columns: 8,
        input_type: "number",
        required: true,
      },
      {
        type: 'multi-choice',
        prompt: "What is your highest level of education?",
        name: 'education',
        options: ['No qualification', 'Elementary school', 'Middle school', 'High school', 'Undergraduate degree', 'Postgraduate degree', 'Prefer not to answer'],
        required: true,
      }
    ]
  ],
  button_label_finish: 'Continue',
};
timeline.push(survey1);

/* survey 2: language background questions */
var survey2a = {
  type: jsPsychSurveyHtmlForm,
  preamble: `<p>What languages do you speak?</p>
  <p>Please indicate up to 5 languages and list them <b>in order of descending frequency of use</b>, i.e., Language 1 is the most frequently spoken language, Language 2 the second-most frequently spoken language, and so on.</p>
  <p>For example, if English is Language 1, Spanish is Language 2, and Portuguese is Language 3, that means you speak English the most frequently, Spanish the second-most frequently, and Portuguese the least frequently.
  </p>`,
  html: `<p>
  <input name="lang1" type="text" placeholder="Language 1" required><BR><BR>
  <input name="lang2" type="text" placeholder="Language 2"><BR><BR>
  <input name="lang3" type="text" placeholder="Language 3"><BR><BR>
  <input name="lang4" type="text" placeholder="Language 4"><BR><BR>
  <input name="lang5" type="text" placeholder="Language 5">
  </p>`
};
timeline.push(survey2a);

var survey2b = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'multi-choice',
        prompt: "Have you ever interacted with people from Singapore?",
        name: 'singapore_interact',
        options: ['Yes', 'No'],
        required: true,
      },
      {
        type: 'text',
        prompt: "If you have interacted with people from Singapore before, please provide more details about these interactions. For example, if you have one Singaporean coworker and you eat lunch together everyday, please indicate this.",
        name: 'singapore_interact_description',
        textbox_rows: 3,
        placeholder: `Example: There were some Singaporeans in my dorm when I was attending college and I talked to them occasionally, but I was not close friends with any Singaporeans.`,
        required: false,
      },
      {
        type: 'multi-choice',
        prompt: "Have you ever visited Singapore?",
        name: 'singapore_visit',
        options: ['Yes', 'No'],
        required: true,
      },
      {
        type: 'drop-down',
        prompt: "If you have visited Singapore before, what is the year of your most recent visit?",
        name: 'singapore_visit_year',
        options: ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', '1954', '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', '1945', '1944', '1943', '1942', '1941', '1940', '1939', '1938', '1937', '1936', '1935', '1934', '1933', 'Prefer not to answer'],
        required: false,
      },
      {
        type: 'text',
        prompt: "If you have visited Singapore multiple times, please provide more details about these visits. For example, if you visit Singapore about once a year for business trips, please indicate this.",
        name: 'singapore_visit_description',
        textbox_rows: 3,
        placeholder: `Example: I have only visited Singapore two times in my life, and both trips were in the last ten years. The first time I went was for a friend's wedding; the second time was as part of my vacation in Southeast Asia.`,
        required: false,
      },
    ],
  ],
  button_label_finish: 'Continue',
};
timeline.push(survey2b);

/* survey 3: open-ended singlish questions */

var survey3a = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p>List three attributes to describe the speakers that sounded more Singlish:</p>',
  html: '<p><input name="word1" class="try" type="text" placeholder="Word 1" required><BR><BR><input name="word2" type="text" placeholder="Word 2" required><BR><BR><input name="word3" type="text" placeholder="Word 3" required></p>'
};
timeline.push(survey3a);

var survey3b = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'text',
        prompt: "In your opinion, when and/or where is it acceptable to use Singlish? When and/or where is it not acceptable to use Singlish?",
        name: 'singlish_acceptability',
        required: true,
      },
      {
        type: 'text',
        prompt: "What is Singlish? Give a definition.",
        name: 'singlish_definition',
        required: true,
      },
      {
        type: 'multi-choice',
        prompt: "How important do you think Singlish is?",
        name: 'singlish_important',
        options: ['Very important', 'Important', 'Neutral', 'Not important', 'Not important at all'],
        required: true,
      }
    ]
  ],
  button_label_finish: 'Continue',
};
timeline.push(survey3b);

/* survey 4: language attitude questions */
var likert_scale = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree"
];

var survey4 = {
  type: jsPsychSurveyLikert,
  preamble: `Please rate how much you agree or disagree with the following statements.`,
  questions: [
    { prompt: "Singlish is just bad English.", name: 'likert_badenglish', labels: likert_scale, required: true },
    { prompt: "Singlish is the only thing that really makes us Singaporean.", name: 'likert_singaporean', labels: likert_scale, required: true },
    { prompt: "Singlish unites the different races of Singapore.", name: 'likert_race', labels: likert_scale, required: true },
    { prompt: "It would be better for Singapore if Singlish did not exist.", name: 'likert_exist', labels: likert_scale, required: true },
  ],
  randomize_question_order: true,
};
timeline.push(survey4);

/* emotion scale */
var emotion = {
  type: jsPsychSurveyLikert,
  scale_width: 700,
  questions: [
    {
      prompt: `
      <p style="font-weight: 500">How do you feel right now? Please indicate how you are feeling using the following scale.</p>
      <center><img src="../procedures/emotionscale.png"></center>
      `, 
      labels: [
        "1", 
        "2", 
        "3", 
        "4", 
        "5"
      ]
    }
  ]
};
timeline.push(emotion);

/* future study? */
var futurestudies = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'multi-choice',
        prompt: "Do you consent to being contacted for future studies?",
        name: 'futurestudies',
        options: ['Yes', 'No'],
        required: true,
      }
    ]
  ],
  button_label_finish: 'Continue',
};
timeline.push(futurestudies);

/* payment information
var payment = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: `
            <div class="text" id="trial">
            <p>Please provide your email address in the field below for participant reimbursement purposes.</p>
            </div>
            `,
      name: 'payment'
    }
  ]
};
timeline.push(payment);
*/

/* thank you */
const thankyou = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
        <div class="text" id="trial">
            <p>Thank you for completing the experiment!</p>
            <p>We will contact you soon to arrange for participant reimbursement.</p>
            <p>Please click the "Submit" button to submit your responses and complete the study.</p>
        </div>
      `,
  choices: ["Submit"],
  button_html: `<button class="submit-btn">%choice%</button>`
};
timeline.push(thankyou);

/* start the experiment */
jsPsych.run(timeline);
