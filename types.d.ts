import {Modal, ModalKit} from "./lib";


declare global {
  interface Window {
    modalKit: typeof ModalKit
  }
  
  const modalKit:typeof ModalKit
}

/**
 * Defines what can be used for building a modal element
 */
type ModalElement = HTMLElement | string | ((modal:Modal) => string | HTMLElement);

/**
 * Defines the modal settings structure
 */
declare interface ModalSettings {
  /**
   * Whether or not a modal will be dismissible by the user.
   * If set to true, the modal will include a button to dismiss it by default.
   * However, you can still dismiss a non dismissible modal by calling directly
   * `Modal.dismiss()`.
   *
   * @default true
   */
  dismissible?: boolean,
  
  /**
   * Defines if the modal will include an overlay or not and its settings
   * If set to true, overlay will include the default settings.
   * If set to an object, overlay will inherit this settings
   * If set to false, Modal won't include any overlay
   *
   * @default true
   */
  overlay?: {
    /**
     * Defines if the overlay will dismiss the modal when clicked on it
     *
     * @default true
     */
    dismissible: boolean,
  } | boolean,
  
  /**
   * A text that will be displayed above the modal body
   * HTML code is supported
   */
  title?: string | ModalElement,
  
  /**
   * The text that will be displayed inside the modal.
   * HTML code is supported.
   */
  body: string | ModalElement,
  
  /**
   * A set of HTML Elements that will be displayed bellow
   * the modal body
   *
   */
  actions?: ModalElement[],
  
  /**
   * Defines the additional classes to add
   * to the modal elements
   */
  classes?: ModalClasses
}

/**
 * Defines different possible values for modal events
 */
declare type ModalEvents = 'modal-initialized' | 'modal-shown' | 'modal-dismissed' | 'modal-destroyed';

/**
 * Holds the different classes that will be applied on each modal part
 */
declare interface ModalClasses {
  /**
   * Additional classes applied to the modal container
   * which is the very root of the modal
   */
  container?: string[],
  
  /**
   * Additional classes applied to the modal overlay element
   */
  overlay?: string[],
  
  /**
   * Additional classes applied to the modal element
   * which wraps the modal content (dismiss button, title, body, actions)
   */
  modal?: string[],
  
  /**
   * Additional classes applied to the modal title wrapper
   */
  title?: string[],
  
  /**
   * Additional classes applied to the modal body wrapper
   */
  body?: string[],
  
  /**
   * Additional classes applied to the modal actions wrapper
   */
  actions?: string[],
  
  /**
   * Additional classes applied to the modal dismiss button
   */
  dismissBtn?: {
    /**
     * Additional classes that will be applied to the dismiss button container
     */
    container?: string[],
    
    /**
     * Additional classes that will be applied to the dismiss button
     */
    btn?: string[],
  },
  
  /**
   * The CSS classes that will be applied to the modal's root according to its variation
   * eg: dismissible, transparent, ...
   */
  variations?: {
    /**
     * The CSS classes that will be applied to the modal's root if it is dismissible
     */
    dismissible: string[],
  }
}

/**
 * The different classes that will be applied on modal's elements
 * according to its state
 */
declare interface ModalStateClasses {
  /**
   * A list of CSS classes applied to the modal root
   * when it is hidden
   *
   * @default [ 'hidden' ]
   */
  hidden: string[],
  
  /**
   * A list of CSS classes applied to the modal root
   * when it is visible
   *
   * @default []
   */
  visible: string[],
}
