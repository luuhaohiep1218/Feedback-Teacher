import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./component/Header";
import FeedbackProvider from "./context/FeedbackContext";
import HomeForStudent from "./HomeForStudent";
import EditFeedBack from "./component/EditFeedBack";
import AddFeedback from "./component/AddFeedback";
import HomeForTeacher from "./HomeForTeacher";
import ListFeedback from "./HomeForTeacher/ListFeedback";
function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homeforstudent" element={<HomeForStudent />} />
          <Route path="/addfeedback/:classid" element={<AddFeedback />} />
          <Route path="/editfeedback/:id" element={<EditFeedBack />} />
          <Route path="/homeforteacher" element={<HomeForTeacher />} />
          <Route path="/listfeedbackofteacher" element={<ListFeedback />} />

        </Routes>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
