import { useEffect, useState } from "react";

import Card from "../components/Card";
import { getTests } from "../lib/api";
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

function Tests() {
  const currentUser = getCurrentUser();
  const [tests, setTests] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTests() {
      try {
        const data = await getTests();
        if (isMounted) {
          const filteredTests = currentUser?.dept
            ? data.filter((test) => departmentsMatch(test.subjectDept, currentUser.dept))
            : data;
          setTests(filteredTests);
          setError("");
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTests();

    return () => {
      isMounted = false;
    };
  }, []);

  const subjectOptions = Array.from(
    new Set(tests.map((test) => test.subjectName).filter(Boolean)),
  ).sort((first, second) => first.localeCompare(second));

  const statusOptions = Array.from(
    new Set(tests.map((test) => resolveStatus(test)).filter(Boolean)),
  ).sort((first, second) => first.localeCompare(second));

  const visibleTests = tests.filter((test) => {
    const matchesSubject = !subjectFilter || test.subjectName === subjectFilter;
    const matchesStatus = !statusFilter || resolveStatus(test) === statusFilter;
    const matchesFromDate = !fromDate || (test.date && test.date >= fromDate);
    const matchesToDate = !toDate || (test.date && test.date <= toDate);

    return matchesSubject && matchesStatus && matchesFromDate && matchesToDate;
  });

  function clearFilters() {
    setSubjectFilter("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
  }

  function resolveFacultyName(test) {
    return test.facultyName || `Faculty ${test.facultyCode}`;
  }

  return (
    <Card title="Tests">
      <h2>Tests</h2>
      {currentUser?.branch && (
        <p style={{ marginBottom: "16px", color: "#64748b" }}>
          Showing tests for {currentUser.branch} branch ({currentUser.dept} department).
        </p>
      )}
      {!loading && !error && (
        <div style={filtersWrap}>
          <div style={filterGroup}>
            <label htmlFor="subjectFilter" style={labelStyle}>Subject</label>
            <select
              id="subjectFilter"
              value={subjectFilter}
              onChange={(event) => setSubjectFilter(event.target.value)}
              style={inputStyle}
            >
              <option value="">All subjects</option>
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div style={filterGroup}>
            <label htmlFor="statusFilter" style={labelStyle}>Status</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              style={inputStyle}
            >
              <option value="">All statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div style={filterGroup}>
            <label htmlFor="fromDate" style={labelStyle}>From date</label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={filterGroup}>
            <label htmlFor="toDate" style={labelStyle}>To date</label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={actionsWrap}>
            <button type="button" onClick={clearFilters} style={clearBtn}>
              Clear filters
            </button>
          </div>
        </div>
      )}
      {loading && <p>Loading tests...</p>}
      {error && <p style={{ color: "#b91c1c" }}>Could not load tests: {error}</p>}
      {!loading && !error && (
        <>
          <p style={{ marginBottom: "12px", color: "#64748b" }}>
            Showing {visibleTests.length} test{visibleTests.length === 1 ? "" : "s"}.
          </p>
          {visibleTests.length === 0 ? (
            <p style={{ color: "#64748b" }}>No tests match the selected filters.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f1f5f9" }}>
                  <th style={thtd}>ID</th>
                  <th style={thtd}>Component</th>
                  <th style={thtd}>Component Code</th>
                  <th style={thtd}>Subject</th>
                  <th style={thtd}>Subject Code</th>
                  <th style={thtd}>Faculty</th>
                  <th style={thtd}>Date</th>
                  <th style={thtd}>Status</th>
                  <th style={thtd}>Total Marks</th>
                  <th style={thtd}>Scaled Max Marks</th>
                </tr>
              </thead>

              <tbody>
                {visibleTests.map((test) => (
                  <tr key={test.id}>
                    <td style={thtd}>{test.id}</td>
                    <td style={thtd}>{test.componentName}</td>
                    <td style={thtd}>{test.componentCode}</td>
                    <td style={thtd}>{test.subjectName}</td>
                    <td style={thtd}>{test.subjectCode}</td>
                    <td style={thtd}>{resolveFacultyName(test)}</td>
                    <td style={thtd}>{test.date || "-"}</td>
                    <td style={thtd}>{resolveStatus(test)}</td>
                    <td style={thtd}>{test.totalMarks}</td>
                    <td style={thtd}>{test.scaledMaxMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </Card>
  );
}

const filtersWrap = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  marginBottom: "20px",
  alignItems: "end",
};

const filterGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle = {
  color: "#475569",
  fontSize: "14px",
  fontWeight: 600,
};

const inputStyle = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  outline: "none",
  background: "#fff",
};

const actionsWrap = {
  display: "flex",
  alignItems: "end",
};

const clearBtn = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
};

const thtd = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

export default Tests;
