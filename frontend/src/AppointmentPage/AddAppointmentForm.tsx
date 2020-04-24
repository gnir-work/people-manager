import React, { KeyboardEvent } from "react";
import { Form, Input, Radio, Checkbox, AutoComplete, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { GET_REQUIRED_RULE } from "../components/validators/validators";
import { FormInstance } from "antd/lib/form";
import { SiteSettingsContextInterface } from "../contexts/SiteSettingsContext";
import PersonAutoComplete from "../components/fields/PersonAutoComplete/PersonAutoComplete";
import DateRangeField from "../components/fields/DateRangeField";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 19 }
};

const initialValues = {
  person: null,
  makishur: false,
  week: 1
};

interface AddAppointmentFormProps {
  form: FormInstance;
  onEnter: (event: KeyboardEvent<HTMLFormElement>) => void;
  settings: SiteSettingsContextInterface["settings"];
  currentUser: string;
}

const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({
  form,
  onEnter,
  settings,
  currentUser
}) => {
  const dynamicInitialValues = {
    ...initialValues,
    phase: settings.currentPhase,
    bedStatus: settings.possibleBedStatus[0],
    entryStatus: settings.possibleEntryStates[0],
    course: settings.currentCourse,
    invitor: currentUser
  };

  return (
    <Form
      {...layout}
      size="small"
      form={form}
      name="add_person_form"
      initialValues={dynamicInitialValues}
      onKeyDown={onEnter}
    >
      <Form.Item
        name="person"
        rules={[GET_REQUIRED_RULE("בבקשה תבחר איש חוץ")]}
        label="איש חוץ:"
      >
        <PersonAutoComplete />
      </Form.Item>
      <Form.Item
        name="course"
        label="מחזור: "
        rules={[GET_REQUIRED_RULE("בבקשה תבחר קורס")]}
      >
        <Radio.Group>
          {settings.possibleCourses.map(phase => (
            <Radio key={phase} value={phase}>
              {phase}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="phase"
        label="תקופה: "
        rules={[GET_REQUIRED_RULE("בבקשה תבחר תקופה")]}
      >
        <Radio.Group>
          {settings.possiblePhases.map(phase => (
            <Radio key={phase} value={phase}>
              {phase}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="week"
        label="שבוע בקורס: "
        rules={[GET_REQUIRED_RULE("בבקשה תבחר שבוע")]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        name="dates"
        label="תאריכים:"
        valuePropName="dates"
        rules={[GET_REQUIRED_RULE("בבקש הכנס תאריכים")]}
      >
        <DateRangeField />
      </Form.Item>
      <Form.Item
        name="invitor"
        label="מזמין: "
        rules={[GET_REQUIRED_RULE("בבקשה תכניס שם מזמין")]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="bedStatus"
        label="מיטה: "
        rules={[GET_REQUIRED_RULE("האם האיש חוץ צריך מיטה?")]}
      >
        <Radio.Group>
          {settings.possibleBedStatus.map(bedStatus => (
            <Radio key={bedStatus} value={bedStatus}>
              {bedStatus}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="entryStatus"
        label="אישור כניסה: "
        rules={[GET_REQUIRED_RULE("האם יש לו אישור כניסה?")]}
      >
        <Radio.Group>
          {settings.possibleEntryStates.map(entryState => (
            <Radio key={entryState} value={entryState}>
              {entryState}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="makishur"
        label="הוזמן במה קישור:"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item name="makishurInvitor" label="מזמין מה קישור: ">
        <Input />
      </Form.Item>
      <Form.Item
        name="track"
        label="מסלול רלוונטי: "
        rules={[GET_REQUIRED_RULE("בבקשה תבחר מסלול")]}
      >
        <AutoComplete
          onKeyDown={event => {
            event.stopPropagation();
          }}
          options={settings.possibleTracks.map(track => ({ value: track }))}
        />
      </Form.Item>
      <Form.Item
        name="reason"
        label="מדוע זומן: "
        rules={[GET_REQUIRED_RULE("בבקשה תבחר את סיבת הזימון")]}
      >
        <AutoComplete
          onKeyDown={event => {
            event.stopPropagation();
          }}
          options={settings.possibleAppointmentReasons.map(reason => ({
            value: reason
          }))}
        />
      </Form.Item>
      <Form.Item name="remarks" label="הערות נוספות">
        <TextArea
          onKeyDown={event => {
            event.stopPropagation();
          }}
        />
      </Form.Item>
    </Form>
  );
};
export default AddAppointmentForm;
