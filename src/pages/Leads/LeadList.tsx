import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Badge,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";
import {
  selectLeadList,
  selectLead,
  deleteLead,
} from "../../slices/leads/lead.slice";
import { LeadItem, LeadStatus } from "../../slices/leads/lead.fakeData";
import { useNavigate } from "react-router-dom";

const statusOptions: LeadStatus[] = [
  "New",
  "Contacted",
  "Quoted",
  "In Progress",
  "Pending Approval",
  "Won",
  "Lost",
  "On Hold",
  "Archived",
];

const LeadList: React.FC = () => {
  document.title = "Leads | ESRM Application";
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const leads: LeadItem[] = useSelector(selectLeadList);

  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const statusMatch = statusFilter ? l.Status === statusFilter : true;
      const sourceMatch = sourceFilter ? l.LeadSource === sourceFilter : true;
      const created = new Date(l.CreatedDate).getTime();
      const fromOk = dateFrom ? created >= new Date(dateFrom).getTime() : true;
      const toOk = dateTo ? created <= new Date(dateTo).getTime() : true;
      return statusMatch && sourceMatch && fromOk && toOk;
    });
  }, [leads, statusFilter, sourceFilter, dateFrom, dateTo]);

  const onDelete = (id: string) => {
    setLeadToDelete(id);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (leadToDelete !== null) {
      dispatch(deleteLead(leadToDelete));
    }
    setDeleteModal(false);
    setLeadToDelete(null);
  };

  const columns = useMemo(
    () => [
      {
        header: "Client Name",
        accessorKey: "ClientName",
        enableColumnFilter: false,
      },
      {
        header: "Project Name",
        accessorKey: "ProjectName",
        enableColumnFilter: false,
      },
      {
        header: "Contact Name",
        accessorKey: "ContactName",
        enableColumnFilter: false,
        cell: (cell: any) => cell.getValue() || "-",
      },
      {
        header: "Contact Phone",
        accessorKey: "ContactPhone",
        enableColumnFilter: false,
        cell: (cell: any) => cell.getValue() || "-",
      },
      {
        header: "Status",
        accessorKey: "Status",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const status = cell.getValue();
          const colorMap: any = {
            Won: "success",
            Lost: "danger",
            "In Progress": "primary",
            New: "info",
            Contacted: "secondary",
            Quoted: "secondary",
            "Pending Approval": "warning",
            "On Hold": "warning",
            Archived: "secondary",
          };
          return (
            <Badge
              color={colorMap[status] || "secondary"}
              className="badge-label"
            >
              <i className="mdi mdi-circle-medium"></i> {status}
            </Badge>
          );
        },
      },
      {
        header: "Estimated Start",
        accessorKey: "EstimatedStartDate",
        enableColumnFilter: false,
        cell: (cell: any) => cell.getValue() || "-",
      },
      {
        header: "Created",
        accessorKey: "CreatedDate",
        enableColumnFilter: false,
        cell: (cell: any) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        header: "Action",
        cell: (cellProps: any) => {
          const lead = cellProps.row.original;
          return (
            <div className="d-inline-flex gap-1">
              <Button
                size="sm"
                color="soft-primary"
                onClick={() => {
                  dispatch(selectLead(lead.LeadId));
                  navigate(`/leads/view/${lead.LeadId}`);
                }}
              >
                <i className="ri-eye-line"></i>
              </Button>
              <Button
                size="sm"
                color="soft-secondary"
                onClick={() => {
                  dispatch(selectLead(lead.LeadId));
                  navigate(`/leads/edit/${lead.LeadId}`);
                }}
              >
                <i className="ri-pencil-line"></i>
              </Button>
              <Button
                size="sm"
                color="soft-danger"
                onClick={() => onDelete(lead.LeadId)}
              >
                <i className="ri-delete-bin-line"></i>
              </Button>
            </div>
          );
        },
      },
    ],
    [dispatch, navigate]
  );

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Leads" pageTitle="Client Management" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Scaffolding Leads</h5>
                <div className="d-flex gap-2">
                  <Button
                    color="success"
                    onClick={() => navigate("/leads/create")}
                  >
                    Create Lead
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="g-3 mb-3">
                  <Col md={3}>
                    <Input
                      type="select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  <Col md={3}>
                    <Input
                      type="select"
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                    >
                      <option value="">All Sources</option>
                      {[
                        "Website",
                        "Referral",
                        "Returning Client",
                        "Phone",
                        "Walk-in",
                        "Other",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  <Col md={3}>
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </Col>
                  <Col md={3}>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </Col>
                </Row>

                <div>
                  <TableContainer
                    columns={columns}
                    data={filtered || []}
                    isGlobalFilter={false}
                    customPageSize={10}
                    divClass="table-responsive table-card mb-3"
                    tableClass="align-middle table-nowrap mb-0"
                    SearchPlaceholder="Search leads..."
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={confirmDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  );
};

export default LeadList;
