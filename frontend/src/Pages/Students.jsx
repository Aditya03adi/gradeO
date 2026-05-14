import { useEffect, useState } from "react";

import { tableStyle, thtd, header } from "../Styles/TableStyles";
import Card from "../components/Card";
import { getStudents } from "../lib/api";
import { getCurrentUser } from "../lib/auth";
import { departmentsMatch } from "../lib/department";

function Students() {
  const currentUser = getCurrentUser();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStudents() {
      try {
        const data = await getStudents();
        if (isMounted) {
          const filteredStudents = currentUser?.dept
            ? data.filter((student) => departmentsMatch(student.dept, currentUser.dept))
            : data;
          setStudents(filteredStudents);
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

    loadStudents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card title="Students">
      <h1>Student List</h1>
      {currentUser?.branch && (
        <p style={{ marginBottom: "16px", color: "#64748b" }}>
          Showing students for {currentUser.branch} branch ({currentUser.dept} department).
        </p>
      )}
      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: "#b91c1c" }}>Could not load students: {error}</p>}
      {!loading && !error && (
        <table style={tableStyle}>
          <thead>
            <tr style={header}>
              <th style={thtd}>PRN</th>
              <th style={thtd}>Name</th>
              <th style={thtd}>Branch</th>
              <th style={thtd}>Dept</th>
              <th style={thtd}>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={thtd}>{student.id}</td>
                <td style={thtd}>{student.name}</td>
                <td style={thtd}>{student.branch}</td>
                <td style={thtd}>{student.dept}</td>
                <td style={thtd}>{student.email || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

export default Students;
