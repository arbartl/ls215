const EXAM_WEIGHT = 0.65;
const EXERCISE_WEIGHT = 0.35;
const EXAM_COUNT = 4;

let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

const letterEquivalent = function (grade) {
  if (grade < 60) {
    return "F";
  } else if (grade < 69) {
    return "E";
  } else if (grade < 77) {
    return "D";
  } else if (grade < 85) {
    return "C";
  } else if (grade < 93) {
    return "B";
  } else {
    return "A";
  }
};

const generateStudentGrades = function (scores) {
  return Object.keys(scores).map((student) => {
    let examScore =
      scores[student].scores.exams.reduce((total, score) => total + score) /
      EXAM_COUNT;
    let exercisesScore = scores[student].scores.exercises.reduce(
      (total, score) => total + score
    );
    let weightedScore = Math.round(
      examScore * EXAM_WEIGHT + exercisesScore * EXERCISE_WEIGHT
    );
    return `${weightedScore} (${letterEquivalent(weightedScore)})`;
  });
};

const examData = function (scores) {
  let examInformation = Object.keys(scores).map(
    (student) => scores[student].scores.exams
  );
  examInformation = transpose(examInformation);
  return examInformation.map((exam) => {
    let examAverage = (
      exam.reduce((total, score) => total + score) / exam.length
    ).toFixed(1);
    let examMin = exam.reduce((min, score) => (min <= score ? min : score));
    let examMax = exam.reduce((max, score) => (max >= score ? max : score));
    return {
      average: Number(examAverage),
      minimum: examMin,
      maximum: examMax,
    };
  });
};

function generateClassRecordSummary(scores) {
  let studentGrades = generateStudentGrades(scores);
  let exams = examData(scores);
  return {
    studentGrades,
    exams,
  };
}

function transpose(matrix) {
  return Object.keys(matrix[0]).map((colNumber) =>
    matrix.map((rowNumber) => rowNumber[colNumber])
  );
}

console.log(generateClassRecordSummary(studentScores));

/* returns:
{
  studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
  exams: [
    { average: 75.6, minimum: 50, maximum: 100 },
    { average: 86.4, minimum: 70, maximum: 100 },
    { average: 87.6, minimum: 60, maximum: 100 },
    { average: 91.8, minimum: 80, maximum: 100 },
  ],
}
*/
