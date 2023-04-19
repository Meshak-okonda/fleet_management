import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { GetVehicles } from "../../utils";
import ModifyFormControl from './ModifyFormControl';
import { GET_ONE_DAY_CONTROL_VEHICLE } from '../../graphql/queries';

export default function ModifyControl() {
	const [idVehicle, setIdVehicle] = useState(null);
	const [date, setDate] = useState(null);

	return (
    <>
      <div className="d-flex justify-content-between align-content-center m-1">
        <h2 className="title m-3">Modification du Contrôle</h2>
        <div className="p-field m-3 text-right">
          <Dropdown
            value={idVehicle}
            className="mb-1"
            options={GetVehicles()}
            onChange={({ value }) => setIdVehicle(value)}
            placeholder="Véhicule"
            style={{ marginRight: 5 }}
          />
          {idVehicle && (
            <Calendar
              value={date}
              dateFormat="dd/mm/yy"
              maxDate={new Date()}
              className="mb-1"
              onChange={({ value }) => {
                const date = new Date(value);
                date.setDate(date.getDate() + 1);
                const dateNow = date
                  .toISOString()
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/");
                setDate(dateNow);
              }}
              showIcon
              disabled={!idVehicle}
              style={{ marginRight: 5 }}
              placeholder="Date de verification"
            ></Calendar>
          )}
        </div>
      </div>
      <hr />
      <div className="p-fluid p-formgrid p-col-12">
        {idVehicle && date && (
          <ModifyFormControl
            query={GET_ONE_DAY_CONTROL_VEHICLE(idVehicle, date)}
            idVehicle={idVehicle}
            date={date}
            setIdVehicle={setIdVehicle}
            setDate={setDate}
          />
        )}
      </div>
    </>
  );
}
