import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const DashboardEcommerce: React.FC = () => {
  document.title = "Dashboard | ESRM Application";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" pageTitle="Home" />

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4">
                    Welcome to ESRM Application
                  </h4>
                  <p className="text-muted">
                    Your dashboard overview will appear here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
