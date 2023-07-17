import Flitch from './userImg/Flitch.jpg'
import Hagrid from './userImg/Hagrid.jpg'
import HarryPotter from './userImg/HarryPotter.jpg'
import HermioneGranger from './userImg/HermioneGranger.jpg'
import Moody from './userImg/Moody.jpg'
import ProfDumbledore from './userImg/ProfDumbledore.jpg'
import ProfFlitwick from './userImg/ProfFlitwick.jpg'
import ProfMcGonagall from './userImg/ProfMcGonagall.jpg'
import ProfSnape from './userImg/ProfSnape.jpg'
import RonWeasley from './userImg/RonWeasley.jpg'
import Hogwards from './projImg/Hogwards.jpg'
import gobletOfFire from './projImg/gobletOfFire.jpg'
import HPF from './projImg/HP&F.jpg'

export const Users = {
    U001: {
        id: 'U001',
        name: "Professor McGonagall",
        projects: [
            "P001",
            "P002"
        ],
        userImg: ProfMcGonagall
    },
    U002: {
        id: 'U002',
        name: "Professor Flitwick",
        projects: [
            "P002"
        ],
        userImg: ProfFlitwick
    },
    U003: {
        id: 'U003',
        name: "Professor Snape",
        projects: [
            "P001",
            "P002"
        ],
        userImg: ProfSnape
    },
    U004: {
        id: 'U004',
        name: "Professor Dumbledore",
        projects: [
            "P001",
            "P002"
        ],
        userImg: ProfDumbledore
    },
    U005: {
        id: 'U005',
        name: "Flitch",
        projects: [
            "P001",
        ],
        userImg: Flitch
    },
    U006: {
        id: 'U006',
        name: "Hagrid",
        projects: [
            "P001",
        ],
        userImg: Hagrid
    },
    U007: {
        id: 'U007',
        name: "Moody",
        projects: [
            "P002"
        ],
        userImg: Moody
    },
    U008: {
        id: 'U008',
        name: "Harry Potter",
        projects: [
            "P003"
        ],
        userImg: HarryPotter
    },
    U009: {
        id: 'U009',
        name: "Ron Weasley",
        projects: [
            "P003"
        ],
        userImg: RonWeasley
    },
    U010: {
        id: 'U010',
        name: "Hermione Granger",
        projects: [
            "P003"
        ],
        userImg: HermioneGranger
    },
    U011: {
        id: 'U011',
        name: 'John Smith',
        projects: [
            "P004"
        ],
        userImg: ''
    },
    U012: {
        id: 'U012',
        name: 'David Thompson',
        projects: [
            "P004"
        ],
        userImg: ''
    },
    U013: {
        id: 'U013',
        name: 'Emily Johnson',
        projects: [
            "P004"
        ],
        userImg: ''
    },
}

export const Projects = {
    P001: {
        id: 'P001',
        name: "Hogwarts School",
        description: "To improve operational efficiency, increase collaboration among staff and students, and provide a centralized platform for tracking, managing school-related activities and to enhance the management of various aspects of Hogwarts School of Witchcraft and Wizardry",
        users: [
            "U001",
            "U004",
            "U005",
            "U003",
            "U006"
        ],
        tasks: {
            HP001: {
                id: 'HP001',
                heading: "Investigate Troll in the Dungeon",
                description: "There have been reports of a troll spotted in the Hogwarts dungeon. We need to investigate and take necessary actions to ensure the safety of the students and staff.",
                type: "task",
                status: "in progress",
                reporter: "U001",
                assignees: [
                    "U003",
                    "U005",
                    "U004"
                ],
                priority: "highest",
                orgEstTime: 3,
                timeSpent: 1,
                timeRemaining: null,
                createdOn: new Date("2/10/2023").toString(),
                updatedOn: new Date("2/10/2023").toString(),
                comments: []
            },
            HP002: {
                id: 'HP002',
                heading: "Fix Broken Vanishing Cabinet in the Room of Requirement",
                description: "The Vanishing Cabinet in the Room of Requirement is malfunctioning and needs to be fixed. It's causing objects to appear and disappear randomly. We need to restore its functionality.",
                type: "task",
                status: "in progress",
                reporter: "U004",
                assignees: [
                    "U005"
                ],
                priority: "medium",
                orgEstTime: 10,
                timeSpent: 2,
                timeRemaining: null,
                createdOn: new Date("4/1/2023").toString(),
                updatedOn: new Date("4/1/2023").toString(),
                comments: []
            },
            HP003: {
                id: 'HP003',
                heading: "Update Quidditch Pitch Maintenance Schedule",
                description: "The Quidditch pitch requires regular maintenance, including repairs to the goal posts and resurfacing the field. We need to update the maintenance schedule and allocate resources accordingly.",
                type: "task",
                status: "selected",
                reporter: "U004",
                assignees: [
                    "U001"
                ],
                priority: "low",
                orgEstTime: 4,
                timeSpent: 1,
                timeRemaining: null,
                createdOn: new Date("5/11/2023").toString(),
                updatedOn: new Date("5/11/2023").toString(),
                comments: []
            },
            HP004: {
                id: 'HP004',
                heading: "Research and Procure Advanced Potions Ingredients",
                description: "Professor Snape requires access to advanced potions ingredients for his upcoming research project. We need to identify reliable suppliers and procure the necessary ingredients within the budget.",
                type: "task",
                status: "backlog",
                reporter: "U001",
                assignees: [
                    "U003"
                ],
                priority: "high",
                orgEstTime: 2,
                timeSpent: 0,
                timeRemaining: null,
                createdOn: new Date("6/12/2023").toString(),
                updatedOn: new Date("6/12/2023").toString(),
                comments: []
            },
            HP005: {
                id: 'HP005',
                heading: "Enhance Security Measures for the Forbidden Forest",
                description: "The security measures around the Forbidden Forest need improvement to prevent unauthorized access and ensure the safety of students. We need to evaluate and implement enhanced security protocols.",
                type: "task",
                status: "done",
                reporter: "U003",
                assignees: [
                    "U006"
                ],
                priority: "medium",
                orgEstTime: 5,
                timeSpent: 2,
                timeRemaining: null,
                createdOn: new Date("7/2/2023").toString(),
                updatedOn: new Date("7/2/2023").toString(),
                comments: []
            },
            HP006: {
                id: 'HP006',
                heading: "Hogwarts Acceptance Letters Delivery Issue",
                description: "There have been reports of Hogwarts acceptance letters not reaching the intended recipients. We need to investigate the issue, identify any disruptions in the delivery process, and ensure all eligible students receive their letters promptly.",
                type: "task",
                status: "selected",
                reporter: "U004",
                assignees: [
                    "U001"
                ],
                priority: "high",
                orgEstTime: 8,
                timeSpent: 3,
                timeRemaining: null,
                createdOn: new Date("5/2/2023").toString(),
                updatedOn: new Date("5/2/2023").toString(),
                comments: []
            },
            HP007: {
                id: 'HP007',
                heading: "Organize Orientation for First-Year Students",
                description: "The first-year students need an orientation program to familiarize them with the Hogwarts castle, classes, and rules. We need to plan and organize a comprehensive orientation schedule.",
                type: "task",
                status: "in progress",
                reporter: "U004",
                assignees: [
                    "U003",
                    "U001"
                ],
                priority: "low",
                orgEstTime: 2,
                timeSpent: 1,
                timeRemaining: null,
                createdOn: new Date("15/2/2023").toString(),
                updatedOn: new Date("15/2/2023").toString(),
                comments: []
            },
        },
        type: 'management',
        projectImg: Hogwards
    },
    P002: {
        id: 'P002',
        name: 'Triwizard Tournament',
        description: '',
        users: [
            "U004",
            "U007",
            "U001",
            "U003",
            "U002"
        ],
        tasks: {
            GoF001: {
                id: 'GoF001',
                heading: "Investigate the Triwizard Tournament Selection Process",
                description: "There are concerns about the fairness of the Triwizard Tournament selection process. We need to conduct a thorough investigation and address any potential biases or loopholes in the system.",
                type: "task",
                status: "selected",
                reporter: "U003",
                assignees: [
                    "U003",
                    "U001"
                ],
                priority: "high",
                orgEstTime: 10,
                timeSpent: 2,
                timeRemaining: null,
                createdOn: new Date("7/10/2023").toString(),
                updatedOn: new Date("7/10/2023").toString(),
                comments: []
            },
            GoF002: {
                id: 'GoF002',
                heading: "Secure the Hogwarts Grounds for the Tournament Tasks",
                description: " The upcoming Triwizard Tournament tasks pose potential security risks to the Hogwarts grounds. We need to enhance security measures, set up protective enchantments, and assign staff members for monitoring and emergency response.",
                type: "task",
                status: "done",
                reporter: "U003",
                assignees: [
                    "U007",
                    "U004"
                ],
                priority: "highest",
                orgEstTime: 10,
                timeSpent: 5,
                timeRemaining: null,
                createdOn: new Date("6/12/2023").toString(),
                updatedOn: new Date("6/12/2023").toString(),
                comments: []
            },
            GoF003: {
                id: 'GoF003',
                heading: "Procure and Prepare Tournament Equipment",
                description: " The Triwizard Tournament requires specific equipment for each task, such as dragons, underwater obstacles, and maze elements. We need to procure the necessary items and ensure they are properly prepared and maintained.",
                type: "task",
                status: "backlog",
                reporter: "U003",
                assignees: [
                    "U002",
                    "U007"
                ],
                priority: "medium",
                orgEstTime: 8,
                timeSpent: 2,
                timeRemaining: null,
                createdOn: new Date("6/27/2023").toString(),
                updatedOn: new Date("6/27/2023").toString(),
                comments: []
            },
            GoF004: {
                id: 'GoF004',
                heading: "Arrange Accommodations for the Visiting Schools",
                description: "Participants from Beauxbatons Academy and Durmstrang Institute require accommodations during their stay at Hogwarts for the Triwizard Tournament. We need to make suitable arrangements for their comfort and safety.",
                type: "task",
                status: "done",
                reporter: "U004",
                assignees: [
                    "U001"
                ],
                priority: "low",
                orgEstTime: 4,
                timeSpent: 3,
                timeRemaining: null,
                createdOn: new Date("6/15/2023").toString(),
                updatedOn: new Date("6/15/2023").toString(),
                comments: []
            },
            GoF005: {
                id: 'GoF005',
                heading: "Plan and Organize the Yule Ball",
                description: "The Yule Ball is a significant event during the Triwizard Tournament. We need to plan and coordinate the ball, including venue arrangements, decorations, music, and catering.",
                type: "task",
                status: "in progress",
                reporter: "U003",
                assignees: [
                    "U002"
                ],
                priority: "high",
                orgEstTime: 1,
                timeSpent: 1,
                timeRemaining: null,
                createdOn: new Date("6/19/2023").toString(),
                updatedOn: new Date("6/19/2023").toString(),
                comments: []
            },
            GoF006: {
                id: 'GoF006',
                heading: "Research and Acquire Magical Creatures for the Third Task",
                description: "The third task of the Triwizard Tournament involves encounters with dangerous magical creatures. We need to research suitable creatures, procure them, and ensure their proper handling and containment.",
                type: "task",
                status: "in progress",
                reporter: "U003",
                assignees: [
                    "U007"
                ],
                priority: "high",
                orgEstTime: 10,
                timeSpent: 3,
                timeRemaining: null,
                createdOn: new Date("6/20/2023").toString(),
                updatedOn: new Date("6/20/2023").toString(),
                comments: []
            }
        },
        type: 'management',
        projectImg: gobletOfFire
    },
    P003: {
        id: 'P003',
        name: 'Friends Adventure',
        description: '',
        users: [
            "U008",
            "U009",
            "U010"
        ],
        tasks: {
            HP001: {
                id: 'HP001',
                heading: "Investigate the Disappearance of Hermione's Wand",
                description: "Hermione Granger's wand has gone missing. We need to investigate the circumstances surrounding its disappearance, identify any potential suspects, and recover the wand.",
                type: "task",
                status: "selected",
                reporter: "U010",
                assignees: [
                    "U008",
                    "U009"
                ],
                priority: "high",
                orgEstTime: 10,
                timeSpent: 4,
                timeRemaining: null,
                createdOn: new Date("7/15/2023").toString(),
                updatedOn: new Date("7/15/2023").toString(),
                comments: []
            },
            HP002: {
                id: 'HP002',
                heading: "Organize Study Group for Defense Against the Dark Arts",
                description: "Harry, Ron, and Hermione need to form a study group to improve their Defense Against the Dark Arts skills. We need to schedule regular study sessions, select appropriate study materials, and coordinate the group's activities.",
                type: "task",
                status: "in progress",
                reporter: "U010",
                assignees: [
                    "U008",
                    "U009",
                    "U010"
                ],
                priority: "medium",
                orgEstTime: 48,
                timeSpent: 5,
                timeRemaining: null,
                createdOn: new Date("6/16/2023").toString(),
                updatedOn: new Date("6/16/2023").toString(),
                comments: []
            },
            HP003: {
                id: 'HP003',
                heading: "Plan Hagrid's Birthday Surprise Party",
                description: "It's Hagrid's birthday, and we want to throw him a surprise party. We need to organize the event, coordinate decorations, arrange for a cake, and keep the preparations confidential.",
                type: "task",
                status: "backlog",
                reporter: "U008",
                assignees: [
                    "U008",
                    "U009",
                ],
                priority: "low",
                orgEstTime: 5,
                timeSpent: 0,
                timeRemaining: null,
                createdOn: new Date("6/27/2023").toString(),
                updatedOn: new Date("6/27/2023").toString(),
                comments: []
            },
            HP004: {
                id: 'HP004',
                heading: "Research and Obtain New Quidditch Broomsticks",
                description: "The Gryffindor Quidditch team needs new broomsticks for the upcoming season. We need to research the latest models, evaluate their performance, and procure the best broomsticks within the budget.",
                type: "task",
                status: "selected",
                reporter: "U008",
                assignees: [
                    "U008"
                ],
                priority: "high",
                orgEstTime: 4,
                timeSpent: 1,
                timeRemaining: null,
                createdOn: new Date("6/15/2023").toString(),
                updatedOn: new Date("6/15/2023").toString(),
                comments: []
            },
            HP005: {
                id: 'HP005',
                heading: "Create a Care Plan for Norberta the Dragon",
                description: "Hagrid has acquired a baby dragon named Norberta. We need to develop a care plan that includes feeding, training, and ensuring Norberta's well-being while keeping her existence a secret.",
                type: "task",
                status: "backlog",
                reporter: "U010",
                assignees: [
                    "U009"
                ],
                priority: "medium",
                orgEstTime: 3,
                timeSpent: 1,
                timeRemaining: null,
                createdOn: new Date("6/19/2023").toString(),
                updatedOn: new Date("6/19/2023").toString(),
                comments: []
            }
        },
        type: 'management',
        projectImg: HPF
    },
    P004: {
        id: 'P004',
        name: 'Fitness Tracking Mobile App',
        description: '',
        users: [
            "U011",
            "U012",
            "U013"
        ],
        tasks: {
            FT001: {
                id: 'FT001',
                heading: "Design User Interface for Onboarding Screens",
                description: "Create visually appealing and intuitive onboarding screens for the mobile app. Collaborate with the UI/UX designer to design the screens, implement the UI elements, and ensure a smooth user experience.",
                type: "task",
                status: "done",
                reporter: "U012",
                assignees: [
                    "U011",
                ],
                priority: "high",
                orgEstTime: 10,
                timeSpent: 2,
                timeRemaining: null,
                createdOn: new Date("7/10/2023").toString(),
                updatedOn: new Date("7/10/2023").toString(),
                comments: []
            },
            FT002: {
                id: 'FT002',
                heading: "Integrate Push Notification Service",
                description: "Integrate a push notification service into the mobile app to deliver real-time updates and notifications to users. Research available push notification providers, implement the necessary SDKs, and test the notification delivery.",
                type: "task",
                status: "selected",
                reporter: "U011",
                assignees: [
                    "U012",
                    "U013"
                ],
                priority: "medium",
                orgEstTime: 8,
                timeSpent: 6,
                timeRemaining: null,
                createdOn: new Date("7/12/2023").toString(),
                updatedOn: new Date("7/12/2023").toString(),
                comments: []
            },
            FT003: {
                id: 'FT003',
                heading: "Conduct Automated UI Testing",
                description: "Set up automated UI testing for the mobile app to ensure its functionality and usability. Select a suitable testing framework, write test scripts, execute tests, and report any bugs or issues found during the testing process.",
                type: "task",
                status: "backlog",
                reporter: "U012",
                assignees: [
                    "U013"
                ],
                priority: "low",
                orgEstTime: 12,
                timeSpent: 4,
                timeRemaining: null,
                createdOn: new Date("7/27/2023").toString(),
                updatedOn: new Date("7/27/2023").toString(),
                comments: []
            },
            FT004: {
                id: 'FT004',
                heading: "Enhance Workout Logging and Analytics",
                description: "Improve the workout logging and analytics features of the app. Implement additional workout types, enhance data visualization, and provide comprehensive analytics to help users track their progress.",
                type: "task",
                status: "in progress",
                reporter: "U012",
                assignees: [
                    "U013"
                ],
                priority: "medium",
                orgEstTime: 9,
                timeSpent: 3,
                timeRemaining: null,
                createdOn: new Date("7/15/2023").toString(),
                updatedOn: new Date("7/15/2023").toString(),
                comments: []
            },
            FT005: {
                id: 'FT005',
                heading: "Implement Social Sharing Functionality",
                description: "Develop the ability for users to share their workout achievements and progress on social media platforms. Implement social media SDKs, authentication mechanisms, and user interface components for sharing functionalities.",
                type: "task",
                status: "in progress",
                reporter: "U013",
                assignees: [
                    "U011"
                ],
                priority: "medium",
                orgEstTime: 8,
                timeSpent: 1,
                timeRemaining: null,
                createdOn: new Date("7/19/2023").toString(),
                updatedOn: new Date("7/19/2023").toString(),
                comments: []
            },
            FT006: {
                id: 'FT006',
                heading: "Fix Crash on Launch Issue for Android Devices",
                description: "Investigate and resolve the issue where the app crashes on launch specifically for Android devices. Identify the root cause, debug the code, and implement the necessary fixes to ensure the app launches successfully on all Android devices.",
                type: "bug",
                status: "done",
                reporter: "U012",
                assignees: [
                    "U011"
                ],
                priority: "highest",
                orgEstTime: 4,
                timeSpent: 4,
                timeRemaining: null,
                createdOn: new Date("7/10/2023").toString(),
                updatedOn: new Date("7/10/2023").toString(),
                comments: []
            },
            FT007: {
                id: 'FT007',
                heading: "Fix Incorrect Calorie Calculation for Certain Activities",
                description: "Identify and fix the bug causing inaccurate calorie calculations for specific activities in the app. Review the algorithm, validate calculation formulas, and ensure precise and reliable calorie tracking for all supported activities.",
                type: "bug",
                status: "selected",
                reporter: "U011",
                assignees: [
                    "U013"
                ],
                priority: "high",
                orgEstTime: 5,
                timeSpent: 4,
                timeRemaining: null,
                createdOn: new Date("7/12/2023").toString(),
                updatedOn: new Date("7/12/2023").toString(),
                comments: []
            },
            FT008: {
                id: 'FT008',
                heading: "Fix Bluetooth Connectivity Issue with Heart Rate Monitor",
                description: "Investigate and resolve the issue causing intermittent connectivity problems with the heart rate monitor device via Bluetooth. Troubleshoot the connection, optimize Bluetooth communication, and ensure reliable and stable data transmission.",
                type: "bug",
                status: "backlog",
                reporter: "U013",
                assignees: [
                    "U011"
                ],
                priority: "low",
                orgEstTime: 6,
                timeSpent: 1,
                timeRemaining: null,
                createdOn: new Date("7/14/2023").toString(),
                updatedOn: new Date("7/14/2023").toString(),
                comments: []
            },
        },
        type: 'software',
        projectImg: ''
    },
}

// comment -> id,user,content,createdOn