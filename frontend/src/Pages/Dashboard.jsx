import { useEffect, useState } from "react";

import Card from "../components/Card";
import { getStudents, getTests } from "../lib/api";
import { getCurrentUser } from "../lib/auth";
import { departmentsMatch } from "../lib/department";

function resolveStatus(test) {
  if (test?.status) {
    return test.status;
  }

  if (!test?.date) {
    return "Unknown";
  }

  const today = new Date();
  const todayText = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return test.date < todayText ? "Completed" : "Upcoming";
}

function formatDate(dateText) {
  if (!dateText) {
    return "Not scheduled";
  }

  return new Date(dateText).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Dashboard() {
  const currentUser = getCurrentUser();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setLoading(true);

      try {
        const [students, tests] = await Promise.all([getStudents(), getTests()]);
        if (!isMounted) {
          return;
        }

        const branchStudents = currentUser?.branch
          ? students.filter((student) => student.branch === currentUser.branch)
          : students;
        const branchTests = currentUser?.dept
          ? tests.filter((test) => departmentsMatch(test.subjectDept, currentUser.dept))
          : tests;

        const completedTests = branchTests.filter((test) => resolveStatus(test) === "Completed");
        const upcomingTests = branchTests.filter((test) => resolveStatus(test) === "Upcoming");
        const uniqueSubjects = new Set(branchTests.map((test) => test.subjectName).filter(Boolean));
        const uniqueFaculty = new Set(branchTests.map((test) => test.facultyName).filter(Boolean));
        const sortedUpcoming = [...upcomingTests].sort((first, second) => {
          if (!first.date) {
            return 1;
          }
          if (!second.date) {
            return -1;
          }
          return first.date.localeCompare(second.date);
        });
        const sortedCompleted = [...completedTests].sort((first, second) => {
          if (!first.date) {
            return 1;
          }
          if (!second.date) {
            return -1;
          }
          return second.date.localeCompare(first.date);
        });

        setDashboardData({
          branchStudents: branchStudents.length,
          totalTests: branchTests.length,
          completedTests: completedTests.length,
          upcomingTests: upcomingTests.length,
          subjectsCovered: uniqueSubjects.size,
          facultyInvolved: uniqueFaculty.size,
          completionRate: branchTests.length
            ? Math.round((completedTests.length / branchTests.length) * 100)
            : 0,
          nextUpcoming: sortedUpcoming[0] || null,
          latestCompleted: sortedCompleted[0] || null,
        });
        setError("");
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
          setDashboardData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const statCards = dashboardData
      ? [
        { label: "Completed Tests", value: dashboardData.completedTests, accent: "success" },
        { label: "Upcoming Tests", value: dashboardData.upcomingTests, accent: "warning" },
        { label: "Total Tests", value: dashboardData.totalTests, accent: "" },
        { label: "Subjects Covered", value: dashboardData.subjectsCovered, accent: "" },
        { label: "Faculty Involved", value: dashboardData.facultyInvolved, accent: "" },
      ]
    : [];

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p className="page-intro">
          Welcome back{currentUser?.name ? `, ${currentUser.name}` : ""}. Here is a sharper
          view of your branch test progress and what is coming next.
        </p>
      </div>

      {loading && <p>Loading dashboard...</p>}
      {error && <p className="error-text">Could not load dashboard: {error}</p>}

      {!loading && !error && dashboardData && (
        <>
          <div className="dashboard-stats-grid">
            {statCards.map((stat) => (
              <Card key={stat.label} title={stat.label}>
                <div className={`dashboard-stat-value${stat.accent ? ` ${stat.accent}` : ""}`}>
                  {stat.value}
                </div>
              </Card>
            ))}
          </div>

          <div className="dashboard-details-grid">
            <Card title="Next Upcoming Test">
              {dashboardData.nextUpcoming ? (
                <div className="dashboard-detail-stack">
                  <div className="dashboard-detail-title">{dashboardData.nextUpcoming.name}</div>
                  <div className="dashboard-detail-meta">
                    {dashboardData.nextUpcoming.componentName} • {dashboardData.nextUpcoming.subjectName}
                  </div>
                  <div className="dashboard-detail-subtle">
                    {formatDate(dashboardData.nextUpcoming.date)} • {dashboardData.nextUpcoming.facultyName}
                  </div>
                </div>
              ) : (
                <p className="dashboard-empty">No upcoming tests scheduled for this branch.</p>
              )}
            </Card>

            <Card title="Progress Overview">
              <div className="dashboard-detail-stack">
                <div className="dashboard-progress-row">
                  <span>Completion rate</span>
                  <strong>{dashboardData.completionRate}%</strong>
                </div>
                <div className="dashboard-progress-bar">
                  <div
                    className="dashboard-progress-fill"
                    style={{ width: `${dashboardData.completionRate}%` }}
                  />
                </div>
                <div className="dashboard-detail-subtle">
                  {dashboardData.completedTests} completed and {dashboardData.upcomingTests} pending in
                  the current branch schedule.
                </div>
                <div className="dashboard-detail-divider" />
                <div className="dashboard-progress-row">
                  <span>Latest completed test</span>
                  <strong>
                    {dashboardData.latestCompleted
                      ? formatDate(dashboardData.latestCompleted.date)
                      : "Not available"}
                  </strong>
                </div>
                <div className="dashboard-detail-subtle">
                  {dashboardData.latestCompleted?.name || "No completed tests yet."}
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
