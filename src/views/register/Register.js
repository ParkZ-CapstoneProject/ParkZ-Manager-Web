// import * as React from "react";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

// const steps = [
//   "Select campaign settings",
//   "Create an ad group",
//   "Create an ad",
// ];

// export default function StepRegister() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//           if (isStepOptional(index)) {
//             labelProps.optional = (
//               <Typography variant="caption">Optional</Typography>
//             );
//           }
//           if (isStepSkipped(index)) {
//             stepProps.completed = false;
//           }
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       {activeStep === steps.length ? (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//             <Box sx={{ flex: "1 1 auto" }} />
//             <Button onClick={handleReset}>Reset</Button>
//           </Box>
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//           <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Box sx={{ flex: "1 1 auto" }} />
//             {isStepOptional(activeStep) && (
//               <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                 Skip
//               </Button>
//             )}

//             <Button onClick={handleNext}>
//               {activeStep === steps.length - 1 ? "Finish" : "Next"}
//             </Button>
//           </Box>
//         </React.Fragment>
//       )}
//     </Box>
//   );
// }

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfor from "ui-component/register-step/step2/PersonalInfor";
import AccountInfor from "ui-component/register-step/step1/AccountInfor";
import BusinessInfor from "ui-component/register-step/step3/BusinessInfor";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import { multiStepContext } from "context/StepContext";

const StepRegister = () => {
  // const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.multiStep.currentStep);
  // const userData = useSelector(state => state.multiStep.userData);
  // const finalData = useSelector(state => state.multiStep.finalData);

  function showStep(step) {
    switch (step) {
      case 1:
        return <AccountInfor />;
      case 2:
        return <PersonalInfor />;
      case 3:
        return <BusinessInfor />;
      default:
        return;
    }
  }
  return (
    <>
      <Stepper
        style={{ width: "18%", marginLeft: "40%" }}
        activeStep={currentStep - 1}
        orientation="horizontal"
      >
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
      </Stepper>
      {showStep(currentStep)}
    </>
  );
};

export default StepRegister;
