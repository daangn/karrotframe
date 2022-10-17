import { Modal } from "@stackflow/basic-ui";
import React from "react";

import { useFlow } from "../stackflow";
import * as css from "./TestModal.css";

const TestModal: React.FC = () => {
  const { push } = useFlow();

  return (
    <Modal>
      <div className={css.container}>
        Testing Modal UI with Stackflow
        <button
          type="button"
          onClick={() => {
            push("Main", {});
          }}
        >
          test
        </button>
      </div>
    </Modal>
  );
};

export default TestModal;
