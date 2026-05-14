import { useEffect, useState } from "react";

import Card from "../components/Card";
import { getMarks, getTests } from "../lib/api";
import { getCurrentUser } from "../lib/auth";

const tableStyle = { width: "100%", borderCollapse: "collapse" };
const thtd = { padding: "10px", borderBottom: "1px solid #eee", textAlign: "center" };
const header = { background: "#f1f5f9" };

function Marks() {
  const currentUser = getCurrentUser();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadMarks() {
      setLoading(true);
      try {
        const [marksData, testsData] = await Promise.all([
          getMarks(),
          getTests(),
        ]);

        const testsById = new Map(testsData.map((test) => [test.id, test]));
        const mergedMarks = marksData.map((mark) => {
          const test = testsById.get(mark.testId);
          return {
            id: `${mark.studentPrn}-${mark.testId}`,
            testName: test?.name || `Test ${mark.testId}`,
            component: test?.componentName || "-",
            subjectCode: test?.subjectCode || "-",
            facultyCode: test?.facultyCode || "-",
            marks: mark.marks,
            scaledMarks: mark.scaledMarks ?? "-",
          };
        });

        if (isMounted) {
          setMarks(mergedMarks);
          setError("");
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
          setMarks([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMarks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card title="Marks">
      <h2>My Marks</h2>
      <p style={subtitle}>
        Showing marks for {currentUser?.name || "the logged-in student"}
        {currentUser?.studentPrn ? ` (PRN ${currentUser.studentPrn})` : ""}.
      </p>

      {loading && <p>Loading marks...</p>}
      {error && <p style={{ color: "#b91c1c" }}>Could not load marks: {error}</p>}
      {!loading && !error && (
        <table style={tableStyle}>
          <thead>
            <tr style={header}>
              <th style={thtd}>Test</th>
              <th style={thtd}>Component</th>
              <th style={thtd}>Subject Code</th>
              <th style={thtd}>Faculty Code</th>
              <th style={thtd}>Marks</th>
              <th style={thtd}>Scaled Marks</th>
            </tr>
          </thead>

          <tbody>
            {marks.length === 0 ? (
              <tr>
                <td style={thtd} colSpan={6}>
                  No marks found for your account.
                </td>
              </tr>
            ) : (
              marks.map((mark) => (
                <tr key={mark.id}>
                  <td style={thtd}>{mark.testName}</td>
                  <td style={thtd}>{mark.component}</td>
                  <td style={thtd}>{mark.subjectCode}</td>
                  <td style={thtd}>{mark.facultyCode}</td>
                  <td style={{ ...thtd, color: "green" }}>{mark.marks}</td>
                  <td style={thtd}>{mark.scaledMarks}</td>
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

export default Marks;
