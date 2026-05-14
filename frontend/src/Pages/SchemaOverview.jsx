import { useEffect, useState } from "react";

import Card from "../components/Card";
import { getSchemaOverview } from "../lib/api";
import { getCurrentUser } from "../lib/auth";
import { departmentsMatch } from "../lib/department";

function DataTable({ title, rows }) {
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <Card title={title}>
      {rows.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr style={headerRow}>
                {columns.map((column) => (
                  <th key={column} style={cell}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${title}-${index}`}>
                  {columns.map((column) => (
                    <td key={`${title}-${index}-${column}`} style={cell}>
                      {row[column] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function SchemaOverview() {
  const currentUser = getCurrentUser();
  const [schemaData, setSchemaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSchemaData() {
      try {
        const data = await getSchemaOverview();
        if (isMounted) {
          setSchemaData(data);
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

    loadSchemaData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSchemaData = !schemaData || !currentUser?.dept
    ? schemaData
    : (() => {
        const subjects = (schemaData.subjects || []).filter(
          (subject) => departmentsMatch(subject.Dept, currentUser.dept),
        );
        const subjectCodes = new Set(subjects.map((subject) => subject.S_code));
        const facultySubjects = (schemaData.facultySubjects || []).filter(
          (mapping) => subjectCodes.has(mapping.S_code),
        );
        const facultyCodes = new Set(facultySubjects.map((mapping) => mapping.F_code));
        const faculties = (schemaData.faculties || []).filter(
          (faculty) => facultyCodes.has(faculty.F_code),
        );

        return {
          ...schemaData,
          subjects,
          faculties,
          facultySubjects,
        };
      })();

  const hasDepartmentData = Boolean(
    (filteredSchemaData?.subjects || []).length || (filteredSchemaData?.faculties || []).length,
  );

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Department Info</h2>
      {currentUser?.branch && (
        <p style={{ marginBottom: "20px", color: "#64748b" }}>
          Showing academic info for {currentUser.branch} branch ({currentUser.dept} department).
        </p>
      )}

      {loading && <p>Loading schema data...</p>}
      {error && <p style={{ color: "#b91c1c" }}>Could not load schema data: {error}</p>}

      {!loading && !error && filteredSchemaData && hasDepartmentData && (
        <div style={grid}>
          <DataTable title="Faculties" rows={filteredSchemaData.faculties || []} />
          <DataTable title="Subjects" rows={filteredSchemaData.subjects || []} />
          <DataTable title="Faculty Subjects" rows={filteredSchemaData.facultySubjects || []} />
        </div>
      )}
      {!loading && !error && filteredSchemaData && !hasDepartmentData && (
        <Card title="Department Info">
          <p style={{ margin: 0, color: "#64748b" }}>
            No faculty or subject records are available yet for the {currentUser?.dept || "selected"} department.
          </p>
        </Card>
      )}
    </div>
  );
}

const grid = {
  display: "grid",
  gap: "20px",
};

const tableWrap = {
  overflowX: "auto",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const headerRow = {
  background: "#f1f5f9",
};

const cell = {
  padding: "10px 12px",
  borderBottom: "1px solid #e2e8f0",
  textAlign: "left",
  whiteSpace: "nowrap",
};

export default SchemaOverview;
