import {Modal, ModalKit} from "./lib";


export declare global {
  interface Window {
    modalKit: typeof ModalKit
  }

  const modalKit:typeof ModalKit
}

/**
 * Defines what can be used for building a modal element
 */
export declare type ModalElement = HTMLElement | string | ((modal:Modal) => string | HTMLElement);

/**
 * Defines the modal settings structure
 */
export declare interface ModalSettings {
  /**
   * An HTML ID that will be assign to the modal root.
   * If not provided, it will be generated
   */
  id?:string
  
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
export declare type ModalEvents = 'modal-initialized' | 'modal-shown' | 'modal-dismissed' | 'modal-destroyed';

/**
 * Holds the different classes that will be applied on each modal part
 */
export declare interface ModalClasses {
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
export declare interface ModalStateClasses {
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

/**
 * Holds the HTML Elements that's part of the modal
 */
export declare interface ModalElements {
  /**
   * The modal root element directly holds overlay and the container element
   */
  root: HTMLDivElement,
  
  /**
   * The overlay DIV element
   */
  overlay?:HTMLDivElement,
  
  /**
   * The dismiss button of the modal if it has one
   */
  dismissButton?: {
    /**
     * The button container element
     */
    container:HTMLDivElement,
  
    /**
     * The button element
     */
    btn:HTMLElement,
  },
  
  /**
   * The modal container element which holds the title, body and actions
   */
  container:HTMLDivElement,
  
  /**
   * The modal title element
   */
  title?:HTMLDivElement,
  
  /**
   * The modal body element
   */
  body:HTMLDivElement,
  
  /**
   * The modal actions root element
   */
  actions?:HTMLElement,
}