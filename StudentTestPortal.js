import { question } from "readline-sync"

let names = ["Harun Kumar", "Pervez Sona", "Abdur Rahman", "Shanthi", "Bipin Ramdas",
    "Anbu Swarna", "Bal Suriya", "Pradip Prasanna", "Firdaus Uttar", "Kiran Jahid",
    "Nishat Sushila", "Kajal Ramchandra", "Feroz Vasudha", "Rohit Munir", "Manisha",
    "Dipika", "Madhukar", "Narayanan", "Sujatha", "Manas",
    "Kazuhiko Ema", "Kasumi Kenzō", "Hanzō Nanami", "Tsubaki Isamu", "Atsushi Yuuto",
    "Kichiro Hanzou", "Yōta Saburou", "Fumio Yuuji", "Yuuta Daichi", "Tsubame",
    "Misao", "Shiori", "Akie", "Rin", "Minoru"];

let gender = ["male", "female"];

let StudentList = Array(35);

let averages = Array(35);

let totalMarks = Array(35);

let classWise = Array(10);

let classAverages = [];

function testRunner() {
    for (let i = 0; i < 35; i++) {
        StudentList[i] = {
            RollNo: i + 1,
            Name: names[i],
            Class: Math.floor(Math.random() * 10) + 1,
            Gender: gender[Math.floor(Math.random() * gender.length)],
            TestScore: [{
                sub: "eng",
                marks: Math.floor(Math.random() * 100)
            },
            {
                sub: "mat",
                marks: Math.floor(Math.random() * 100)
            },
            {
                sub: "sci",
                marks: Math.floor(Math.random() * 100)
            }
            ]

        }
    }
    calculateAverage();
}

function testRunner2() {
    testRunner();
    for (let i = 0; i < 35; i++) {
        StudentList[i] = {
            ...StudentList[i],
            Total: totalMarks[i],
            Percentage: Math.floor(averages[i])
        }
    }
}

function calculateAverage() {
    for (let i = 0; i < 35; i++) {
        averages[i] = ((StudentList[i].TestScore[0].marks) +
            (StudentList[i].TestScore[1].marks) +
            (StudentList[i].TestScore[2].marks)) / 3;
    }
    total();
}

function total() {
    for (let i = 0; i < 35; i++) {
        totalMarks[i] = (StudentList[i].TestScore[0].marks) +
            (StudentList[i].TestScore[1].marks) +
            (StudentList[i].TestScore[2].marks);
    }
}

function classWiseResult() {

    for (let i = 0; i < 10; i++) {
        classWise[i] = [];
        for (let j = 0; j < 35; j++) {
            if (StudentList[j].Class === i + 1) {
                classWise[i].push(StudentList[j]);
                classAverages.push(averages[j]);
            }
        }
    }
}

function classWiseResultDisplay() {
    console.log(`
+---------+----------------------------+-------------+
|  Class  |            Name            |   Average   |
+---------+----------------------------+-------------+`);

    for (let i = 0, k = 0; i < 10; i++) {
        for (let j = 0; j < classWise[i].length; j++) {
            console.log(`| ${String(i + 1).padEnd(7, ' ')} | ${classWise[i][j].Name.padEnd(26, ' ')} | ${String(Math.floor(classAverages[k++])).padEnd(11, ' ')} |`)
        }
    }

    console.log("+---------+----------------------------+-------------+");

}

function display() {
    console.log(`
+--------------+----------------------------+---------+------------+-------------+---------+--------------+
|  RollNumber  |            Name            |  Class  |   Gender   |   Average   |  Total  |  Percentage  |
+--------------+----------------------------+---------+------------+-------------+---------+--------------+`);

    for (let i = 0; i < 35; i++) {
        const rollNo = String(StudentList[i].RollNo).padEnd(12, ' ');
        const name = StudentList[i].Name.padEnd(26, ' ');
        const classNum = String(StudentList[i].Class).padEnd(7, ' ');
        const gender = StudentList[i].Gender.padEnd(10, ' ');
        const average = String(Math.floor(averages[i])).padEnd(11, ' ');
        const total = String(StudentList[i].Total).padEnd(7, ' ');
        const perc = (String(StudentList[i].Percentage) + '%').padEnd(12, ' ')

        console.log(`| ${rollNo} | ${name} | ${classNum} | ${gender} | ${average} | ${total} | ${perc} |`);
    }

    console.log("+--------------+----------------------------+---------+------------+-------------+---------+--------------+");
}

function detailAnalysis() {

    console.log(`
+---------+-----------------------+----------------------+---------------+-------------------+---------------------+-------------------+---------------------+
|  Class  |  Average class marks  |  Average percentage  |  Class grade  |  Failed students  |  Failed students %  |  Passed students  |  Passed students %  |
+---------+-----------------------+----------------------+---------------+-------------------+---------------------+-------------------+---------------------+`);

    for (let i = 0, k = 0; i < 10; i++) {

        const Class = String(i + 1).padEnd(7, ' ');
        const avgClassMarks = String(Math.floor(classWise[i].reduce((total, student) => total + student.Total, 0) / classWise[i].length)).padEnd(21, ' ');
        const avgPercentage = Math.floor(classWise[i].reduce((total, student) => total + student.Total, 0) / classWise[i].length / 3);
        const grade = avgPercentage > 85 ? 'A' : avgPercentage > 65 ? 'B' : avgPercentage > 50 ? 'C' : avgPercentage > 35 ? 'D' : 'E';
        const failNo = classWise[i].filter((student) => student.Percentage < 35 ? true : false).length;
        const failPerc = Math.floor((failNo / classWise[i].length) * 100);
        const passNo = classWise[i].length - failNo;
        const passPerc = 100 - failPerc;

        console.log(`| ${Class} | ${avgClassMarks} | ${String(avgPercentage).padEnd(20, ' ')} | ${grade.padEnd(13, ' ')} | ${String(failNo).padEnd(17, ' ')} | ${(String(failPerc) + '%').padEnd(19, ' ')} | ${String(passNo).padEnd(17, ' ')} | ${(String(passPerc) + '%').padEnd(19, ' ')} |`);
    }

    console.log("+---------+-----------------------+----------------------+---------------+-------------------+---------------------+-------------------+---------------------+");

}

function classTop3() {
    console.log(`
+---------+----------------------------+---------+
|  Class  |            Name            |  Marks  |
+---------+----------------------------+---------+`);

    for (let i = 0; i < 10; i++) {
        if (classWise[i] !== undefined) {
            const toppers = classWise[i].sort((s1, s2) => s2.Total - s1.Total);
            for (let j = 0; j < 3 && j < toppers.length; j++) {
                console.log(`| ${String(i + 1).padEnd(7, ' ')} | ${toppers[j].Name.padEnd(26, ' ')} | ${String(toppers[j].Total).padEnd(7, ' ')} |`);
            }
        }
    }

    console.log("+---------+----------------------------+---------+");
}

let i = 1;
let flag = true;
while (flag) {
    console.log("1) Take Test \n2) Calculate Result \n3) View Students Result \n4) View Classwise Result \n5) Detail Analysis of Result \n6) View Top Performer \nEnter your option or type 'end' to exit");
    const opt = question();
    switch (opt) {
        case "1": if (i === 1) { testRunner2(); i++; } console.warn("test marks generated"); break;
        case "2": if (i === 2) { calculateAverage(); i++; console.warn("Average calculated") } else console.error("run test first"); break;
        case "3": if (i === 3) { display(); } else console.error("run test first and calculate average"); break;
        case "4": if (i === 3) { classWiseResult(); classWiseResultDisplay(); } else console.error("run test first and calculate average"); break;
        case "5": if (i === 3) { detailAnalysis(); } else console.error("run test first and calculate average"); break;
        case "6": if (i === 3) { classWiseResult(); classTop3(); } else console.error("run test first and calculate average"); break;
        case "end": flag = false; break;
        default: console.log("Invalid Option"); break;
    }
}
