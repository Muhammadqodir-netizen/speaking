// IELTS Speaking Test Questions Database
// This file contains all questions for the speaking test
// Easy to expand - just add new questions to the appropriate arrays

const QUESTIONS_DATA = {
    // Part 1.1 - Introduction and Interview (3 questions)
    part1_1: {
        title: "Part 1.1 - Introduction and Interview",
        totalQuestions: 3,
        readingTime: 4, // seconds
        answerTime: 30, // seconds (updated from 20 to 30)
        questions: [
            {
                id: 1,
                text: "Let's talk about your hometown. Where are you from and what do you like most about your hometown?",
                part: "1.1"
            },
            {
                id: 2,
                text: "Do you work or are you a student? Can you describe what you do or what you study?",
                part: "1.1"
            },
            {
                id: 3,
                text: "What do you like to do in your free time? How do you usually spend your weekends?",
                part: "1.1"
            },
            {
                id: 4,
                text: "Tell me about your family. How many people are in your family and what do they do?",
                part: "1.1"
            },
            {
                id: 5,
                text: "What kind of music do you enjoy listening to? Has your taste in music changed over the years?",
                part: "1.1"
            },
            {
                id: 6,
                text: "Do you prefer to live in a house or an apartment? Why do you prefer that type of accommodation?",
                part: "1.1"
            }
        ]
    },

    // Part 1.2 - Picture Description (3 questions with images)
    part1_2: {
        title: "Part 1.2 - Picture Description",
        totalQuestions: 3,
        questions: [
            {
                id: 1,
                text: "Describe what you can see in this picture. What are the people doing?",
                image: "images/family_park.jpg",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 2,
                text: "What do you think the relationship is between the people in this picture?",
                image: "images/family_park.jpg",
                readingTime: 5,
                answerTime: 30,
                part: "1.2",
                type: "analyze"
            },
            {
                id: 3,
                text: "How do you think the people in this picture are feeling? What makes you think that?",
                image: "images/family_park.jpg",
                readingTime: 5,
                answerTime: 30,
                part: "1.2",
                type: "interpret"
            }
        ],
        images: [
            {
                id: "family_park",
                src: "images/family_park.jpg",
                alt: "Family enjoying time in a park"
            },
            {
                id: "office_meeting",
                src: "images/office_meeting.jpg", 
                alt: "Business meeting in an office"
            },
            {
                id: "restaurant_scene",
                src: "images/restaurant_scene.jpg",
                alt: "People dining in a restaurant"
            }
        ]
    },

    // Part 2 - Long Turn (Cue Card)
    part2: {
        title: "Part 2 - Long Turn",
        totalQuestions: 1,
        preparationTime: 60, // seconds
        answerTime: 120, // seconds (2 minutes)
        questions: [
            {
                id: 1,
                text: "Describe a memorable journey you have taken.\n\nYou should say:\n• Where you went\n• Who you went with\n• What you did during the journey\n• And explain why this journey was memorable for you",
                part: "2",
                type: "cue_card"
            },
            {
                id: 2,
                text: "Describe a person who has influenced you in your life.\n\nYou should say:\n• Who this person is\n• How you know them\n• What they have done to influence you\n• And explain why their influence has been important to you",
                part: "2",
                type: "cue_card"
            },
            {
                id: 3,
                text: "Describe a skill you would like to learn.\n\nYou should say:\n• What the skill is\n• Why you want to learn it\n• How you would learn it\n• And explain how this skill would be useful to you",
                part: "2",
                type: "cue_card"
            },
            {
                id: 4,
                text: "Describe a place you visited that was particularly interesting.\n\nYou should say:\n• Where it was\n• When you visited it\n• What you saw and did there\n• And explain what made it so interesting",
                part: "2",
                type: "cue_card"
            }
        ]
    },

    // Part 3 - Discussion
    part3: {
        title: "Part 3 - Discussion",
        totalQuestions: 1,
        preparationTime: 60, // seconds
        answerTime: 120, // seconds (2 minutes)
        questions: [
            {
                id: 1,
                text: "Some people think that technology has made our lives easier, while others believe it has made life more complicated. What is your opinion? Give reasons and examples to support your view.",
                part: "3",
                type: "discussion"
            },
            {
                id: 2,
                text: "Many people believe that learning foreign languages is becoming less important because of technology and translation tools. Do you agree or disagree? Explain your position with examples.",
                part: "3",
                type: "discussion"
            },
            {
                id: 3,
                text: "Some people prefer to live in big cities, while others choose small towns or rural areas. What are the advantages and disadvantages of each? Which do you think is better and why?",
                part: "3",
                type: "discussion"
            },
            {
                id: 4,
                text: "Do you think social media has a positive or negative impact on society? Discuss both sides and give your opinion with specific examples.",
                part: "3",
                type: "discussion"
            },
            {
                id: 5,
                text: "Some people believe that money is the most important factor when choosing a job, while others think job satisfaction is more important. What do you think? Support your answer with reasons and examples.",
                part: "3",
                type: "discussion"
            }
        ]
    }
};

// Helper functions to get questions
function getRandomQuestions(part, count) {
    const partData = QUESTIONS_DATA[part];
    if (!partData || !partData.questions) return [];
    
    const questions = [...partData.questions];
    const selected = [];
    
    for (let i = 0; i < Math.min(count, questions.length); i++) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        selected.push(questions.splice(randomIndex, 1)[0]);
    }
    
    return selected;
}

function getPartData(part) {
    return QUESTIONS_DATA[part] || null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTIONS_DATA, getRandomQuestions, getPartData };
}