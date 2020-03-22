import React, { useState, useContext, KeyboardEvent } from "react";
import AddButton from "../actions/AddButton";
import {
  Modal,
  Form,
  Input,
  Radio,
  Checkbox,
  message,
  AutoComplete
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import TagList from "../tags/TagList";
import { PeopleContext } from "../../contexts/PeopleContext";
import {
  GET_PERSONAL_ID_RULES,
  GET_BASIC_TEXT_RULES,
  GET_PHONE_NUMBER_RULES
} from "../validators/validators";
import { PeopleSettingsContext } from "../../contexts/PeopleSettingsContext";

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

const AddPersonModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { addPerson, doesPersonExist, getFieldDataSet } = useContext(
    PeopleContext
  );

  const { settings } = useContext(PeopleSettingsContext);
  const possibleTeams = getFieldDataSet("team");

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleEnter = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      submitModal();
    }
  };

  const submitModal = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        addPerson(values as any);
        hideModal();
        message.success(`${values.fullName} נוצר בהצלחה`);
      })
      .catch(() => {});
  };

  return (
    <>
      <AddButton onClick={showModal} />
      <Modal
        onOk={submitModal}
        title="הוספת איש חוץ"
        visible={visible}
        onCancel={hideModal}
        okText="הוספה"
        cancelText="ביטול"
      >
        <Form
          {...layout}
          size="small"
          form={form}
          name="add_person_form"
          initialValues={initialValues}
          onKeyDown={handleEnter}
        >
          <Form.Item
            name="fullName"
            label="שם מלא"
            rules={GET_BASIC_TEXT_RULES()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="personalId"
            label="מ.א"
            rules={GET_PERSONAL_ID_RULES(doesPersonExist)}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="פלאפון"
            rules={GET_PHONE_NUMBER_RULES()}
          >
            <Input />
          </Form.Item>
          <Form.Item name="team" label="צוות">
            <AutoComplete
              onKeyDown={event => {
                event.stopPropagation();
              }}
              options={possibleTeams.map(team => ({ value: team }))}
            />
          </Form.Item>
          <Form.Item name="status" label="מצב שירות">
            <Radio.Group>
              {settings.possibleStatuses.map(status => (
                <Radio key={status} value={status}>
                  {status}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="availability" label="זמינות">
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
      </Modal>
    </>
  );
};

export default AddPersonModal;
