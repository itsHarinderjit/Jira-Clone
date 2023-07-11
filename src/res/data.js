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
import jiraRice from './jira-rice.jpg'

export const Users = {
    U001: {
        id: 'U001',
        name: "Professor McGonagall",
        projects: [
            "P001",
        ],
        userImg: ProfMcGonagall
    },
    U002: {
        id: 'U002',
        name: "Professor Flitwick",
        projects: [],
        userImg: ProfFlitwick
    },
    U003: {
        id: 'U003',
        name: "Professor Snape",
        projects: [
            "P001",
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
        projects: [],
        userImg: Moody
    },
    U008: {
        id: 'U008',
        name: "Harry Potter",
        projects: [],
        userImg: HarryPotter
    },
    U009: {
        id: 'U009',
        name: "Ron Weasley",
        projects: [],
        userImg: RonWeasley
    },
    U010: {
        id: 'U010',
        name: "Hermione Granger",
        projects: [],
        userImg: HermioneGranger
    }
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
            // {
            //     id: "U001",
            //     name: "Professor McGonagall"
            // },
            // {
            //     id: "U004",
            //     name: "Professor Dumbledore"
            // },
            // {
            //     id: "U005",
            //     name: "Filch"
            // },
            // {
            //     id: "U003",
            //     name: "Professor Snape"
            // },
            // {
            //     id: "U006",
            //     name: "Hagrid"
            // }
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
                createdOn: new Date("2/10/2023"),
                updatedOn: new Date("2/10/2023"),
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
                createdOn: new Date("4/1/2023"),
                updatedOn: new Date("4/1/2023"),
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
                createdOn: new Date("5/11/2023"),
                updatedOn: new Date("5/11/2023"),
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
                createdOn: new Date("6/12/2023"),
                updatedOn: new Date("6/12/2023"),
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
                createdOn: new Date("7/2/2023"),
                updatedOn: new Date("7/2/2023"),
                comments: []
            },
        },
        type: 'management',
        projectImg: Hogwards
    },
    P002: {
        id: 'P002',
        name: 'Proj',
        users: {},
        tasks: {},
        type: 'marketing',
        projectImg: jiraRice
    }
}