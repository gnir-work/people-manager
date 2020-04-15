import React, { KeyboardEvent } from "react";
import { Form, Input, Radio, Checkbox } from "antd";
import TextArea from "antd/lib/input/TextArea";
import TagList from "../components/tags/TagList";
import {
  GET_PERSONAL_ID_RULES,
  GET_BASIC_TEXT_RULES,
  GET_PHONE_NUMBER_RULES,
  GET_REQUIRED_RULE
} from "../components/validators/validators";
import { FormInstance } from "antd/lib/form";
import { SiteSettingsContextInterface } from "../contexts/SiteSettingsContext";
import { FilterableAutoComplete } from "../components/fields/text/FilterableAutoComplete";

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

interface AddPersonFormProps {
  form: FormInstance;
  onEnter: (event: KeyboardEvent<HTMLFormElement>) => void;
  doesPersonExist: (personalId: string) => boolean;
  possibleTeams: string[];
  settings: SiteSettingsContextInterface["settings"];
}

const AddPersonForm: React.FC<AddPersonFormProps> = ({
  form,
  onEnter,
  doesPersonExist,
  possibleTeams,
  settings
}) => (
  <Form
    {...layout}
    size="small"
    form={form}
    name="add_person_form"
    initialValues={initialValues}
    onKeyDown={onEnter}
  >
    <Form.Item name="fullName" label="שם מלא" rules={GET_BASIC_TEXT_RULES()}>
      <Input />
    </Form.Item>
    <Form.Item
      name="personalId"
      label="מ.א"
      rules={GET_PERSONAL_ID_RULES(doesPersonExist)}
    >
      <Input />
    </Form.Item>
    <Form.Item name="phone" label="פלאפון" rules={GET_PHONE_NUMBER_RULES()}>
      <Input />
    </Form.Item>
    <Form.Item name="team" label="צוות">
      <FilterableAutoComplete
        onKeyDown={event => {
          event.stopPropagation();
        }}
        data={possibleTeams}
      />
    </Form.Item>
    <Form.Item
      rules={[GET_REQUIRED_RULE("בבקשה הכנס מצב שירות")]}
      name="status"
      label="מצב שירות"
    >
      <Radio.Group>
        {settings.possibleStatuses.map(status => (
          <Radio key={status} value={status}>
            {status}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
    <Form.Item
      rules={[GET_REQUIRED_RULE("בבקשה הכנס זמינות")]}
      name="availability"
      label="זמינות"
    >
      <Radio.Group>
        {settings.possibleAvailabilities.map(availability => (
          <Radio key={availability} value={availability}>
            {availability}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
    <Form.Item name="wasSegel" label="סגל עבר" valuePropName="checked">
      <Checkbox />
    </Form.Item>
    <Form.Item name="preferences" label="העדפות" valuePropName="tags">
      <TagList
        possibleTags={settings.possiblePreferences}
        additionText="הוספת העדפה"
      />
    </Form.Item>
    <Form.Item name="tracks" label="מסלולים" valuePropName="tags">
      <TagList
        possibleTags={settings.possibleTracks}
        additionText="הוספת מסלול"
      />
    </Form.Item>
    <Form.Item name="subjects" label="מערכים" valuePropName="tags">
      <TagList
        possibleTags={settings.possibleSubjects}
        additionText="הוספת מערך"
      />
    </Form.Item>
    <Form.Item name="remarks" label="הערות נוספות">
      <TextArea />
    </Form.Item>
  </Form>
);

export default AddPersonForm;
