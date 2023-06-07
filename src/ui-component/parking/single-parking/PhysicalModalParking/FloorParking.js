import { Grid, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeFloors } from "store/parkingModalSlice";
import { saveState } from "utils/localStorageParkingModal";
import SinglePhysicalModal from "./SinglePhysicalModal";
import EditButton from "ui-component/buttons/edit-button/EditButton";
import SaveButton from "ui-component/buttons/save-button/SaveButton";

const FloorParking = () => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const [floors, setFloors] = useState(() => {
    const initialState = [
      {
        floor: 1,
        numCarSlots: 10,
        numMotorbikeSlots: 5,
        numMotorbikeRows: 1,
        numMotorbikeColumns: 6,
        numCarRows: 2,
        numCarColumns: 6,
        carSlots: [],
        motorbikeSlots: [],
      },
      {
        floor: 2,
        numCarSlots: 15,
        numMotorbikeSlots: 8,
        numMotorbikeRows: 2,
        numMotorbikeColumns: 6,
        numCarRows: 3,
        numCarColumns: 6,
        carSlots: [],
        motorbikeSlots: [],
      },
      {
        floor: 3,
        numCarSlots: 20,
        numMotorbikeSlots: 10,
        numMotorbikeRows: 2,
        numMotorbikeColumns: 6,
        numCarRows: 3,
        numCarColumns: 7,
        carSlots: [],
        motorbikeSlots: [],
      },
    ];
    dispatch(initializeFloors(initialState));
    return initialState;
  });

  useEffect(() => {
    saveState(floors);
  }, [floors]);

  const handleTabChange = (event, newValue) => {
    event.preventDefault();

    setCurrentFloor(newValue);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    setEdit(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    setEdit(false);
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginTop: "25px" }}
      >
        <EditButton onClick={handleEdit} />
      </Grid>
      <Tabs
        value={currentFloor}
        onChange={handleTabChange}
        variant="fullWidth"
        aria-label="Parking Floors"
      >
        {floors.map((floor, index) => (
          <Tab key={index} label={`Tầng ${floor.floor}`} />
        ))}
      </Tabs>
      <SinglePhysicalModal floorIndex={currentFloor} edit={edit} />
      {edit && (
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ marginTop: "25px" }}
        >
          <SaveButton onClick={handleSave} />
        </Grid>
      )}
    </div>
  );
};

export default FloorParking;
