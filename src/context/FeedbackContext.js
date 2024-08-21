import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FeedbackContext = createContext();

const FeedbackProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [grades, setGrades] = useState([]);
  const [teacherComments, setTeacherComments] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accountResponse = await axios.get("http://localhost:9999/accounts");
      setAccounts(accountResponse.data);
      const studentResponse = await axios.get("http://localhost:9999/students");
      setStudents(studentResponse.data);
      const teacherResponse = await axios.get("http://localhost:9999/teachers");
      setTeachers(teacherResponse.data);
      const classResponse = await axios.get("http://localhost:9999/classes");
      setClasses(classResponse.data);
      const feedbackResponse = await axios.get(
        "http://localhost:9999/feedbacks"
      );
      setFeedbacks(feedbackResponse.data);
      const gradeResponse = await axios.get("http://localhost:9999/grades");
      setGrades(gradeResponse.data);
      const teacherCommentResponse = await axios.get(
        "http://localhost:9999/teacherComments"
      );
      setTeacherComments(teacherCommentResponse.data);
    };
    fetchData();
  }, []);

  // Join các bảng lại với nhau
  const joinedDataGradeClass = grades.map((grade) => {
    const classInfo = classes.find((cls) => cls.classId === grade.classId);
    return {
      ...grade,
      className: classInfo ? classInfo.name : null,
      teacherId: classInfo ? classInfo.teacherId : null,
    };
  });

  const joinedDataFeedbackClass = feedbacks.map((feedback) => {
    const classInfo = classes.find((cls) => cls.classId === feedback.classId);
    return {
      ...feedback,
      className: classInfo ? classInfo.name : null,
      teacherId: classInfo ? classInfo.teacherId : null,
    };
  });

  // Lấy tên bằng id của đối tượng đó
  const getNameStudent = (id) => {
    const student = students.find((student) => student.studentId === id);
    return student ? student.name : "";
  };

  const getStudentById = (id) => {
    const student = students.find((student) => student.studentId === id);
    return student ? student : "";
  };

  // lấy cả object  bằng những dữ liệu liên quan
  const getNameTeacher = (id) => {
    const teacher = teachers.find((teacher) => teacher.teacherId === id);
    return teacher ? teacher.name : "";
  };
  const getAccount = (user, pass) => {
    const account = accounts.find(
      (account) => account.username === user && account.password === pass
    );
    return account ? account : "";
  };

  const getFeedback = (classid, stuid) => {
    const feedback = feedbacks.find(
      (fb) => fb.classId === classid && fb.studentId === stuid
    );
    return feedback ? feedback : "";
  };

  const getFeedbackById = (id) => {
    const feedback = feedbacks.find((fb) => fb.id === id);
    return feedback ? feedback : "";
  };
  const getStudentClasses = (stuid) => {
    const classByStudent = classes.filter((cl) => cl.students.includes(stuid));
    return classByStudent ? classByStudent : [];
  };

  const getClassByTeacher = (id) => {
    const classByTeacher = classes.filter((cl) => cl.teacherId === id);
    return classByTeacher ? classByTeacher : [];
  };
  const getGradesByClass = (classid) => {
    const gradeByClass = grades.filter((gr) => gr.classId === classid);
    return gradeByClass ? gradeByClass : [];
  };

  const getGradeByTeacher = (id) => {
    const gradeByTeacher = joinedDataGradeClass.filter(
      (gr) => gr.teacherId === id
    );
    return gradeByTeacher ? gradeByTeacher : [];
  };

  const getFeedbackByTeacher = (id) => {
    const feedbackByTeacher = joinedDataFeedbackClass.filter(
      (fb) => fb.teacherId === id
    );
    return feedbackByTeacher ? feedbackByTeacher : [];
  };

  const getTeacherComments = (teacherid, feedbackid) => {
    const comment = teacherComments.find(
      (tc) => tc.teacherId === teacherid && tc.feedbackId === feedbackid
    );
    return comment ? comment : "";
  };

  const getTeacherCommentById = (id) => {
    const comment = teacherComments.find((tc) => tc.id === id);
    return comment ? comment : "";
  };

  // Kiem tra Feedback da ton tai hay chua
  const hasFeedbackByStudent = (stuid, classid) => {
    const feedback = feedbacks.find(
      (fb) => fb.studentId === stuid && fb.classId === classid
    );
    return feedback ? true : false;
  };

  const hasCommentTeacher = (teacherid, feedbackid) => {
    const comment = teacherComments.find(
      (tc) => tc.teacherId === teacherid && tc.feedbackId === feedbackid
    );
    return comment ? true : false;
  };

  // Chức năng dữ liệu
  const addFeedback = async (feedback) => {
    try {
      const response = await axios.post(`http://localhost:9999/feedbacks`, {
        id: parseInt(feedbacks.length) + 1,
        ...feedback,
      });
      setFeedbacks((prevFeedbacks) => [...prevFeedbacks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };
  const editFeedback = async (feedback) => {
    try {
      const response = await axios.put(
        `http://localhost:9999/feedbacks/${feedback.id}`,
        feedback
      );
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((fb) => (fb.id === feedback.id ? response.data : fb))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const editCommentTeacher = async (comment) => {
    try {
      const response = await axios.put(
        `http://localhost:9999/teacherComments/${comment.id}`,
        comment
      );
      setTeacherComments((prevTeacherComments) =>
        prevTeacherComments.map((tc) =>
          tc.id === comment.id ? response.data : tc
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  // const deleteFeedback = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:9999/feedbacks/${id}`);
  //     setFeedbacks((prevFeedbacks) =>
  //       prevFeedbacks.filter((feedback) => feedback.id !== id)
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const addCommentTeacher = async (comment) => {
    try {
      const response = await axios.post(
        `http://localhost:9999/teacherComments`,
        {
          id: teacherComments.length + 1,
          ...comment,
        }
      );
      setTeacherComments((prevTeacherComments) => [
        ...prevTeacherComments,
        response.data,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        accounts,
        students,
        teachers,
        classes,
        grades,
        feedbacks,
        selectedClass,
        setSelectedClass,
        getNameStudent,
        getNameTeacher,
        getAccount,
        hasFeedbackByStudent,
        addFeedback,
        getFeedback,
        editFeedback,
        getStudentClasses,
        getClassByTeacher,
        getGradesByClass,
        joinedDataGradeClass,
        getGradeByTeacher,
        getStudentById,
        joinedDataFeedbackClass,
        getFeedbackByTeacher,
        hasCommentTeacher,
        getTeacherComments,
        editCommentTeacher,
        getTeacherCommentById,
        addCommentTeacher,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackProvider;
