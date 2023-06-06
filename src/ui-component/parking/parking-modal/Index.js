import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import ParkingModal from "./ParkingModal";
import { useDispatch } from "react-redux";
import { initializeFloors } from "store/parkingModalSlice";
import { saveState } from "utils/localStorageParkingModal";

const ParkingModalInFloor = () => {
  const [currentFloor, setCurrentFloor] = useState(0);

  const dispatch = useDispatch();
  const [floors, setFloors] = useState(() => {
    const storedState = localStorage.getItem("floorsState");
    if (storedState) {
      return JSON.parse(storedState);
    } else {
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
    }
  });

  useEffect(() => {
    saveState(floors);
  }, [floors]);

  const handleTabChange = (event, newValue) => {
    event.preventDefault();

    setCurrentFloor(newValue);
  };

  return (
    <div>
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
      <ParkingModal floorIndex={currentFloor} />
    </div>
  );
};

export default ParkingModalInFloor;
