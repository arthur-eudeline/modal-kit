// noinspection JSUnusedGlobalSymbols

import { Modal } from "./modal";
import { ModalStateClasses } from "../types";


/**
 * The library object
 */
export default class ModalKit {
  /**
   * The default modal constructor
   */
  static modal = Modal;
  
  /**
   * Exposes the different methods to modify the library defaults
   */
  static defaults = {
    /**
     * Changes the defaults modal states classes.
     * States classes are applied to the modal root depending on its state (hidden, visible, ...)
     * @param classes
     */
    setStateClasses: (classes: Partial<ModalStateClasses>) => {
      Modal.stateClasses = {...Modal.stateClasses, ...classes};
    }
  }
}

window.modalKit = ModalKit;