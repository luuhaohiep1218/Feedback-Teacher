import { Button } from "react-bootstrap";

import BreadcrumbHeader from "./BreadcrumbHeader";
function Header(props) {
  const accountSession = localStorage.getItem("account");
  const accountObject = JSON.parse(accountSession);
  const handleLogout = () => {
    localStorage.removeItem("account");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 d-flex align-items-end">
          <h1 style={{ marginBottom: "0px" }}>
            FPT University Academic Portal
          </h1>
        </div>
        <div className="col-md-4">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong
                    className="text-decoration-underline "
                    style={{ fontSize: "10px" }}
                  >
                    FAP mobile app (myFAP) is ready at
                  </strong>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="https://apps.apple.com/app/id1527723314">
                    <img
                      src="https://fap.fpt.edu.vn/images/app-store.png"
                      style={{ width: "120px", height: "40px" }}
                      alt="apple store"
                    />
                  </a>
                </td>
                <td>
                  <a href="https://play.google.com/store/apps/details?id=com.fuct">
                    <img
                      src="https://fap.fpt.edu.vn/images/play-store.png"
                      style={{ width: "120px", height: "40px" }}
                      alt="google store"
                    />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span
          class="border rounded-2 p-2 mb-4"
          style={{ backgroundColor: "#F3F3F3" }}
        >
          {accountObject && (
            <div className="d-flex justify-content-between">
              <div>
                <BreadcrumbHeader role={accountObject.role}  />
              </div>
              <div className="float-end">
                <Button variant="success" size="sm">
                  {accountObject.username}
                </Button>
                <Button
                  variant="success"
                  style={{ marginLeft: "10px" }}
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
