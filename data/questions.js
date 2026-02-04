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
                text: "What is your full name?",
                part: "1.1"
            },
            {
                id: 2,
                text: "Can you tell me about your hometown?",
                part: "1.1"
            },
            {
                id: 3,
                text: "Do you like living in your hometown?",
                part: "1.1"
            },
            {
                id: 4,
                text: "How long have you lived there?",
                part: "1.1"
            },
            {
                id: 5,
                text: "Is your hometown a good place for young people?",
                part: "1.1"
            },
            {
                id: 6,
                text: "Do you work or study?",
                part: "1.1"
            },
            {
                id: 7,
                text: "Why did you choose this job or field of study?",
                part: "1.1"
            },
            {
                id: 8,
                text: "Do you enjoy what you do?",
                part: "1.1"
            },
            {
                id: 9,
                text: "What do you usually do in the morning?",
                part: "1.1"
            },
            {
                id: 10,
                text: "How do you usually spend your evenings?",
                part: "1.1"
            },
            {
                id: 11,
                text: "Do you like spending time alone or with others?",
                part: "1.1"
            },
            {
                id: 12,
                text: "What do you usually do in your free time?",
                part: "1.1"
            },
            {
                id: 13,
                text: "Do you have any hobbies?",
                part: "1.1"
            },
            {
                id: 14,
                text: "How often do you do your hobbies?",
                part: "1.1"
            },
            {
                id: 15,
                text: "Did you have the same hobbies as a child?",
                part: "1.1"
            },
            {
                id: 16,
                text: "What hobby would you like to try in the future?",
                part: "1.1"
            },
            {
                id: 17,
                text: "Do you think hobbies are important?",
                part: "1.1"
            },
            {
                id: 18,
                text: "Do you prefer indoor or outdoor activities?",
                part: "1.1"
            },
            {
                id: 19,
                text: "How much free time do you usually have?",
                part: "1.1"
            },
            {
                id: 20,
                text: "Do you think people today have enough free time?",
                part: "1.1"
            },
            {
                id: 21,
                text: "Do you like music?",
                part: "1.1"
            },
            {
                id: 22,
                text: "What kind of music do you like most?",
                part: "1.1"
            },
            {
                id: 23,
                text: "How often do you listen to music?",
                part: "1.1"
            },
            {
                id: 24,
                text: "Do you listen to music while studying or working?",
                part: "1.1"
            },
            {
                id: 25,
                text: "Who is your favourite singer or band?",
                part: "1.1"
            },
            {
                id: 26,
                text: "Do you like watching movies?",
                part: "1.1"
            },
            {
                id: 27,
                text: "What is your favourite type of movie?",
                part: "1.1"
            },
            {
                id: 28,
                text: "How often do you watch movies?",
                part: "1.1"
            },
            {
                id: 29,
                text: "Do you prefer watching movies at home or in the cinema?",
                part: "1.1"
            },
            {
                id: 30,
                text: "What was the last movie you watched?",
                part: "1.1"
            },
            {
                id: 31,
                text: "Do you like cooking?",
                part: "1.1"
            },
            {
                id: 32,
                text: "How often do you cook at home?",
                part: "1.1"
            },
            {
                id: 33,
                text: "What is your favourite food?",
                part: "1.1"
            },
            {
                id: 34,
                text: "Do you prefer home-made food or fast food?",
                part: "1.1"
            },
            {
                id: 35,
                text: "Is there any food you dislike?",
                part: "1.1"
            },
            {
                id: 36,
                text: "How often do you eat out?",
                part: "1.1"
            },
            {
                id: 37,
                text: "What kind of food is popular in your country?",
                part: "1.1"
            },
            {
                id: 38,
                text: "Do you like trying new foods?",
                part: "1.1"
            },
            {
                id: 39,
                text: "Is healthy food important for you?",
                part: "1.1"
            },
            {
                id: 40,
                text: "Have your eating habits changed recently?",
                part: "1.1"
            },
            {
                id: 41,
                text: "Do you like sports?",
                part: "1.1"
            },
            {
                id: 42,
                text: "What is your favourite sport?",
                part: "1.1"
            },
            {
                id: 43,
                text: "How often do you exercise?",
                part: "1.1"
            },
            {
                id: 44,
                text: "Did you play sports when you were a child?",
                part: "1.1"
            },
            {
                id: 45,
                text: "Do you prefer team sports or individual sports?",
                part: "1.1"
            },
            {
                id: 46,
                text: "Is sport popular in your country?",
                part: "1.1"
            },
            {
                id: 47,
                text: "How do you keep yourself healthy?",
                part: "1.1"
            },
            {
                id: 48,
                text: "Do you think young people are healthy today?",
                part: "1.1"
            },
            {
                id: 49,
                text: "Do you walk a lot every day?",
                part: "1.1"
            },
            {
                id: 50,
                text: "What do you do when you feel stressed?",
                part: "1.1"
            },
            {
                id: 51,
                text: "Do you use the internet every day?",
                part: "1.1"
            },
            {
                id: 52,
                text: "How often do you use your phone?",
                part: "1.1"
            },
            {
                id: 53,
                text: "What do you usually use the internet for?",
                part: "1.1"
            },
            {
                id: 54,
                text: "Do you like using social media?",
                part: "1.1"
            },
            {
                id: 55,
                text: "Which social media app do you use most?",
                part: "1.1"
            },
            {
                id: 56,
                text: "Do you think technology makes life easier?",
                part: "1.1"
            },
            {
                id: 57,
                text: "Do you prefer texting or calling?",
                part: "1.1"
            },
            {
                id: 58,
                text: "How many hours a day do you spend online?",
                part: "1.1"
            },
            {
                id: 59,
                text: "Do you think people use phones too much?",
                part: "1.1"
            },
            {
                id: 60,
                text: "What would you do without the internet?",
                part: "1.1"
            },
            {
                id: 61,
                text: "Do you like travelling?",
                part: "1.1"
            },
            {
                id: 62,
                text: "How often do you travel?",
                part: "1.1"
            },
            {
                id: 63,
                text: "What is your favourite place you have visited?",
                part: "1.1"
            },
            {
                id: 64,
                text: "Do you prefer travelling alone or with others?",
                part: "1.1"
            },
            {
                id: 65,
                text: "What kind of places do you like visiting?",
                part: "1.1"
            },
            {
                id: 66,
                text: "Do you like long trips or short trips?",
                part: "1.1"
            },
            {
                id: 67,
                text: "Have you ever travelled abroad?",
                part: "1.1"
            },
            {
                id: 68,
                text: "Where would you like to travel in the future?",
                part: "1.1"
            },
            {
                id: 69,
                text: "Do you usually take photos when you travel?",
                part: "1.1"
            },
            {
                id: 70,
                text: "What do you like most about travelling?",
                part: "1.1"
            },
            {
                id: 71,
                text: "Do you live in a house or an apartment?",
                part: "1.1"
            },
            {
                id: 72,
                text: "Do you like your home?",
                part: "1.1"
            },
            {
                id: 73,
                text: "What is your favourite room in your home?",
                part: "1.1"
            },
            {
                id: 74,
                text: "Do you like decorating your room?",
                part: "1.1"
            },
            {
                id: 75,
                text: "How often do you clean your room?",
                part: "1.1"
            },
            {
                id: 76,
                text: "Do you prefer a quiet or noisy place?",
                part: "1.1"
            },
            {
                id: 77,
                text: "Do you like reading books?",
                part: "1.1"
            },
            {
                id: 78,
                text: "What is your favourite book or author?",
                part: "1.1"
            },
            {
                id: 79,
                text: "How often do you read?",
                part: "1.1"
            },
            {
                id: 80,
                text: "Do you prefer reading books or watching videos?",
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
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Gemini_Generated_Image_70gaae70gaae70ga.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 2,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/unnamed (1).jpg",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 3,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/unnamed.jpg",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 4,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134030.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 5,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134126.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 6,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134134.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 7,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134233.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 8,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134247.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 9,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134259.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 10,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134310.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 11,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134319.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 12,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134328.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            },
            {
                id: 13,
                text: "Describe what you see in this picture.",
                image: "part1.2 picture/Снимок экрана 2026-02-04 134431.png",
                readingTime: 5,
                answerTime: 40,
                part: "1.2",
                type: "describe"
            }
        ],
        images: [
            {
                id: "gemini_image",
                src: "part1.2 picture/Gemini_Generated_Image_70gaae70gaae70ga.png",
                alt: "Generated image for description"
            },
            {
                id: "unnamed_1",
                src: "part1.2 picture/unnamed (1).jpg",
                alt: "Picture for description"
            },
            {
                id: "unnamed_2",
                src: "part1.2 picture/unnamed.jpg",
                alt: "Picture for description"
            },
            {
                id: "screenshot_1",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134030.png",
                alt: "Screenshot for description"
            },
            {
                id: "screenshot_2",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134126.png",
                alt: "Screenshot for description"
            },
            {
                id: "screenshot_3",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134134.png",
                alt: "Screenshot for description"
            },
            {
                id: "screenshot_4",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134233.png",
                alt: "Screenshot for description"
            },
            {
                id: "screenshot_5",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134247.png",
                alt: "Screenshot for description"
            },
            {
                id: "screenshot_6",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134259.png",
                alt: "Screenshot for description"
            },
            {
                id: "screenshot_7",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134310.png",
                alt: "Screenshot for description"
            },
            {
                id: "screenshot_8",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134319.png",
                alt: "Screenshot for description"
            },
            {
                id: "screenshot_9",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134328.png",
                alt: "Screenshot for description"
            },
            {
                id: "screenshot_10",
                src: "part1.2 picture/Снимок экрана 2026-02-04 134431.png",
                alt: "Screenshot for description"
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