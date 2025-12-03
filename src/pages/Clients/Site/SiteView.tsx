import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Spinner,
  Badge,
} from "reactstrap";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Site {
  id: number;
  clientId: number;
  clientName: string;
  name: string;
  address: string;
  contactName: string;
  contactPhone: string;
  notes?: string;
  status: string;
}

const SiteView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [deleteModal, setDeleteModal] = useState(false);

  // Mock data
  const mockSites: Site[] = [
    {
      id: 1,
      clientId: 1,
      clientName: "ABC Corporation",
      name: "ABC Main Office",
      address: "123 Business St, New York, NY 10001",
      contactName: "John Smith",
      contactPhone: "+1234567890",
      notes: "Main headquarters office",
      status: "Active",
    },
    {
      id: 2,
      clientId: 1,
      clientName: "ABC Corporation",
      name: "ABC Warehouse",
      address: "456 Industrial Ave, Brooklyn, NY 11201",
      contactName: "Jane Doe",
      contactPhone: "+1234567891",
      notes: "Storage facility",
      status: "Active",
    },
  ];

  const site = mockSites.find((s) => s.id === Number(id));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [id]);

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleDeleteSite = () => {
    toast.success("Site deleted successfully", { autoClose: 3000 });
    setTimeout(() => {
      navigate("/clients/sites");
    }, 1000);
  };

  document.title = "View Site | Velzon - React Admin & Dashboard Template";

  if (loading) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="py-4 text-center">
            <Spinner color="primary" />
            <div className="mt-2">Loading site details...</div>
          </div>
        </Container>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="py-4 text-center">
            <h4>Site not found</h4>
            <Button color="primary" onClick={() => navigate("/clients/sites")}>
              Back to Sites
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Site Details" pageTitle="Sites" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="border-bottom">
                  <Row className="align-items-center">
                    <Col sm={6}>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title bg-light text-primary rounded-circle fs-20">
                              <i className="ri-building-2-line"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">{site.name}</h5>
                          <p className="text-muted mb-0">{site.clientName}</p>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="text-end">
                        <Button
                          color="success"
                          className="me-2"
                          onClick={() =>
                            navigate(`/clients/sites/edit/${site.id}`)
                          }
                        >
                          <i className="ri-pencil-line align-middle me-1"></i>
                          Edit Site
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => setDeleteModal(true)}
                        >
                          <i className="ri-delete-bin-line align-middle me-1"></i>
                          Delete Site
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <Nav tabs className="nav-tabs-custom nav-success mb-3">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => toggleTab("1")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="ri-information-line me-1 align-middle"></i>
                        Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => toggleTab("2")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="ri-file-list-3-line me-1 align-middle"></i>
                        Work Orders
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => toggleTab("3")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="ri-stack-line me-1 align-middle"></i>
                        Scaffolds
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    {/* Details Tab */}
                    <TabPane tabId="1">
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Site Name
                            </label>
                            <p className="text-muted">{site.name}</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Client
                            </label>
                            <p className="text-muted">{site.clientName}</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Address
                            </label>
                            <p className="text-muted">
                              {site.address || "N/A"}
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Contact Name
                            </label>
                            <p className="text-muted">
                              {site.contactName || "N/A"}
                            </p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Contact Phone
                            </label>
                            <p className="text-muted">
                              {site.contactPhone || "N/A"}
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Status
                            </label>
                            <div>
                              <Badge
                                color={
                                  site.status === "Active"
                                    ? "success"
                                    : "danger"
                                }
                              >
                                {site.status}
                              </Badge>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {site.notes && (
                        <Row>
                          <Col md={12}>
                            <div className="mb-3">
                              <label className="form-label fw-semibold">
                                Notes
                              </label>
                              <p className="text-muted">{site.notes}</p>
                            </div>
                          </Col>
                        </Row>
                      )}
                    </TabPane>

                    {/* Work Orders Tab */}
                    <TabPane tabId="2">
                      <div className="text-center py-5">
                        <i className="ri-file-list-3-line fs-1 text-muted"></i>
                        <p className="text-muted mt-3">
                          No work orders found for this site
                        </p>
                      </div>
                    </TabPane>

                    {/* Scaffolds Tab */}
                    <TabPane tabId="3">
                      <div className="text-center py-5">
                        <i className="ri-stack-line fs-1 text-muted"></i>
                        <p className="text-muted mt-3">
                          No scaffolds found for this site
                        </p>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteSite}
        onCloseClick={() => setDeleteModal(false)}
      />
      <ToastContainer closeButton={false} limit={1} />
    </React.Fragment>
  );
};

export default SiteView;
