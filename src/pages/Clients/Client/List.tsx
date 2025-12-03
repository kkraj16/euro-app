import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  country: string;
  status: string;
  createdAt: string;
}

const ClientsList: React.FC = () => {
  document.title = "Client Management | ESRM Application";

  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "ABC Corporation",
      email: "contact@abc.com",
      phone: "+1234567890",
      company: "ABC Corp",
      address: "123 Business St",
      city: "New York",
      country: "USA",
      status: "Active",
      createdAt: "2024-10-15",
    },
    {
      id: 2,
      name: "XYZ Industries",
      email: "info@xyz.com",
      phone: "+1234567891",
      company: "XYZ Industries",
      address: "456 Commerce Ave",
      city: "Los Angeles",
      country: "USA",
      status: "Active",
      createdAt: "2024-11-01",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    country: "",
    status: "Active",
  });

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      resetForm();
    }
  };

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      city: "",
      country: "",
      status: "Active",
    });
    setIsEdit(false);
    setSelectedClient(null);
  };

  const handleAddClient = () => {
    setIsEdit(false);
    resetForm();
    toggleModal();
  };

  const handleEditClient = (client: Client) => {
    setIsEdit(true);
    setSelectedClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      address: client.address,
      city: client.city,
      country: client.country,
      status: client.status,
    });
    toggleModal();
  };

  const handleDeleteClick = (client: Client) => {
    setSelectedClient(client);
    toggleDeleteModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && selectedClient) {
      setClients(
        clients.map((client) =>
          client.id === selectedClient.id ? { ...client, ...formData } : client
        )
      );
    } else {
      const newClient: Client = {
        id: clients.length + 1,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setClients([...clients, newClient]);
    }
    toggleModal();
  };

  const handleDelete = () => {
    if (selectedClient) {
      setClients(clients.filter((client) => client.id !== selectedClient.id));
      toggleDeleteModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Client Management" pageTitle="Client Management" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Clients List</h5>
                <Button color="success" onClick={handleAddClient}>
                  <i className="ri-add-line align-bottom me-1"></i> Add Client
                </Button>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table-striped table-nowrap align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Company</th>
                        <th scope="col">Contact Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">City</th>
                        <th scope="col">Country</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client.id}>
                          <td>{client.id}</td>
                          <td>{client.company}</td>
                          <td>{client.name}</td>
                          <td>{client.email}</td>
                          <td>{client.phone}</td>
                          <td>{client.city}</td>
                          <td>{client.country}</td>
                          <td>
                            <span
                              className={`badge bg-${
                                client.status === "Active"
                                  ? "success"
                                  : "danger"
                              }`}
                            >
                              {client.status}
                            </span>
                          </td>
                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                tag="a"
                                className="btn btn-soft-secondary btn-sm"
                                role="button"
                              >
                                <i className="ri-more-fill"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem
                                  onClick={() => handleEditClient(client)}
                                >
                                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                  Edit
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem
                                  onClick={() => handleDeleteClick(client)}
                                >
                                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Add/Edit Modal */}
        <Modal isOpen={modal} toggle={toggleModal} size="lg">
          <ModalHeader toggle={toggleModal}>
            {isEdit ? "Edit Client" : "Add New Client"}
          </ModalHeader>
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="company">Company Name *</Label>
                    <Input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Contact Name *</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phone">Phone *</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="address">Address *</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="city">City *</Label>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="country">Country *</Label>
                    <Input
                      type="text"
                      name="country"
                      id="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="status">Status *</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange as any}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="light" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="success" type="submit">
                {isEdit ? "Update" : "Create"}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={deleteModal} toggle={toggleDeleteModal} centered>
          <ModalHeader toggle={toggleDeleteModal}>Delete Client</ModalHeader>
          <ModalBody>
            <div className="mt-2 text-center">
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure?</h4>
                <p className="text-muted mx-4 mb-0">
                  Are you sure you want to remove this client?
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={toggleDeleteModal}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Yes, Delete It!
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default ClientsList;
