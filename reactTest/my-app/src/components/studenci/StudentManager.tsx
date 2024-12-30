import { useState } from "react";

function StudentManager() {
  interface Student {
    name: string;
    surname: string;
    year: number;
  }

  const [students, setStudents] = useState<Student[]>([
    { name: "pawel", surname: "Gala", year: 2003 },
    { name: "kris", surname: "kowalsi", year: 1933 },
    { name: "maciek", surname: "Nowak", year: 1959 },
    { name: "grzesiek", surname: "Koziol", year: 1959 },
  ]);

  const [newStudent, setNewStudent] = useState<Student>({
    name: "",
    surname: "",
    year: 0,
  });

  const handleInputEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setNewStudent((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const addStudent = () => {
    if (
      newStudent.name &&
      newStudent.surname &&
      Number.isInteger(newStudent.year)
    ) {
      setStudents((prev) => [...prev, newStudent]);
      setNewStudent({ name: "", surname: "", year: 0 });
    } else {
      alert(
        "Wszystkie pola muszą być wypełnione lub rok jest podany w złym formacie"
      );
    }
  };

  return (
    <>
      <table>
        <thead>
          <th>Name</th>
          <th>Surname</th>
          <th>Year</th>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.surname}</td>
              <td>{student.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <input
        type="text"
        value={newStudent.name}
        onChange={(e) => {
          handleInputEvent(e, "name");
        }}
      />
      <input
        type="text"
        value={newStudent.surname}
        onChange={(e) => {
          handleInputEvent(e, "surname");
        }}
      />
      <input
        type="text"
        value={newStudent.year}
        onChange={(e) => {
          handleInputEvent(e, "year");
        }}
      />
      <button onClick={addStudent}>Dodaj Studenta</button>
    </>
  );
}

export default StudentManager;
