import React, { useState } from "react";

const App = () => {
  const [classes, setClasses] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  const addClass = () => {
    const newClass = {
      students: []
    };
    setClasses([...classes, newClass]);
  };

  const addStudent = (classIndex) => {
    const newStudent = {
      firstName: "",
      lastName: "",
      gender: ""
    };

    const updatedClasses = [...classes];
    updatedClasses[classIndex].students.push(newStudent);

    setClasses(updatedClasses);
  };

  const handleInputChange = (classIndex, studentIndex, e) => {
    const { name, value } = e.target;

    const updatedClasses = [...classes];
    updatedClasses[classIndex].students[studentIndex][name] = value;

    setClasses(updatedClasses);
  };

  const handleSubmit = () => {
    const errors = [];

    classes.forEach((classObj, classIndex) => {
      classObj.students.forEach((student, studentIndex) => {
        if (!student.firstName || !student.lastName || !student.gender) {
          errors.push({ classIndex, studentIndex });
        }
      });
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
      // Store data in local storage
      localStorage.setItem("classes", JSON.stringify(classes));
    }
  };

  return (
    <div className="main">
      <div className="add-class-button">
        <button type="button" onClick={addClass}>
          + Add Class
        </button>
      </div>
      {classes.map((classObj, classIndex) => (
        <div className="main-class-box" key={classIndex}>
          <h2>Class - {classIndex + 1}</h2>
          <div className="class-box">
            {classObj.students.map((student, studentIndex) => (
              <div className="student-box" key={studentIndex}>
                <h3>Student - {studentIndex + 1}</h3>
                <div className="class-box-content">
                  <div className="form-input">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={student.firstName}
                      onChange={(e) =>
                        handleInputChange(classIndex, studentIndex, e)
                      }
                    />
                    {validationErrors.find(
                      (error) =>
                        error.classIndex === classIndex &&
                        error.studentIndex === studentIndex
                    ) && <small>Required *</small>}
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={student.lastName}
                      onChange={(e) =>
                        handleInputChange(classIndex, studentIndex, e)
                      }
                    />
                    {validationErrors.find(
                      (error) =>
                        error.classIndex === classIndex &&
                        error.studentIndex === studentIndex
                    ) && <small>Required *</small>}
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Gender</label>
                    <div className="radio-input">
                      <div className="form-input-radio">
                        <input
                          type="radio"
                          name={`gender-${classIndex}-${studentIndex}`}
                          value="Male"
                          checked={student.gender === "Male"}
                          onChange={(e) =>
                            handleInputChange(classIndex, studentIndex, e)
                          }
                        />
                        <label>Male</label>
                      </div>
                      <div className="form-input-radio">
                        <input
                          type="radio"
                          name={`gender-${classIndex}-${studentIndex}`}
                          value="Female"
                          checked={student.gender === "Female"}
                          onChange={(e) =>
                            handleInputChange(classIndex, studentIndex, e)
                          }
                        />
                        <label>Female</label>
                      </div>
                      <div className="form-input-radio">
                        <input
                          type="radio"
                          name={`gender-${classIndex}-${studentIndex}`}
                          value="Other"
                          checked={student.gender === "Other"}
                          onChange={(e) =>
                            handleInputChange(classIndex, studentIndex, e)
                          }
                        />
                        <label>Other</label>
                      </div>
                    </div>
                    {validationErrors.find(
                      (error) =>
                        error.classIndex === classIndex &&
                        error.studentIndex === studentIndex
                    ) && <small>Required *</small>}
                  </div>
                </div>
              </div>
            ))}
            <div className="add-student-button">
              <button type="button" onClick={() => addStudent(classIndex)}>
                + Add Student
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="submit-btn">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;
