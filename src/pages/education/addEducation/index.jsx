import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  Col,
  Divider,
  Form,
  Grid,
  Notification,
  Row,
  Schema,
  useToaster,
} from "rsuite";
import Page from "../../../components/layout/Page";
import TextArea from "../../../components/TextArea";
import TextInput from "../../../components/TextInput";
import { db } from "../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const AddEducation = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const formRef = React.useRef();
  const toaster = useToaster();

  const initialValues = {
    name: "",
    description: "",
    code: "",
  };

  const [formValues, setFormValue] = React.useState(initialValues);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      toaster.push(
        <Notification
          closable
          type="error"
          header={t("general.error.validation_error")}
          duration={2000}
        >
          <p>{t("general.error.validation_error_description")}</p>
        </Notification>,
        { placement: "topEnd" }
      );
      return;
    }
    addDoc(collection(db, "education"), {
      code: formValues.code,
      name: formValues.name,
      description: formValues.description,
      timestamp: new Date(),
    })
      .then((response) => {
        toaster.push(
          <Notification
            closable
            type="success"
            header={t("general.error.success")}
            duration={2000}
          >
            <p>{t("general.error.success_add")}</p>
          </Notification>,
          { placement: "topEnd" }
        );
        history("/educations/list");
      })
      .catch((err) => {
        toaster.push(
          <Notification
            closable
            type="error"
            header={t("general.error.error")}
            duration={2000}
          >
            <p>Hata</p>
          </Notification>,
          { placement: "topEnd" }
        );
      });
  };

  return (
    <Page title={t("pages.education.add_title")}>
      <Form fluid formValue={formValues} onChange={setFormValue} ref={formRef}>
        <Grid fluid>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <TextInput name="code" label={t("pages.education.code")} />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <TextInput name="name" label={t("pages.education.name")} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TextInput
                name="description"
                label={t("pages.education.description")}
                rows={3}
                accepter={TextArea}
              />
            </Col>
          </Row>
        </Grid>
        <Form.Group>
          <Divider />
          <ButtonToolbar
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <Button color="green" appearance="primary" onClick={onSubmit}>
              {t("general.save")}
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </Page>
  );
};

export default AddEducation;
