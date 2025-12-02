import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasPortalAccess: boolean;
}

interface PortalAccessModalProps {
  show: boolean;
  contact: Contact;
  onClose: () => void;
  onUpdate: (contactId: number, hasAccess: boolean, action: string) => void;
}

const PortalAccessModal: React.FC<PortalAccessModalProps> = ({
  show,
  contact,
  onClose,
  onUpdate,
}) => {
  const [emailMessage, setEmailMessage] = useState(
    `Dear ${contact.firstName},\n\nYou have been granted access to our client portal. Please use the following link to set up your account:\n\n[Portal Link]\n\nBest regards,\nThe Team`
  );

  const handleGrantAccess = () => {
    onUpdate(contact.id, true, "grant");
  };

  const handleRevokeAccess = () => {
    onUpdate(contact.id, false, "revoke");
  };

  const handleSendInvitation = () => {
    onUpdate(contact.id, true, "invite");
  };

  return (
    <Modal isOpen={show} toggle={onClose} centered size="lg">
      <ModalHeader toggle={onClose}>
        Manage Portal Access - {contact.firstName} {contact.lastName}
      </ModalHeader>
      <ModalBody>
        <div className="mb-3">
          <div className="d-flex align-items-center mb-3">
            <div className="flex-grow-1">
              <h6 className="mb-1">Current Status</h6>
              <p className="text-muted mb-0">
                {contact.hasPortalAccess ? (
                  <span className="badge bg-success">Has Portal Access</span>
                ) : (
                  <span className="badge bg-secondary">No Portal Access</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <h6>Contact Information</h6>
          <p className="text-muted mb-1">
            <strong>Email:</strong> {contact.email}
          </p>
        </div>

        {contact.hasPortalAccess ? (
          <div className="alert alert-info">
            <i className="ri-information-line me-2"></i>
            This contact currently has access to the client portal. You can
            revoke their access using the button below.
          </div>
        ) : (
          <div>
            <div className="alert alert-warning">
              <i className="ri-alert-line me-2"></i>
              This contact does not have portal access. Grant access and send an
              invitation email to get them started.
            </div>

            <Form>
              <FormGroup>
                <Label for="emailMessage">Invitation Email Message</Label>
                <Input
                  type="textarea"
                  id="emailMessage"
                  rows={6}
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                />
              </FormGroup>
            </Form>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        {contact.hasPortalAccess ? (
          <>
            <Button color="warning" onClick={handleSendInvitation}>
              <i className="ri-mail-send-line me-1"></i>
              Resend Invitation
            </Button>
            <Button color="danger" onClick={handleRevokeAccess}>
              <i className="ri-close-circle-line me-1"></i>
              Revoke Access
            </Button>
          </>
        ) : (
          <>
            <Button color="success" onClick={handleGrantAccess}>
              <i className="ri-check-line me-1"></i>
              Grant Access Only
            </Button>
            <Button color="primary" onClick={handleSendInvitation}>
              <i className="ri-mail-send-line me-1"></i>
              Grant Access & Send Invitation
            </Button>
          </>
        )}
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PortalAccessModal;
