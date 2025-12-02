import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDepartments as onGetDepartments,
  deleteDepartment as onDeleteDepartment,
} from "../../slices/departments/thunk";
import { createSelector } from "reselect";
import Loader from "../../Components/Common/Loader";

const DepartmentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const selectLayoutState = (state: any) => state.Departments;
  const selectDepartmentProperties = createSelector(
    selectLayoutState,
    (state) => ({
      departments: state.departments,
      error: state.error,
    })
  );

  const { departments, error } = useSelector(selectDepartmentProperties);

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [department, setDepartment] = useState<any>(null);

  useEffect(() => {
    if (departments && !departments.length) {
      dispatch(onGetDepartments());
    }
  }, [dispatch, departments]);

  const onClickDelete = (department: any) => {
    setDepartment(department);
    setDeleteModal(true);
  };

  const handleDeleteDepartment = () => {
    if (department) {
      dispatch(onDeleteDepartment(department.id));
      setDeleteModal(false);
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
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "Code",
        accessorKey: "code",
        enableColumnFilter: false,
      },
      {
        header: "Description",
        accessorKey: "description",
        enableColumnFilter: false,
      },
      {
        header: "Employee Count",
        accessorKey: "employeeCount",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <span>{cell.getValue() || 0}</span>;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const status = cell.getValue();
          const badgeClass =
            status === "Published"
              ? "bg-success-subtle text-success"
              : status === "Draft"
              ? "bg-warning-subtle text-warning"
              : status === "Scheduled"
              ? "bg-info-subtle text-info"
              : "bg-secondary-subtle text-secondary";

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
                color="soft-secondary"
                onClick={() =>
                  navigate(
                    `/account/departments/edit/${cellProps.row.original.id}`
                  )
                }
              >
                <i className="ri-pencil-line"></i>
              </Button>
              <Button
                size="sm"
                color="soft-danger"
                onClick={() => {
                  const departmentData = cellProps.row.original;
                  onClickDelete(departmentData);
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

  document.title = "Departments | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Departments" pageTitle="Account" />
          <Row>
            <Col lg={12}>
              <Card id="departmentsList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <Col sm={3}>
                      <div>
                        <h5 className="card-title mb-0">Department List</h5>
                      </div>
                    </Col>
                    <Col sm={9}>
                      <div className="text-end">
                        <Link
                          to="/account/departments/create"
                          className="btn btn-success"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Department
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="pt-0">
                  <div>
                    {departments && departments.length > 0 ? (
                      <TableContainer
                        columns={columns}
                        data={departments || []}
                        isGlobalFilter={true}
                        customPageSize={10}
                        divClass="table-responsive table-card mb-3"
                        tableClass="align-middle table-nowrap mb-0"
                        SearchPlaceholder="Search for departments..."
                      />
                    ) : (
                      <Loader error={error} />
                    )}
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
        onDeleteClick={handleDeleteDepartment}
        onCloseClick={() => setDeleteModal(false)}
      />
    </React.Fragment>
  );
};

export default DepartmentList;
