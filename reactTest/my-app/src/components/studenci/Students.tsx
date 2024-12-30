function Students() {
  interface Student {
    name: string;
    surname: string;
    year: number;
  }

  const students: Student[] = [
    { name: "pawel", surname: "Gala", year: 2003 },
    { name: "kris", surname: "kowalsi", year: 1933 },
    { name: "maciek", surname: "Nowak", year: 1959 },
    { name: "grzesiek", surname: "Koziol", year: 1959 },
  ];
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
    </>
  );
}

export default Students;
