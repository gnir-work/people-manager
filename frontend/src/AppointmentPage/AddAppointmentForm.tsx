import React, { KeyboardEvent } from "react";
import { Form, Input, Radio, Checkbox, AutoComplete } from "antd";
import TextArea from "antd/lib/input/TextArea";
import TagList from "../components/tags/TagList";
import {
  GET_BASIC_TEXT_RULES,
  GET_REQUIRED_RULE
} from "../components/validators/validators";
import { FormInstance } from "antd/lib/form";
import { PeopleSettingsContextInterface } from "../contexts/PeopleSettingsContext";
import PersonAutoComplete from "../components/fields/PersonAutoComplete/PersonAutoComplete";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

const initialValues = {
  fullName: "",
  personId: "",
  phone: "",
  status: "",
  team: "",
  preferences: [],
  tracks: [],
  subjects: [],
  availability: "",
  wasSegel: false,
  remarks: ""
};

interface AddAppointmentFormProps {
  form: FormInstance;
  onEnter: (event: KeyboardEvent<HTMLFormElement>) => void;
}

const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({
  form,
  onEnter
}) => (
  <Form
    {...layout}
    size="small"
    form={form}
    name="add_person_form"
    initialValues={initialValues}
    onKeyDown={onEnter}
  >
    <Form.Item name="person" label="שם מלא">
      <PersonAutoComplete />
    </Form.Item>
  </Form>
);

export default AddAppointmentForm;
