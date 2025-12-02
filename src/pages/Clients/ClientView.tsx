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
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DeleteModal from "../../Components/Common/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Client {
  id: number;
  name: string;
  companyNumber: string;
  email: string;
  phone: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  country?: string;
  paymentTerms?: number;
  complianceCheckFee?: number;
  logoUrl?: string;
  status: string;
}

const ClientView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [deleteModal, setDeleteModal] = useState(false);

  // Mock data
  const mockClients: Client[] = [
    {
      id: 1,
      name: "ABC Corporation",
      companyNumber: "CN001",
      email: "contact@abc.com",
      phone: "+1234567890",
      addressLine1: "123 Business St",
      addressLine2: "Suite 100",
      city: "New York",
      postcode: "10001",
      country: "USA",
      paymentTerms: 30,
      complianceCheckFee: 150.0,
      status: "Active",
    },
    {
      id: 2,
      name: "XYZ Industries",
      companyNumber: "CN002",
      email: "info@xyz.com",
      phone: "+1234567891",
      addressLine1: "456 Industrial Ave",
      addressLine2: "",
      city: "London",
      postcode: "SW1A 1AA",
      country: "UK",
      paymentTerms: 45,
      complianceCheckFee: 200.0,
      status: "Active",
    },
    {
      id: 3,
      name: "Tech Solutions",
      companyNumber: "CN003",
      email: "contact@techsol.com",
      phone: "+1234567892",
      addressLine1: "789 Tech Park",
      city: "San Francisco",
      postcode: "94102",
      country: "USA",
      paymentTerms: 30,
      complianceCheckFee: 175.0,
      status: "Inactive",
    },
  ];

  const client = mockClients.find((c) => c.id === Number(id));

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

  const handleDeleteClient = () => {
    toast.success("Client deleted successfully", { autoClose: 3000 });
    setTimeout(() => {
      navigate("/clients");
    }, 1000);
  };

  document.title = "View Client | Velzon - React Admin & Dashboard Template";

  if (loading) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="py-4 text-center">
            <Spinner color="primary" />
            <div className="mt-2">Loading client details...</div>
          </div>
        </Container>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="py-4 text-center">
            <h4>Client not found</h4>
            <Button color="primary" onClick={() => navigate("/clients")}>
              Back to Clients
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
          <BreadCrumb title="Client Details" pageTitle="Clients" />

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
                              {client.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">{client.name}</h5>
                          <p className="text-muted mb-0">
                            {client.companyNumber}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="text-end">
                        <Button
                          color="info"
                          className="me-2"
                          onClick={() =>
                            navigate(`/clients/${client.id}/rental-config`)
                          }
                        >
                          <i className="ri-file-settings-line align-middle me-1"></i>
                          Rental Config
                        </Button>
                        <Button
                          color="success"
                          className="me-2"
                          onClick={() => navigate(`/clients/edit/${client.id}`)}
                        >
                          <i className="ri-pencil-line align-middle me-1"></i>
                          Edit Client
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => setDeleteModal(true)}
                        >
                          <i className="ri-delete-bin-line align-middle me-1"></i>
                          Delete Client
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
                        <i className="ri-building-line me-1 align-middle"></i>
                        Sites
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => toggleTab("3")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="ri-contacts-line me-1 align-middle"></i>
                        Contacts
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "4" })}
                        onClick={() => toggleTab("4")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="ri-money-dollar-circle-line me-1 align-middle"></i>
                        Rates
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "5" })}
                        onClick={() => toggleTab("5")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="ri-file-list-line me-1 align-middle"></i>
                        Invoices
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "6" })}
                        onClick={() => toggleTab("6")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="ri-history-line me-1 align-middle"></i>
                        History
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
                              Name
                            </label>
                            <p className="text-muted">{client.name}</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Company Number
                            </label>
                            <p className="text-muted">{client.companyNumber}</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Email
                            </label>
                            <p className="text-muted">
                              {client.email || "N/A"}
                            </p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Phone
                            </label>
                            <p className="text-muted">
                              {client.phone || "N/A"}
                            </p>
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
                              {client.addressLine1 && (
                                <>
                                  {client.addressLine1}
                                  <br />
                                </>
                              )}
                              {client.addressLine2 && (
                                <>
                                  {client.addressLine2}
                                  <br />
                                </>
                              )}
                              {client.city && client.postcode && (
                                <>
                                  {client.city}, {client.postcode}
                                  <br />
                                </>
                              )}
                              {client.country || ""}
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Payment Terms
                            </label>
                            <p className="text-muted">
                              {client.paymentTerms
                                ? `${client.paymentTerms} days`
                                : "N/A"}
                            </p>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Compliance Check Fee
                            </label>
                            <p className="text-muted">
                              {client.complianceCheckFee
                                ? `$${client.complianceCheckFee.toFixed(2)}`
                                : "N/A"}
                            </p>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Status
                            </label>
                            <div>
                              <Badge
                                color={
                                  client.status === "Active"
                                    ? "success"
                                    : client.status === "Inactive"
                                    ? "danger"
                                    : "warning"
                                }
                              >
                                {client.status}
                              </Badge>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>

                    {/* Sites Tab */}
                    <TabPane tabId="2">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Client Sites</h5>
                        <Button color="success" size="sm">
                          <i className="ri-add-line align-middle me-1"></i>
                          Add Site
                        </Button>
                      </div>
                      <div className="text-center py-5">
                        <i className="ri-building-2-line fs-1 text-muted"></i>
                        <p className="text-muted mt-3">
                          No sites found for this client
                        </p>
                      </div>
                    </TabPane>

                    {/* Contacts Tab */}
                    <TabPane tabId="3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Contact Persons</h5>
                        <Button color="success" size="sm">
                          <i className="ri-add-line align-middle me-1"></i>
                          Add Contact
                        </Button>
                      </div>
                      <div className="text-center py-5">
                        <i className="ri-contacts-line fs-1 text-muted"></i>
                        <p className="text-muted mt-3">
                          No contacts found for this client
                        </p>
                      </div>
                    </TabPane>

                    {/* Rates Tab */}
                    <TabPane tabId="4">
                      <div className="text-center py-5">
                        <i className="ri-money-dollar-circle-line fs-1 text-muted"></i>
                        <p className="text-muted mt-3">
                          No rates configured for this client
                        </p>
                      </div>
                    </TabPane>

                    {/* Invoices Tab */}
                    <TabPane tabId="5">
                      <div className="text-center py-5">
                        <i className="ri-file-list-line fs-1 text-muted"></i>
                        <p className="text-muted mt-3">
                          No invoices found for this client
                        </p>
                      </div>
                    </TabPane>

                    {/* History Tab */}
                    <TabPane tabId="6">
                      <div className="text-center py-5">
                        <i className="ri-history-line fs-1 text-muted"></i>
                        <p className="text-muted mt-3">
                          No history records available
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
        onDeleteClick={handleDeleteClient}
        onCloseClick={() => setDeleteModal(false)}
      />
      <ToastContainer closeButton={false} limit={1} />
    </React.Fragment>
  );
};

export default ClientView;
