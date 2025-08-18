import  { useMemo } from "react";
import {
  User,
  Mail,
  Trophy,
  Target,
  Flame,
  Star,
  Award,
  Calendar,
  Activity,
  GitBranch,
  Code2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const DonutChart = ({ segments = [], total = 100, size = 160, stroke = 18 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
      />
      {segments.map((s, idx) => {
        const value = (s.value / total) * circumference;
        const dashArray = `${value} ${circumference - value}`;
        const dashOffset = cumulative;
        cumulative += value;
        return (
          <circle
            key={idx}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={dashArray}
            strokeDashoffset={-dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-white"
        style={{ fontWeight: 700, fontSize: 18 }}
      >
        {Math.round((segments.reduce((a, b) => a + b.value, 0) / total) * 100)}%
      </text>
    </svg>
  );
};

const RadialProgress = ({ value = 70, size = 120, stroke = 10, color = "#3E5879" }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-white" style={{ fontWeight: 700 }}>
        {value}%
      </text>
    </svg>
  );
};

const ProfilePage = () => {

  const { authUser } = useAuthStore()
  // console.log(authUser);

  const user = {
    name: "Mayank Harplani",
    email: "harplani@abc.com",
    username: "mayank",
    streak: 12,
    joined: "2024-02-01",
  };

  const stats = {
    solved: 142,
    attempted: 210,
    acceptance: 76,
    ranking: 532,
    contestRating: 1850,
  };

  const difficultyBreakdown = [
    { label: "Easy", value: 80, color: "#4CAF50" },
    { label: "Medium", value: 50, color: "#FFC107" },
    { label: "Hard", value: 12, color: "#F44336" },
  ];

  const weeklyActivity = useMemo(() => Array.from({ length: 35 }, () => Math.floor(Math.random() * 5)), []);

  const skills = [
    { name: "Arrays", level: 88 },
    { name: "Strings", level: 74 },
    { name: "Dynamic Programming", level: 62 },
    { name: "Graphs", level: 58 },
    { name: "Trees", level: 69 },
    { name: "Greedy", level: 71 },
    { name: "Math", level: 54 },
  ];

  const submissions = useMemo(() => (
    Array.from({ length: 12 }).map((_, i) => ({
      id: 1000 + i,
      title: ["Two Sum", "Longest Substring", "Max Subarray", "Binary Search", "Word Ladder"][i % 5],
      language: ["CPP", "JavaScript", "Python"][i % 3],
      verdict: ["Accepted", "Wrong Answer", "Time Limit", "Accepted"][i % 4],
      time: `${(Math.random() * 120 + 10).toFixed(0)} ms`,
      memory: `${(Math.random() * 40 + 8).toFixed(1)} MB`,
      submittedAt: new Date(Date.now() - i * 36e5).toLocaleString(),
    }))
  ), []);

  return (
    <div className="min-h-screen min-w-screen relative overflow-hidden" style={{ backgroundColor: "var(--navy-dark)" }}>
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

      <div className="relative z-10 max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-2xl">
            <div className="w-15 h-15 rounded-full bg-gradient-to-br  flex items-center justify-center text-gray-900 font-semibold text-sm">
                    <img
                      src={ authUser?.image ||
                        "https://avatar.iran.liara.run/public"
                      }
                      alt="User Avatar"
                      className="object-cover"
                    />
                  </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2">
                <h1 className="text-3xl sm:text-3xl font-bold" style={{ color: "var(--cream)" }}>
                {authUser?.name}
              </h1>
              <p className='text-white text-[50%] bg-[var(--steel)] h-5 rounded-lg flex items-center px-1'>{authUser?.role}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-300">
                {/* <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[var(--beige)]" /> @{user.username}
                </div> */}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--beige)]" /> {authUser?.email}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--beige)]" /> Joined {new Date(authUser?.createdAt).toLocaleDateString()}
                </div>
                {/* <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" /> {user.streak} day streak
                </div> */}
              </div>
            </div>
            <button className="btn bg-[var(--beige)] text-[var(--navy)] hover:bg-[var(--steel)] hover:text-white rounded-xl">Edit Profile</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overall Stats */}
          <div className="lg:col-span-1 md:col-span-2 bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Overall Stats</h3>
              </div>
              <Star className="w-5 h-5 text-[var(--beige)]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Solved</div>
                <div className="text-2xl font-bold text-white">{stats.solved}</div>
              </div>
              <div className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Attempted</div>
                <div className="text-2xl font-bold text-white">{stats.attempted}</div>
              </div>
              <div className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Acceptance</div>
                <div className="text-2xl font-bold text-white">{stats.acceptance}%</div>
              </div>
              <div className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Ranking</div>
                <div className="text-2xl font-bold text-white">#{stats.ranking}</div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="lg:col-span-1 bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Skills & Proficiency</h3>
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
                      style={{ width: `${s.level}%`, background: "linear-gradient(90deg, var(--steel), var(--beige))" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acceptance & Difficulty */}
          <div className="lg:col-span-1 bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <h3 className="text-lg font-semibold text-white">Acceptance & Difficulty</h3>
              </div>
              <Award className="w-5 h-5 text-[var(--beige)]" />
            </div>
            <div className="flex items-center gap-6">
              <RadialProgress value={stats.acceptance} size={120} stroke={10} color="#3E5879" />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <DonutChart segments={difficultyBreakdown} total={difficultyBreakdown.reduce((a, b) => a + b.value, 0)} size={140} stroke={18} />
                  <div className="space-y-2">
                    {difficultyBreakdown.map((d) => (
                      <div key={d.label} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: d.color }}></span>
                        <span className="w-20">{d.label}</span>
                        <span className="font-semibold text-white">{d.value}</span>
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
                <GitBranch className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
              </div>
              <Calendar className="w-5 h-5 text-[var(--beige)]" />
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weeklyActivity.map((v, idx) => (
                <div
                  key={idx}
                  className="w-full h-8 rounded-lg border border-[var(--steel)] transition-all duration-200 hover:scale-[1.02]"
                  title={`Day ${idx + 1}: ${v} submissions`}
                  style={{ 
                    background: `linear-gradient(135deg, rgba(62,88,121,${0.18 + v * 0.12}), rgba(216,196,182,${0.10 + v * 0.08}))`,
                    boxShadow: v > 0 ? 'inset 0 0 0 1px rgba(216,196,182,0.25)' : 'inset 0 0 0 1px rgba(62,88,121,0.5)'
                  }}
                ></div>
              ))}
            </div>
            <div className="text-sm text-gray-400 mt-2">Intensity indicates submissions count</div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1 bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--steel)] text-white flex items-center justify-center text-xs font-bold">#{i}</div>
                    <div>
                      <div className="text-white font-medium">Two Sum Variant {i}</div>
                      <div className="text-xs text-gray-400">Solved in Python • 24 mins ago</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30 bg-emerald-900/20 text-emerald-300">Accepted</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Submissions - Full width */}
          <div className="lg:col-span-3 bg-[var(--navy)] border border-[var(--steel)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Total Submissions</h3>
              </div>
            </div>
            <div className="space-y-3">
              {submissions.map((s) => (
                <div key={s.id} className="bg-[var(--navy-dark)] border border-[var(--steel)] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-white font-medium truncate">{s.title}</div>
                    <div className="text-xs text-gray-400">{s.language} • {s.submittedAt}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      s.verdict === 'Accepted' ? 'border-emerald-500/30 bg-emerald-900/20 text-emerald-300' :
                      s.verdict === 'Wrong Answer' ? 'border-red-500/30 bg-red-900/20 text-red-300' :
                      'border-yellow-500/30 bg-yellow-900/20 text-yellow-300'
                    }`}>{s.verdict}</span>
                    <span className="text-xs text-gray-300">{s.time}</span>
                    <span className="text-xs text-gray-300">{s.memory}</span>
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