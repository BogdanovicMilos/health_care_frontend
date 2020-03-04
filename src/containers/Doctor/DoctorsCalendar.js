import React, { Component } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda
} from "@syncfusion/ej2-react-schedule";

export class DoctorsCalendar extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Nav />
        <ScheduleComponent
          currentView="Month"
          selectedDate={new Date()}
          style={{ marginTop: "50px" }}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    );
  }
}

export default DoctorsCalendar;
