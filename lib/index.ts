// noinspection JSUnusedGlobalSymbols

import { Modal } from "./modal";
import {ModalStateClasses} from "../types";


/**
 * The library object
 */
const ModalKit = {
  /**
   * The default modal constructor
   */
  modal: Modal,
  
  /**
   * Exposes the different methods to modify the library defaults
   */
  defaults: {
    /**
     * Changes the defaults modal states classes.
     * States classes are applied to the modal root depending on its state (hidden, visible, ...)
     * @param classes
     */
    setStateClasses: (classes: Partial<ModalStateClasses>) => {
      Modal.stateClasses = {...Modal.stateClasses, ...classes};
    }
  }
};

export default ModalKit;
export {
  Modal
}