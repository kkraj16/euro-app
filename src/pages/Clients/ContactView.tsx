import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
  Spinner,
  Badge,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DeleteModal from "../../Components/Common/DeleteModal";
import PortalAccessModal from "../../Components/Common/PortalAccessModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Contact {
  id: number;
  clientId: number;
  clientName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  hasPortalAccess: boolean;
  notes?: string;
}

const ContactView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [portalAccessModal, setPortalAccessModal] = useState(false);
  const [contact, setContact] = useState<Contact | null>(null);

  // Mock data
  const mockContacts: Contact[] = [
    {
      id: 1,
      clientId: 1,
      clientName: "ABC Corporation",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@abc.com",
      phone: "+1234567890",
      role: "Site Manager",
      hasPortalAccess: true,
      notes: "Primary contact for all site matters",
    },
    {
      id: 2,
      clientId: 1,
      clientName: "ABC Corporation",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@abc.com",
      phone: "+1234567891",
      role: "Safety Officer",
      hasPortalAccess: false,
      notes: "Contact for safety compliance",
    },
  ];

  useEffect(() => {
    const foundContact = mockContacts.find((c) => c.id === Number(id));
    setContact(foundContact || null);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDeleteContact = () => {
    toast.success("Contact deleted successfully", { autoClose: 3000 });
    setTimeout(() => {
      navigate("/clients/contacts");
    }, 1000);
  };

  const handlePortalAccessUpdate = (
    contactId: number,
    hasAccess: boolean,
    action: string
  ) => {
    if (contact) {
      setContact({ ...contact, hasPortalAccess: hasAccess });
    }
    setPortalAccessModal(false);

    if (action === "grant") {
      toast.success("Portal access granted successfully", { autoClose: 3000 });
    } else if (action === "revoke") {
      toast.success("Portal access revoked successfully", { autoClose: 3000 });
    } else if (action === "invite") {
      toast.success("Invitation email sent successfully", { autoClose: 3000 });
    }
  };

  document.title = "View Contact | Velzon - React Admin & Dashboard Template";

  if (loading) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="py-4 text-center">
            <Spinner color="primary" />
            <div className="mt-2">Loading contact details...</div>
          </div>
        </Container>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="py-4 text-center">
            <h4>Contact not found</h4>
            <Button
              color="primary"
              onClick={() => navigate("/clients/contacts")}
            >
              Back to Contacts
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
          <BreadCrumb title="Contact Details" pageTitle="Contacts" />

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
                              {contact.firstName.charAt(0)}
                              {contact.lastName.charAt(0)}
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">
                            {contact.firstName} {contact.lastName}
                          </h5>
                          <p className="text-muted mb-0">
                            {contact.clientName}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="text-end">
                        <Button
                          color="info"
                          className="me-2"
                          onClick={() => setPortalAccessModal(true)}
                        >
                          <i className="ri-key-2-line align-middle me-1"></i>
                          Manage Portal Access
                        </Button>
                        <Button
                          color="success"
                          className="me-2"
                          onClick={() =>
                            navigate(`/clients/contacts/edit/${contact.id}`)
                          }
                        >
                          <i className="ri-pencil-line align-middle me-1"></i>
                          Edit Contact
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => setDeleteModal(true)}
                        >
                          <i className="ri-delete-bin-line align-middle me-1"></i>
                          Delete Contact
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <h5 className="mb-3">Contact Information</h5>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          First Name
                        </label>
                        <p className="text-muted">{contact.firstName}</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Last Name
                        </label>
                        <p className="text-muted">{contact.lastName}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <p className="text-muted">{contact.email}</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Phone</label>
                        <p className="text-muted">{contact.phone || "N/A"}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Client</label>
                        <p className="text-muted">{contact.clientName}</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Role</label>
                        <p className="text-muted">{contact.role || "N/A"}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Portal Access
                        </label>
                        <div>
                          <Badge
                            color={
                              contact.hasPortalAccess ? "success" : "secondary"
                            }
                          >
                            {contact.hasPortalAccess ? "Yes" : "No"}
                          </Badge>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {contact.notes && (
                    <Row>
                      <Col md={12}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Notes
                          </label>
                          <p className="text-muted">{contact.notes}</p>
                        </div>
                      </Col>
                    </Row>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteContact}
        onCloseClick={() => setDeleteModal(false)}
      />

      {contact && (
        <PortalAccessModal
          show={portalAccessModal}
          contact={contact}
          onClose={() => setPortalAccessModal(false)}
          onUpdate={handlePortalAccessUpdate}
        />
      )}

      <ToastContainer closeButton={false} limit={1} />
    </React.Fragment>
  );
};

export default ContactView;
