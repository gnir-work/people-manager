import React, { createContext, useEffect, useState } from "react";
import {
  updateAppointmentRequest,
  deleteAppointmentRequest,
  createAppointmentRequest,
  getAppointments
} from "../api/appointment";
import _ from "lodash";
import { message } from "antd";
import { EDIT_SUCCESS_MESSAGE, EDIT_ERROR_MESSAGE } from "../consts";
import { AxiosError } from "axios";
import { Appointment } from "../types/appointment";

export interface AppointmentsContextInterface {
  appointments: Appointment[];
  deleteAppointment: (appointmentToDelete: Appointment) => void;
  getFieldDataSet: (field: keyof Appointment) => any[];
  updateAppointment: <K extends keyof Appointment>(
    appointmentToUpdate: Appointment,
    field: K,
    value: Appointment[K]
  ) => void;
  addAppointment: (newAppointment: Appointment) => void;
  doesAppointmentExist: (appointmentId: string) => boolean;
}

const defaultData: AppointmentsContextInterface = {
  appointments: [],
  deleteAppointment: (appointmentToDelete: Appointment) => {},
  getFieldDataSet: (field: keyof Appointment) => [],
  updateAppointment: (newAppointment: Appointment) => {},
  addAppointment: (newAppointment: Appointment) => {},
  doesAppointmentExist: (appointmentId: string) => false
};

export const AppointmentContext = createContext(defaultData);

/**
 * A context which handles all of the manipulation on the appointment dataset.
 * From fetching the data set to deleting or adding appointment.
 */
export const AppointmentContextProvider: React.FC = ({ children }) => {
  const [appointments, setAppointments]: [Appointment[], Function] = useState(
    []
  );

  useEffect(() => {
    getAppointments().then(newAppointments => {
      setAppointments(newAppointments);
    });
  }, []);

  /**
   * Check if we already have a appointment with this id.
   * @param appointmentId The id of the appointment.
   */
  const doesAppointmentExist = (appointmentId: string) =>
    !!_.find(appointments, ["id", appointmentId]);

  /**
   * Deletes a specific appointment identified by id.
   *
   * @param appointmentToDelete The appointment to delete from the dataset.
   * @returns a boolean indicating the success of the operation.
   */
  const deleteAppointment = (appointmentToDelete: Appointment) => {
    deleteAppointmentRequest(appointmentToDelete.id)
      .then(response => {
        const filteredAppointment = appointments.filter(
          appointment => appointment.id !== appointmentToDelete.id
        );
        setAppointments(filteredAppointment);
        message.success(`${appointmentToDelete.person.fullName} נמחק בהצלחה!`);
      })
      .catch(() => {
        message.error(
          `לא ניתן למחוק את ${appointmentToDelete.person.fullName}`
        );
      });
  };

  /**
   * Retrieves all of the unique values of a given field.
   * @param field The field from which the data set should be built
   */
  const getFieldDataSet = (field: keyof Appointment) => {
    const fields = appointments.map(
      (appointment: Appointment) => appointment[field]
    );
    return _.uniq(fields);
  };

  /**
   * Update a specific appointment.
   */
  function updateAppointment<K extends keyof Appointment>(
    appointmentToUpdate: Appointment,
    field: K,
    value: Appointment[K]
  ) {
    updateAppointmentRequest(appointmentToUpdate.id, field, value)
      .then(response => {
        const newAppointment = new Appointment({
          ...appointmentToUpdate,
          [field]: value
        });
        const newAppointments = [
          ...appointments.map(appointment =>
            appointment.id === appointmentToUpdate.id
              ? newAppointment
              : appointment
          )
        ];
        setAppointments(newAppointments);
        message.success(EDIT_SUCCESS_MESSAGE);
      })
      .catch(error => {
        message.error(EDIT_ERROR_MESSAGE);
      });
  }

  /**
   * Create new Appointment
   */
  const addAppointment = (newAppointment: Appointment) => {
    const newAppointmentInstance = new Appointment(newAppointment);
    createAppointmentRequest(newAppointmentInstance)
      .then(response => {
        setAppointments([...appointments, newAppointmentInstance]);
        message.success(
          `הזימון של ${newAppointment.person.fullName} נוצר בהצלחה`
        );
      })
      .catch((error: AxiosError) => {
        if (error && error.response && error.response.status === 409) {
          message.error(
            `יש כבר איש חוץ עם המ.א ${newAppointmentInstance.person.personalId}`
          );
        } else {
          message.error("איש חוץ לא נוסף, היית שגיאה.");
        }
      });
  };

  return (
    <AppointmentContext.Provider
      value={{
        doesAppointmentExist,
        addAppointment,
        appointments: appointments,
        deleteAppointment,
        getFieldDataSet,
        updateAppointment
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
