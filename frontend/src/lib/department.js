const DEPARTMENT_LABELS = {
  Civil: "Civil Engineering",
  "Civil Engineering": "Civil Engineering",
  Computer: "Computer Science and Engineering",
  "Computer Science and Engineering": "Computer Science and Engineering",
  Electronics: "Electronics and Telecommunication Engineering",
  "Electronics and Telecommunication": "Electronics and Telecommunication Engineering",
  "Electronics and Telecommunication Engineering": "Electronics and Telecommunication Engineering",
  Mechanical: "Mechanical Engineering",
  "Mechanical Engineering": "Mechanical Engineering",
  AIML: "Artificial Intelligence and Machine Learning Engineering",
  "Artificial Intelligence and Machine Learning": "Artificial Intelligence and Machine Learning Engineering",
  "Artificial Intelligence and Machine Learning Engineering": "Artificial Intelligence and Machine Learning Engineering",
  "R&A": "Robotics and Automation Engineering",
  "Robotics and Automation": "Robotics and Automation Engineering",
  "Robotics and Automation Engineering": "Robotics and Automation Engineering",
};

export function normalizeDepartmentName(dept) {
  if (!dept) {
    return dept;
  }

  return DEPARTMENT_LABELS[dept] || dept;
}

export function departmentsMatch(left, right) {
  return normalizeDepartmentName(left) === normalizeDepartmentName(right);
}
