import { useEffect, useState } from "react";

import Card from "../components/Card";
import { getMarks, getTests } from "../lib/api";
import { getCurrentUser } from "../lib/auth";

const tableStyle = { width: "100%", borderCollapse: "collapse" };
const thtd = { padding: "12px", borderBottom: "1px solid #eee", textAlign: "center" };
const header = { background: "#f1f5f9" };

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatScore(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function TotalMarks() {
  const currentUser = getCurrentUser();
  const [subjectTotals, setSubjectTotals] = useState([]);
  const [summary, setSummary] = useState({ scored: 0, tested: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTotals() {
      setLoading(true);

      try {
        const [marksData, testsData] = await Promise.all([getMarks(), getTests()]);
        const testsById = new Map(testsData.map((test) => [test.id, test]));
        const totalsBySubject = new Map();

        for (const mark of marksData) {
          const test = testsById.get(mark.testId);
          const subjectName = test?.subjectName || `Subject ${test?.subjectCode || mark.testId}`;
          const subjectCode = test?.subjectCode || "-";
          const scored = toNumber(mark.scaledMarks);
          const tested = toNumber(test?.scaledMaxMarks);

          if (!totalsBySubject.has(subjectName)) {
            totalsBySubject.set(subjectName, {
              subjectName,
              subjectCode,
              totalScored: 0,
              totalTested: 0,
            });
          }

          const subjectEntry = totalsBySubject.get(subjectName);
          subjectEntry.totalScored += scored;
          subjectEntry.totalTested += tested;
        }

        const rows = Array.from(totalsBySubject.values()).sort((first, second) =>
          first.subjectName.localeCompare(second.subjectName),
        );

        if (isMounted) {
          setSubjectTotals(rows);
          setSummary({
            scored: rows.reduce((sum, row) => sum + row.totalScored, 0),
            tested: rows.reduce((sum, row) => sum + row.totalTested, 0),
          });
          setError("");
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
          setSubjectTotals([]);
          setSummary({ scored: 0, tested: 0 });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTotals();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card title="Total Marks">
      <h2>Total Marks</h2>
      <p style={subtitle}>
        Subject-wise totals for {currentUser?.name || "the logged-in student"}
        {currentUser?.studentPrn ? ` (PRN ${currentUser.studentPrn})` : ""}, using scaled marks
        tested so far.
      </p>

      {!loading && !error && subjectTotals.length > 0 && (
        <div style={summaryWrap}>
          <div style={summaryCard}>
            <span style={summaryLabel}>Total marks scored</span>
            <strong style={summaryValue}>{formatScore(summary.scored)}</strong>
          </div>
          <div style={summaryCard}>
            <span style={summaryLabel}>Total marks tested so far</span>
            <strong style={summaryValue}>{formatScore(summary.tested)}</strong>
          </div>
        </div>
      )}

      {loading && <p>Loading total marks...</p>}
      {error && <p style={{ color: "#b91c1c" }}>Could not load total marks: {error}</p>}
      {!loading && !error && (
        <table style={tableStyle}>
          <thead>
            <tr style={header}>
              <th style={thtd}>Subject</th>
              <th style={thtd}>Subject Code</th>
              <th style={thtd}>Total Marks Scored</th>
              <th style={thtd}>Total Marks Tested So Far</th>
            </tr>
          </thead>

          <tbody>
            {subjectTotals.length === 0 ? (
              <tr>
                <td style={thtd} colSpan={4}>
                  No marks found for your account.
                </td>
              </tr>
            ) : (
              subjectTotals.map((subject) => (
                <tr key={subject.subjectName}>
                  <td style={thtd}>{subject.subjectName}</td>
                  <td style={thtd}>{subject.subjectCode}</td>
                  <td style={{ ...thtd, color: "#0f8a3d", fontWeight: 700 }}>
                    {formatScore(subject.totalScored)}
                  </td>
                  <td style={thtd}>{formatScore(subject.totalTested)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </Card>
  );
}

const subtitle = {
  color: "#475569",
  marginBottom: "16px",
};

const summaryWrap = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginBottom: "20px",
};

const summaryCard = {
  padding: "16px 18px",
  borderRadius: "18px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const summaryLabel = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: 600,
};

const summaryValue = {
  color: "#0f172a",
  fontSize: "1.8rem",
};

export default TotalMarks;
