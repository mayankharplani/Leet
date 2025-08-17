import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
  BarChart3,
} from "lucide-react";

const SubmissionList = ({ submissions, isLoading }) => {
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.log("Error Parsing data: ", error);
      return [];
    }
  };

  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0])
    );
    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length
    );
  };

  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0])
    );
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-[var(--navy)]"></span>
      </div>
    );
  }
  if (!submissions?.length) {
    return (
      <div className="flex mt-4 items-center flex-col justify-center p-8">
        <div className="p-4 rounded-4xl bg-[var(--navy-dark)]">
          <BarChart3 className="w-6 h-6 text-center sm:w-8 sm:h-8 text-[var(--beige)] " />
        </div>
        
        <div className="text-[var(--beige)] mt-2">No Submissions Yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => {
        const avgMemory = calculateAverageMemory(submission.memory) / 1024;
        const avgTime = calculateAverageTime(submission.time);
        return (
          <div
            key={submission.id}
            className="bg-[var(--steel)] shadow-lg hover:shadow-xl transition-shadow rounded-lg"
          >
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {submission.status === "Accepted" ? (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="font-semibold">Accepted</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-success">
                      <XCircle className="w-6 h-6" />
                      <span className="font-semibold">
                        {submission?.status}
                      </span>
                    </div>
                  )}
                  <div className="badge badge-neutral">
                    {submission?.language}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-base-content/70">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{avgTime.toFixed(2)} s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Memory className="w-4 h-4" />
                    <span>{avgMemory.toFixed(0)} MB</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionList;
