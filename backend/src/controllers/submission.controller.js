import { db } from "../libs/db.js";





//  CURRENTLY LOGGED IN USER KE SUBMISSION SHOW KREGA PROFILE PR

export const getAllSubmissions = async (req,res) => {
    try {
        const userId = req.user.id;

        const submissions = await db.submission.findMany({
            where: {
                userId: userId
            }
        })

        res.status(200).json({
            success: true,
            message: "Submission fetched Succesffuly",
            submissions
        })
    } catch (error) {
        console.error("Fetch Submission Error", error);
        res.status(500).json({error: "Failed to fetch Submissions"});
    }
}
// PARTICULAR PROBLEM PR KITNE SUBMISSION HUE HAI WOH SHOW KREGA
export const getSubmissionsForProblem = async (req,res) => {

    try {
        const userId = req.user.id
        const problemId = req.params.problemId;
        const submission = await db.submission.findMany({
            where: {
                userId: userId,
                problemId: problemId
            }
        })
        res.status(200).json({
            success: true,
            message: "Submission fetched Succesfully",
            submission
        })
    } catch (error) {
        console.error("Fetch Submission Error", error);
        res.status(500).json({error: "Failed to fetch Submissions"});
    }
}
// KITNE BAR SUBMISSION KIA HAI PROBLEM PR WOH SHOW KREGA
export const getAllTheSubmissionsForProblem = async (req,res) => {
    try {
       const problemId = req.params.problemId;
       const submission = await db.submission.count({
        where: {
            problemId: problemId
        }
       })
       res.status(200).json({
        success: true,
        message: "Submission Count fetched Successfully",
        count: submission
       })
    } catch (error) {
        console.error("Fetch Submission Error", error);
        res.status(500).json({error: "Failed to fetch Submissions"});
    }
}


