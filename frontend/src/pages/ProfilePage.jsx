import { useEffect, useMemo } from "react";
import {
  Mail,
  Calendar,
  Trophy,
  Star,
  Target,
  CheckCircle2,
  Award,
  ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Navbar from "../components/Navbar.jsx"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Doughnut} from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const DonutChart = ({ segments = [], size = 160, stroke = 18 }) => {
  const data = {
    labels: segments.map((s) => s.label),
    datasets: [
      {
        data: segments.map((s) => s.value),
        backgroundColor: segments.map((s) => s.color),
        borderColor: segments.map((s) => s.color),
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
      },
    },
  };

  return (
    <div style={{ width: size, height: size }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

const RadialProgress = ({
  value = 70,
  size = 120,
  stroke = 10,
  color = "#3E5879",
}) => {
  const data = {
    labels: ["Progress"],
    datasets: [
      {
        label: "Progress",
        data: [value, 100 - value],
        backgroundColor: [color, "rgba(255,255,255,0.1)"],
        borderColor: [color, "rgba(255,255,255,0.1)"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "white",
          textAlign: "center",
        }}
      >
        {value}%
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const {
    attempted,
    getAttemptedProblems,
    submissions: submissionList,
    getAllSubmissions,
  } = useSubmissionStore();

  useEffect(() => {
    getAttemptedProblems(), getAllSubmissions();
  }, [getAttemptedProblems]);
  console.log(authUser)


const difficultyCount = authUser.problemSolved.reduce(
  (acc, ps) => {
    const diff = ps.problem.difficulty; // "EASY", "MEDIUM", "HARD"
    if (diff === "EASY") acc.easy++;
    else if (diff === "MEDIUM") acc.medium++;
    else if (diff === "HARD") acc.hard++;
    return acc;
  },
  { easy: 0, medium: 0, hard: 0 } // initial counts
);

console.log(difficultyCount);
// { easy: 1, medium: 0, hard: 0 }




console.log(attempted)


const stats = {
  solved: authUser?.problemSolved.length || 0,
  TotalSubmissions: submissionList.length || 0,
  attempted: attempted.length || 0,
  acceptance: attempted.length > 0 
    ? ((authUser?.problemSolved.length / attempted.length) * 100).toFixed(0) 
    : 0,
};

const difficultyBreakdown = [
  { label: "Easy", value: Math.max(difficultyCount.easy , 0), color: "#4CAF50" },
  { label: "Medium", value: Math.max(difficultyCount.medium , 0), color: "#FFC107" },
  { label: "Hard", value: Math.max(difficultyCount.hard , 0), color: "#F44336" },
];



  const tagCount = {};
  const solvedProblems = authUser.problemSolved;

  for(const problem of solvedProblems){
    const tags = problem.problem.tags
    for(const tag of tags){
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }
  }

  const totalSolved = authUser.problemSolved.length

  

const skills = Object.entries(tagCount).map(([tag, count]) => ({
  name: tag,
  level: Math.round((count / totalSolved) * 100)
}));

  return (
    <div
      className="min-h-screen min-w-screen relative overflow-hidden"
      style={{ backgroundColor: "var(--navy-dark)" }}
    >
      <Navbar />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--beige) 1px, transparent 0)`,
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative mt-20 z-10 max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-2xl">
            <div className="w-15 h-15 rounded-full bg-gradient-to-br  flex items-center justify-center text-gray-900 font-semibold text-sm">
              <img
                src={authUser?.image || "https://avatar.iran.liara.run/public"}
                alt="User Avatar"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2">
                <h1
                  className="text-3xl sm:text-3xl font-bold"
                  style={{ color: "var(--cream)" }}
                >
                  {authUser?.name}
                </h1>
                <p className="text-white text-[50%] bg-[var(--steel)] h-5 rounded-lg flex items-center px-1">
                  {authUser?.role}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-300">
                {/* <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[var(--beige)]" /> @{user.username}
                </div> */}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--beige)]" />{" "}
                  {authUser?.email}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--beige)]" /> Joined{" "}
                  {new Date(authUser?.createdAt).toLocaleDateString()}
                </div>
                {/* <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" /> {user.streak} day streak
                </div> */}
              </div>
            </div>
            <button className="btn bg-[var(--beige)] text-[var(--navy)] hover:bg-[var(--steel)] hover:text-white rounded-xl">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overall Stats */}
          <div className="lg:col-span-3 md:col-span-2 bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">
                  Overall Stats
                </h3>
              </div>
              <Star className="w-5 h-5 text-[var(--beige)]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Problems Solved</div>
                <div className="text-2xl font-bold text-white">
                  {stats.solved}
                </div>
              </div>
              <div className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Attempted</div>
                <div className="text-2xl font-bold text-white">
                  {stats.attempted}
                </div>
              </div>
              <div className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Acceptance</div>
                <div className="text-2xl font-bold text-white">
                  {stats.acceptance}%
                </div>
              </div>
              <div className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Total Submissions</div>
                <div className="text-2xl font-bold text-white">
                  {stats.TotalSubmissions}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}

          {/* Acceptance & Difficulty */}
          <div className="lg:col-span-1 bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <h3 className="text-lg font-semibold text-white">
                  Acceptance & Difficulty
                </h3>
              </div>
              <Award className="w-5 h-5 text-[var(--beige)]" />
            </div>
            <div className="flex items-center gap-6">
              {/* <RadialProgress
                value={stats.acceptance}
                size={120}
                stroke={10}
                color="#3E5879"
              /> */}
              <div className="flex-1 mt-10 px-5">
                <div className="flex items-center gap-10">
                  <DonutChart
                    segments={difficultyBreakdown}
                    total={difficultyBreakdown.reduce((a, b) => a + b.value, 0)}
                    size={180}
                    stroke={18}
                  />
                  <div className="space-y-2">
                    {difficultyBreakdown.map((d) => (
                      <div
                        key={d.label}
                        className="flex items-center gap-2 text-md text-gray-300"
                      >
                        <span
                          className="inline-block w-3 h-3 rounded"
                          style={{ backgroundColor: d.color }}
                        ></span>
                        <span className="w-20">{d.label}</span>
                        <span className="font-semibold text-white">
                          {d.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Activity (wider) */}
          <div className="lg:col-span-2 bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">
                  Skills & Proficiency
                </h3>
              </div>
              <ShieldCheck className="w-5 h-5 text-[var(--beige)]" />
            </div>
            <div className="space-y-4">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>{s.name}</span>
                    <span className="text-white font-semibold">{s.level}%</span>
                  </div>
                  <div className="w-full h-3 bg-[var(--navy-dark)] rounded-full border border-[var(--steel)] overflow-hidden mt-2">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.level}%`,
                        background:
                          "linear-gradient(90deg, var(--steel), var(--beige))",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}

          {/* Total Submissions - Full width */}
          <div className="lg:col-span-3 md:col-span-2 bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">
                  Total Submissions
                </h3>
              </div>
            </div>
            <div className="space-y-3">
              {submissionList?.map((s) => (
                <div
                  key={s?.id}
                  className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-white font-medium truncate">
                      {s?.problem?.title}
                    </div>
                    <div className="text-xs text-gray-400">
                      {s?.language} •{" "}
                      {(() => {
                        const d = new Date(s.createdAt);
                        return `${d.getFullYear()}-${(d.getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}-${d
                          .getDate()
                          .toString()
                          .padStart(2, "0")} ${d
                          .getHours()
                          .toString()
                          .padStart(2, "0")}:${d
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}:${d
                          .getSeconds()
                          .toString()
                          .padStart(2, "0")}`;
                      })()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        s?.status === "Accepted"
                          ? "border-emerald-500/30 bg-emerald-900/20 text-emerald-300"
                          : s?.status === "Wrong Answer"
                          ? "border-red-500/30 bg-red-900/20 text-red-300"
                          : "border-yellow-500/30 bg-yellow-900/20 text-yellow-300"
                      }`}
                    >
                      {s?.status}
                    </span>
                    <span className="text-xs text-gray-300">
                      {s.time
                        ? (
                            JSON.parse(s.time)
                              .map((t) => parseFloat(t.replace(" s", "")))
                              .reduce((a, b) => a + b, 0) /
                            JSON.parse(s.time).length
                          ).toFixed(2)
                        : 0}{" "}
                      s
                    </span>
                    <span className="text-xs text-gray-300">
                      {s.memory
                        ? (
                            JSON.parse(s.memory)
                              .map((m) => parseFloat(m.replace(" KB", "")))
                              .reduce((a, b) => a + b, 0) /
                            JSON.parse(s.memory).length /
                            1024
                          ).toFixed(1)
                        : 0}{" "}
                      MB
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
