import React, { useState, useContext, KeyboardEvent } from "react";
import AddButton from "../actions/AddButton";
import { Modal, Form, Input, Radio, Checkbox, message } from "antd";
import {
  PERSON_STATUSES,
  AVAILABILITY,
  PERSON_PREFERENCES,
  SUBJECTS,
  MEGAMUT,
  MEGAMUT_TO_COLOR,
  PREFERENCE_TO_COLOR
} from "../../consts";
import TextArea from "antd/lib/input/TextArea";
import TagList from "../tags/TagList";
import { PeopleContext } from "../../contexts/PeopleContext";
import _ from "lodash";
import { MIN_PHONE_LENGTH } from "../validators/consts";
import { onlyHebrewCharacters } from "../validators/validators";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

const initialValues = {
  fullName: "",
  personId: "",
  phone: "",
  status: PERSON_STATUSES[0],
  team: "",
  preferences: [],
  megamut: [],
  subjects: [],
  availability: AVAILABILITY[0],
  wasSegel: false,
  remarks: ""
};

const AddPersonModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { addPerson, doesPersonExist } = useContext(PeopleContext);

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
          name="form_in_modal"
          initialValues={initialValues}
          onKeyDown={handleEnter}
        >
          <Form.Item
            name="fullName"
            label="שם מלא"
            rules={[
              { required: true, message: "בבקשה הכנס שם מלא" },
              {
                validator(rule, value) {
                  if (onlyHebrewCharacters(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "השם חייב להכין רק תווים בעברית או רווח"
                    );
                  }
                }
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="personalId"
            label="מ.א"
            rules={[
              { required: true, message: "בבקשה הכנס מספר אישי" },
              {
                validator(rule, value) {
                  if (!doesPersonExist(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("כבר יש איש חוץ עם המספר אישי הזה");
                  }
                }
              },
              {
                message: "המספר אישי חייב להכיל רק מספרים",
                transform: value => _.toNumber(value),
                type: "number"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="פלאפון"
            rules={[
              {
                required: true,
                message: "בבקשה הכנס מספר פלאפון"
              },
              {
                message: "המספר פלאפון חייב להכיל רק מספרים",
                transform: value => _.toNumber(value),
                type: "number"
              },
              {
                message: `המספר פלאפון חייב להכין לפחות ${MIN_PHONE_LENGTH} תוים`,
                min: MIN_PHONE_LENGTH
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="team" label="צוות">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="מצב שירות">
            <Radio.Group>
              {PERSON_STATUSES.map(status => (
                <Radio key={status} value={status}>
                  {status}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="availability" label="זמינות">
            <Radio.Group>
              {AVAILABILITY.map(availability => (
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
              possibleTags={PERSON_PREFERENCES}
              colors={PREFERENCE_TO_COLOR}
              additionText="הוספת העדפה"
            />
          </Form.Item>
          <Form.Item name="megamut" label="מגמות" valuePropName="tags">
            <TagList
              possibleTags={MEGAMUT}
              colors={MEGAMUT_TO_COLOR}
              additionText="הוספת מגמה"
            />
          </Form.Item>
          <Form.Item name="subjects" label="מערכים" valuePropName="tags">
            <TagList possibleTags={SUBJECTS} additionText="הוספת מערך" />
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
