import { normalizeDepartmentName } from "./department";

const CURRENT_USER_KEY = "currentUser";

function inferAcademicInfoFromPrn(studentPrn) {
  const prnText = String(studentPrn ?? "").trim();
  if (prnText.length !== 11) {
    return { branch: null, dept: null };
  }

  switch (prnText.charAt(7)) {
    case "1":
      return { branch: "Civil", dept: "Civil Engineering" };
    case "2":
      return { branch: "CSE", dept: "Computer Science and Engineering" };
    case "3":
      return { branch: "E&TC", dept: "Electronics and Telecommunication Engineering" };
    case "5":
      return { branch: "MECH", dept: "Mechanical Engineering" };
    case "6":
      return { branch: "AIML", dept: "Artificial Intelligence and Machine Learning Engineering" };
    case "7":
      return { branch: "R&A", dept: "Robotics and Automation Engineering" };
    default:
      return { branch: null, dept: null };
  }
}

function normalizeUserSession(user) {
  if (!user?.studentPrn) {
    return user;
  }

  const inferred = inferAcademicInfoFromPrn(user.studentPrn);
  return {
    ...user,
    branch: inferred.branch || user.branch || null,
    dept: normalizeDepartmentName(inferred.dept || user.dept || null),
  };
}

export function getCurrentUser() {
  const storedUser = localStorage.getItem(CURRENT_USER_KEY);
  return storedUser ? normalizeUserSession(JSON.parse(storedUser)) : null;
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

export function persistSession(user) {
  const normalizedUser = normalizeUserSession(user);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(normalizedUser));
}

export function clearSession() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
