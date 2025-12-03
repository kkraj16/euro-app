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
  Button,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

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

const SitesList = () => {
  const navigate = useNavigate();
  document.title = "Sites | Velzon - React Admin & Dashboard Template";

  const [sites, setSites] = useState<Site[]>([
    {
      id: 1,
      clientId: 1,
      clientName: "ABC Corporation",
      name: "ABC Main Office",
      address: "123 Business St, New York, NY 10001",
      contactName: "John Smith",
      contactPhone: "+1234567890",
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
      status: "Active",
    },
    {
      id: 3,
      clientId: 2,
      clientName: "XYZ Industries",
      name: "XYZ Factory",
      address: "789 Factory Rd, London, SW1A 1AA",
      contactName: "Bob Wilson",
      contactPhone: "+1234567892",
      status: "Inactive",
    },
  ]);

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [site, setSite] = useState<Site | null>(null);

  // Filters
  const [clientFilter, setClientFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const clientOptions = [
    { label: "All Clients", value: "" },
    { label: "ABC Corporation", value: "1" },
    { label: "XYZ Industries", value: "2" },
    { label: "Tech Solutions", value: "3" },
  ];

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  // Filter sites
  const filteredSites = useMemo(() => {
    return sites.filter((site) => {
      const matchesClient =
        !clientFilter || site.clientId.toString() === clientFilter;
      const matchesStatus = !statusFilter || site.status === statusFilter;
      return matchesClient && matchesStatus;
    });
  }, [sites, clientFilter, statusFilter]);

  const onClickDelete = (siteData: Site) => {
    setSite(siteData);
    setDeleteModal(true);
  };

  const handleDeleteSite = () => {
    if (site) {
      setSites(sites.filter((s) => s.id !== site.id));
      setDeleteModal(false);
      toast.success("Site deleted successfully", { autoClose: 3000 });
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
        header: "Site Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return (
            <div>
              <strong>{cell.getValue()}</strong>
              <p className="text-muted mb-0 small">
                {cell.row.original.clientName}
              </p>
            </div>
          );
        },
      },
      {
        header: "Address",
        accessorKey: "address",
        enableColumnFilter: false,
      },
      {
        header: "Contact Name",
        accessorKey: "contactName",
        enableColumnFilter: false,
      },
      {
        header: "Contact Phone",
        accessorKey: "contactPhone",
        enableColumnFilter: false,
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const status = cell.getValue();
          const badgeClass =
            status === "Active"
              ? "bg-success-subtle text-success"
              : "bg-danger-subtle text-danger";

          return <span className={`badge ${badgeClass}`}>{status}</span>;
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
                  navigate(`/clients/sites/view/${cellProps.row.original.id}`)
                }
              >
                <i className="ri-eye-line"></i>
              </Button>
              <Button
                size="sm"
                color="soft-secondary"
                onClick={() =>
                  navigate(`/clients/sites/edit/${cellProps.row.original.id}`)
                }
              >
                <i className="ri-pencil-line"></i>
              </Button>
              <Button
                size="sm"
                color="soft-danger"
                onClick={() => {
                  const siteData = cellProps.row.original;
                  onClickDelete(siteData);
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
          <BreadCrumb title="Sites" pageTitle="Client Management" />
          <Row>
            <Col lg={12}>
              <Card id="sitesList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <Col sm={3}>
                      <div>
                        <h5 className="card-title mb-0">Sites List</h5>
                      </div>
                    </Col>
                    <Col sm={9}>
                      <div className="text-end">
                        <Link
                          to="/clients/sites/create"
                          className="btn btn-success"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Site
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
                    <Col md={4}>
                      <Label className="form-label">Filter by Status</Label>
                      <Select
                        value={statusOptions.find(
                          (option) => option.value === statusFilter
                        )}
                        onChange={(selectedOption: any) => {
                          setStatusFilter(selectedOption?.value || "");
                        }}
                        options={statusOptions}
                        placeholder="All Status"
                        isClearable
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </Row>

                  <div>
                    <TableContainer
                      columns={columns}
                      data={filteredSites || []}
                      isGlobalFilter={false}
                      customPageSize={10}
                      divClass="table-responsive table-card mb-3"
                      tableClass="align-middle table-nowrap mb-0"
                      SearchPlaceholder="Search for sites..."
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
        onDeleteClick={handleDeleteSite}
        onCloseClick={() => setDeleteModal(false)}
      />
    </React.Fragment>
  );
};

export default SitesList;
