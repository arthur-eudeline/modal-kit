import {Modal} from "./modal";
import {ModalEvents} from "../types";


/**
 * A modal dedicated DOM event that will be triggered on specific modal actions
 */
export class ModalEvent extends Event {
  
  /**
   * The modal bound to the event
   */
  public modal: Modal;
  
  
  /**
   * @param type
   * @param modal
   */
  public constructor (type: ModalEvents, modal:Modal) {
    super(type);
    this.modal = modal;
  }
  
  
}