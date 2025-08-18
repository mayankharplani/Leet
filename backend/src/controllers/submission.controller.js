import { db } from "../libs/db.js";

//  CURRENTLY LOGGED IN USER KE SUBMISSION SHOW KREGA PROFILE PR

export const getAllSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
      include: {
        problem: { 
          select: {
            title: true,
            difficulty: true
          } 
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Submission fetched Succesffuly",
      submissions,
    });
  } catch (error) {
    console.error("Fetch Submission Error", error);
    res.status(500).json({ error: "Failed to fetch Submissions" });
  }
};
// PARTICULAR PROBLEM PR KITNE SUBMISSION HUE HAI WOH SHOW KREGA
export const getSubmissionsForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = req.params.problemId;
    const submission = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Submission fetched Succesfully",
      submission,
    });
  } catch (error) {
    console.error("Fetch Submission Error", error);
    res.status(500).json({ error: "Failed to fetch Submissions" });
  }
};
// KITNE BAR SUBMISSION KIA HAI PROBLEM PR WOH SHOW KREGA
export const getAllTheSubmissionsForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const submission = await db.submission.count({
      where: {
        problemId: problemId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Submission Count fetched Successfully",
      count: submission,
    });
  } catch (error) {
    console.error("Fetch Submission Error", error);
    res.status(500).json({ error: "Failed to fetch Submissions" });
  }
};

export const getAttemptedProblems = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get all submissions by the user
    const submissions = await db.submission.findMany({
      where: { userId: userId },
      select: { problemId: true }, // no need for status here
    });

    // 2. Extract unique problem IDs
    const attemptedProblemIds = [
      ...new Set(submissions.map((sub) => sub.problemId)),
    ];

    // 3. Fetch problem details
    const attemptedProblems = await db.problem.findMany({
      where: { id: { in: attemptedProblemIds } },
    });

    res.status(200).json({
      success: true,
      message: "Attempted problems fetched successfully",
      attemptedProblems,
    });
  } catch (error) {
    console.error("Fetch Attempted Problems Error", error);
    res.status(500).json({ error: "Failed to fetch attempted problems" });
  }
};
