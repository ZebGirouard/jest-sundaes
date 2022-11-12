import { useState } from "react";
import { Form, Button, OverlayTrigger, Popover } from "react-bootstrap";

export const SummaryForm = ({ setOrderPhase }) => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    setDisabled(checked);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setOrderPhase("complete");
      }}
    >
      <Form.Group>
        <Form.Check
          type="checkbox"
          name="termsAndConditions"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <OverlayTrigger
          placement="right"
          overlay={
            <Popover>
              <Popover.Body>
                No ice cream will actually be delivered
              </Popover.Body>
            </Popover>
          }
        >
          <span>I agree to the terms and conditions</span>
        </OverlayTrigger>
      </Form.Group>
      <Button type="submit" disabled={disabled}>
        Confirm order
      </Button>
    </Form>
  );
};
