import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Label,
  Badge,
  Button,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import PortalAccessModal from "../../../Components/Common/PortalAccessModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

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

const ContactsList = () => {
  const navigate = useNavigate();
  document.title = "Contacts | Velzon - React Admin & Dashboard Template";

  const [contacts, setContacts] = useState<Contact[]>([
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
      notes: "Primary contact",
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
    },
    {
      id: 3,
      clientId: 2,
      clientName: "XYZ Industries",
      firstName: "Bob",
      lastName: "Wilson",
      email: "bob.wilson@xyz.com",
      phone: "+1234567892",
      role: "Operations Manager",
      hasPortalAccess: true,
    },
  ]);

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [portalAccessModal, setPortalAccessModal] = useState<boolean>(false);
  const [contact, setContact] = useState<Contact | null>(null);

  // Filters
  const [clientFilter, setClientFilter] = useState<string>("");

  const clientOptions = [
    { label: "All Clients", value: "" },
    { label: "ABC Corporation", value: "1" },
    { label: "XYZ Industries", value: "2" },
    { label: "Tech Solutions", value: "3" },
  ];

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesClient =
        !clientFilter || contact.clientId.toString() === clientFilter;
      return matchesClient;
    });
  }, [contacts, clientFilter]);

  const onClickDelete = (contactData: Contact) => {
    setContact(contactData);
    setDeleteModal(true);
  };

  const onClickManagePortalAccess = (contactData: Contact) => {
    setContact(contactData);
    setPortalAccessModal(true);
  };

  const handleDeleteContact = () => {
    if (contact) {
      setContacts(contacts.filter((c) => c.id !== contact.id));
      setDeleteModal(false);
      toast.success("Contact deleted successfully", { autoClose: 3000 });
    }
  };

  const handlePortalAccessUpdate = (
    contactId: number,
    hasAccess: boolean,
    action: string
  ) => {
    setContacts(
      contacts.map((c) =>
        c.id === contactId ? { ...c, hasPortalAccess: hasAccess } : c
      )
    );
    setPortalAccessModal(false);

    if (action === "grant") {
      toast.success("Portal access granted successfully", { autoClose: 3000 });
    } else if (action === "revoke") {
      toast.success("Portal access revoked successfully", { autoClose: 3000 });
    } else if (action === "invite") {
      toast.success("Invitation email sent successfully", { autoClose: 3000 });
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <span className="fw-medium">{cell.getValue()}</span>;
        },
      },
      {
        header: "Name",
        accessorKey: "firstName",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return (
            <div>
              <strong>
                {cell.row.original.firstName} {cell.row.original.lastName}
              </strong>
              <p className="text-muted mb-0 small">
                {cell.row.original.clientName}
              </p>
            </div>
          );
        },
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        enableColumnFilter: false,
      },
      {
        header: "Role",
        accessorKey: "role",
        enableColumnFilter: false,
      },
      {
        header: "Portal Access",
        accessorKey: "hasPortalAccess",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const hasAccess = cell.getValue();
          return (
            <Badge color={hasAccess ? "success" : "secondary"}>
              {hasAccess ? "Yes" : "No"}
            </Badge>
          );
        },
      },
      {
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <div className="d-inline-flex gap-1">
              <Button
                size="sm"
                color="soft-primary"
                onClick={() =>
                  navigate(
                    `/clients/contacts/view/${cellProps.row.original.id}`
                  )
                }
              >
                <i className="ri-eye-line"></i>
              </Button>
              <Button
                size="sm"
                color="soft-secondary"
                onClick={() =>
                  navigate(
                    `/clients/contacts/edit/${cellProps.row.original.id}`
                  )
                }
              >
                <i className="ri-pencil-line"></i>
              </Button>
              <Button
                size="sm"
                color="soft-info"
                onClick={() => {
                  const contactData = cellProps.row.original;
                  onClickManagePortalAccess(contactData);
                }}
              >
                <i className="ri-key-2-line"></i>
              </Button>
              <Button
                size="sm"
                color="soft-danger"
                onClick={() => {
                  const contactData = cellProps.row.original;
                  onClickDelete(contactData);
                }}
              >
                <i className="ri-delete-bin-line"></i>
              </Button>
            </div>
          );
        },
      },
    ],
    [navigate]
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Contacts" pageTitle="Client Management" />
          <Row>
            <Col lg={12}>
              <Card id="contactsList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <Col sm={3}>
                      <div>
                        <h5 className="card-title mb-0">Contacts List</h5>
                      </div>
                    </Col>
                    <Col sm={9}>
                      <div className="text-end">
                        <Link
                          to="/clients/contacts/create"
                          className="btn btn-success"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Contact
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="pt-0">
                  {/* Filters */}
                  <Row className="mb-3">
                    <Col md={4}>
                      <Label className="form-label">Filter by Client</Label>
                      <Select
                        value={clientOptions.find(
                          (option) => option.value === clientFilter
                        )}
                        onChange={(selectedOption: any) => {
                          setClientFilter(selectedOption?.value || "");
                        }}
                        options={clientOptions}
                        placeholder="All Clients"
                        isClearable
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </Row>

                  <div>
                    <TableContainer
                      columns={columns}
                      data={filteredContacts || []}
                      isGlobalFilter={false}
                      customPageSize={10}
                      divClass="table-responsive table-card mb-3"
                      tableClass="align-middle table-nowrap mb-0"
                      SearchPlaceholder="Search for contacts..."
                    />
                  </div>
                  <ToastContainer closeButton={false} limit={1} />
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
    </React.Fragment>
  );
};

export default ContactsList;
