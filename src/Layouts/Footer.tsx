import React from "react";
import { Col, Container, Row } from "reactstrap";
import { FOOTER_TEXT, FOOTER_CREDIT } from "../common/branding";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid>
          <Row>
            <Col sm={6}>{FOOTER_TEXT}</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                {FOOTER_CREDIT}
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
