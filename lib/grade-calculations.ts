export const calculateGrade = (score: number) => {
  if (score >= 90)
    return { grade: "S", comment: "Wow! Either you're a genius or you found the answer key. Suspicious... 🤔" }
  if (score >= 80)
    return { grade: "A", comment: "Not bad! You actually opened the textbook more than once. Impressive! 📚" }
  if (score >= 70)
    return {
      grade: "B",
      comment: "Decent work! You're like a participation trophy - good enough but nothing special. 🏆",
    }
  if (score >= 60)
    return { grade: "C", comment: "Meh. You did the bare minimum. Your parents are... proud? Maybe? 🤷‍♂️" }
  if (score >= 50)
    return { grade: "D", comment: "Yikes! You passed by the skin of your teeth. Time to panic study! 😰" }
  if (score >= 40)
    return { grade: "E", comment: "Oof! This is awkward. Even your calculator is embarrassed for you. 💀" }
  return {
    grade: "F",
    comment: "F in the chat! You failed so hard, even failure is disappointed. Try again... please? 🤡",
  }
}

import { courses } from "@/lib/courses-data"

export const calculateScore = (course: string, inputs: Record<string, number>, level: string): number => {
  let T = 0
  const {
    GAA = 0,
    Qz1 = 0,
    Qz2 = 0,
    F = 0,
    Bonus = 0,
    GAA1 = 0,
    GAA2 = 0,
    GAA3 = 0,
    PE1 = 0,
    PE2 = 0,
    OPE1 = 0,
    OPE2 = 0,
    KA = 0,
    GA = 0,
    Q2 = 0,
    ROE = 0,
    Asgn1 = 0,
    Asgn2 = 0,
    Asgn3 = 0,
    ROE1 = 0,
    P1 = 0,
    P2 = 0,
    OP = 0,
    OPE = 0,
    GLA = 0,
    BPTA = 0,
    GP1 = 0,
    GP2 = 0,
    PP = 0,
    CP = 0,
    GP = 0,
    OPPE1 = 0,
    OPPE2 = 0,
    GAAP = 0,
    V = 0,
    GP3 = 0,
    P = 0,
    CVA = 0,
    Quiz1 = 0,
    Quiz2 = 0,
    Quiz3 = 0,
    NPPE1 = 0,
    NPPE2 = 0,
    NPPE3 = 0,
    Viva = 0,
    OPPE = 0,
  } = inputs

  const selectedCourse = courses[level as keyof typeof courses]?.find((c: any) => c.name === course)
  const maxBonus = selectedCourse?.bonus || 0

  if (level === "foundation") {
    if (course === "Intro to Python Programming") {
      T = 0.1 * GAA1 + 0.1 * GAA2 + 0.1 * Qz1 + 0.4 * F + 0.25 * Math.max(PE1, PE2) + 0.15 * Math.min(PE1, PE2)
    } else {
      // Standard foundation formula for most courses
      T = 0.1 * GAA + Math.max(0.6 * F + 0.2 * Math.max(Qz1, Qz2), 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2)
    }
  } else if (level === "diploma") {
    switch (course) {
      case "Machine Learning Foundations":
        T = 0.1 * GAA + Math.max(0.6 * F + 0.2 * Math.max(Qz1, Qz2), 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2)
        break
      case "Machine Learning Techniques":
        T = 0.1 * GAA + 0.4 * F + Math.max(0.25 * Qz1 + 0.25 * Qz2, 0.4 * Math.max(Qz1, Qz2))
        break
      case "Machine Learning Practice":
        T = 0.1 * GAA + 0.3 * F + 0.2 * OPE1 + 0.2 * OPE2 + 0.2 * KA
        break
      case "Business Data management":
        T = 0.3 * GA + 0.2 * Q2 + 0.2 * ROE + 0.3 * F
        break
      case "Business Analytics":
        const assignments = [Asgn1, Asgn2, Asgn3].sort((a, b) => b - a).slice(0, 2)
        const A = assignments[0] + assignments[1]
        const Qz = 0.7 * Math.max(Qz1, Qz2) + 0.3 * Math.min(Qz1, Qz2)
        T = A + Qz + F
        break
      case "Tools in Data Science":
        T = 0.15 * GAA + 0.2 * ROE1 + 0.2 * P1 + 0.2 * P2 + 0.25 * F
        break
      case "Programming Data structures and algorithms using Python (PDSA)":
        T = 0.1 * GAA + 0.4 * F + 0.2 * OP + Math.max(0.2 * Math.max(Qz1, Qz2), 0.15 * Qz1 + 0.15 * Qz2)
        break
      case "Database management system (DBMS)":
        T =
          0.04 * GAA1 +
          0.03 * GAA2 +
          0.03 * GAA3 +
          0.2 * OPE +
          Math.max(0.45 * F + 0.15 * Math.max(Qz1, Qz2), 0.4 * F + 0.1 * Qz1 + 0.2 * Qz2)
        break
      case "Application development - 1":
        T = 0.15 * GLA + 0.05 * GA + Math.max(0.35 * F + 0.2 * Qz1 + 0.25 * Qz2, 0.4 * F + 0.3 * Math.max(Qz1, Qz2))
        break
      case "Programming concepts using Java":
        T =
          0.1 * GAA +
          0.3 * F +
          0.2 * Math.max(PE1, PE2) +
          0.1 * Math.min(PE1, PE2) +
          Math.max(0.25 * Math.max(Qz1, Qz2), 0.15 * Qz1 + 0.25 * Qz2)
        break
      case "System commands":
        T = 0.1 * GAA + 0.2 * Qz1 + 0.3 * OPE + 0.3 * F + 0.1 * BPTA
        break
      case "Application Development - 2":
        T = 0.05 * GAA1 + 0.05 * GAA2 + Math.max(0.35 * F + 0.25 * Qz1 + 0.3 * Qz2, 0.5 * F + 0.3 * Math.max(Qz1, Qz2))
        break
    }
  } else if (level === "degree") {
    switch (course) {
      case "Software Testing":
        T = 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2
        break
      case "Software Engineering":
        T = 0.05 * GAA + 0.2 * Qz2 + 0.4 * F + 0.1 * GP1 + 0.1 * GP2 + 0.1 * PP + 0.05 * CP
        break
      case "Deep Learning":
      case "AI: Search Methods for Problem Solving":
      case "Deep Learning for CV":
      case "Managerial Economics":
      case "Game Theory and Strategy":
      case "Statistical Computing":
      case "Large Language Models":
        T = 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2
        break
      case "Strategies for Professional Growth":
        T = 0.15 * GAA + 0.25 * GP + 0.25 * Qz2 + 0.35 * F
        break
      case "Introduction to Big Data":
        T = 0.1 * GAA + 0.3 * F + 0.2 * OPPE1 + 0.4 * OPPE2
        break
      case "Programming in C":
        T = 0.05 * GAA + 0.1 * GAAP + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.3 * F
        break
      case "Algorithmic Thinking in Bioinformatics":
        T = 0.2 * GAA + 0.2 * Qz1 + 0.2 * Qz2 + 0.4 * F
        break
      case "Speech Technology":
        T = 0.15 * GAA + 0.15 * V + 0.3 * F + 0.2 * Qz1 + 0.2 * Qz2
        break
      case "Design Thinking for Data-Driven App Development":
        T = 0.1 * GAA + 0.1 * GP1 + 0.1 * GP2 + 0.2 * GP3 + 0.2 * Qz2 + 0.3 * F
        break
      case "Market Research":
        T = 0.1 * GAA + 0.2 * Qz1 + 0.2 * Qz2 + 0.25 * P + 0.25 * F
        break
      case "Advanced Algorithms":
        T = 0.15 * GAA + 0.35 * F + 0.25 * Qz1 + 0.25 * Qz2
        break
      case "Computer System Design":
        T = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.25 * Qz2 + 0.05 * CVA
        break
      case "Deep Learning Practice":
        T =
          0.1 * GA + 0.15 * Quiz1 + 0.15 * Quiz2 + 0.15 * Quiz3 + 0.1 * NPPE1 + 0.1 * NPPE2 + 0.1 * NPPE3 + 0.15 * Viva
        break
      case "Mathematical Foundations of Generative AI":
        T = 0.2 * GAA + 0.35 * F + 0.1 * Qz1 + 0.15 * Qz2 + 0.2 * OPPE
        break
      case "Algorithms for Data Science (ADS)":
        T = 0.2 * GAA + 0.45 * F + 0.35 * Qz2
        break
      case "MLOPS":
        T = 0.1 * GAA + 0.3 * F + 0.3 * OPPE1 + 0.3 * OPPE2
        break
    }
  }

  // Apply bonus only if total score >= 40 and use min formula
  if (T >= 40 && Bonus > 0 && maxBonus > 0) {
    T += Math.min(Bonus, maxBonus)
  }

  return Math.max(0, Math.min(T, 100))
}
