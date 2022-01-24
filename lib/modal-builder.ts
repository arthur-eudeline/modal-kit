import {ModalClasses, ModalElement, ModalElements, ModalSettings} from "../types";
import {Modal} from "./modal";


/**
 * An utility class in charge of building
 * modal HTML elements
 */
export class ModalBuilder {
  
  /**
   * The modal settings used for building the modal
   * @private
   */
  private readonly settings:ModalSettings;
  
  /**
   * Stores the modal instance bound to the builder
   * @private
   */
  private readonly modal:Modal;
  
  /**
   * The base classes that will be applied to each modal element
   */
  static readonly classes: Required<ModalClasses> = {
    container: [ 'modal-container' ],
    overlay: [ 'modal-overlay' ],
    modal: [ 'modal' ],
    title: [ 'modal-title' ],
    body: [ 'modal-body' ],
    actions: [ 'modal-actions' ],
    dismissBtn: {
      container: [ 'modal-dismiss-btn-container' ],
      btn: [ 'modal-dismiss-btn' ],
    },
    variations: {
      dismissible: [ 'modal-dismissible' ]
    }
  }
  
  
  /**
   * The builder constructor
   * @param modal
   */
  public constructor (modal:Modal) {
    this.modal = modal;
    this.settings = modal.getSettings();
  }
  
  
  /**
   * Simplify the handling of modal elements
   *
   * @param el
   * @param modalElements
   * @private
   */
  private handleModalElement(el:HTMLElement, modalElements?: ModalElement|ModalElement[]) : void {
    if (modalElements === undefined)
      return;
    
    // Convert to array if it is single
    if (!Array.isArray(modalElements))
      modalElements = [ modalElements ];
    
    // Loop over the elements
    for (let modalElement of modalElements) {
      // Execute callback if modalElement is a function
      if (typeof modalElement === 'function')
        modalElement = modalElement(this.modal);
  
      // Handle string case
      if (typeof modalElement === 'string') {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = modalElement;
        
        // If the string contains some html elements
        if (tempEl.firstElementChild) {
          modalElement = tempEl.firstElementChild as HTMLElement;
        }
        // If the string does not have HTML elements, we just append a default HTML element
        else {
          modalElement = tempEl;
        }
      }
  
      // Handle HTMLElement
      if (modalElement instanceof HTMLElement)
        el.appendChild(modalElement);
    }
  }
  
  
  /**
   * Builds the modal container, which is the very root element of the modal
   * @private
   */
  private buildContainer(elements:Partial<ModalElements>) : HTMLDivElement {
    const el = document.createElement('div');
    
    // Sets the ID
    el.id = this.settings.id!;
    
    // Add the classes
    el.classList.add( ...ModalBuilder.classes.container!, ...(this.settings.classes?.container ?? []) );
    
    // Add variations classes to the root element
    if (this.settings.dismissible)
      el.classList.add( ...ModalBuilder.classes.variations.dismissible, ...(this.settings.classes?.variations?.dismissible ?? []) );
    
    // Add an html attribute to define the root element
    el.setAttribute( 'data-modal-root', '' );
    
    // Assign the root to the elements object
    elements.root = el;
    
    return el;
  }
  
  
  /**
   * Builds the modal overlay element
   * @private
   */
  private buildOverlay (elements:Partial<ModalElements>) : HTMLDivElement {
    const el = document.createElement('div');
    
    el.classList.add( ...ModalBuilder.classes.overlay, ...(this.settings.classes?.overlay ?? []) );
  
    // Add overlay's onclick event
    if (this.settings.dismissible && (this.settings.overlay === true || (typeof this.settings.overlay === "object" && this.settings.overlay.dismissible) ))
      el.onclick = (_) => { this.modal.dismiss(); }
    
    elements.overlay = el;
    
    return el;
  }
  
  
  /**
   * Builds the modal main element which contains the title, body and actions
   * @private
   */
  private buildModal(elements: Partial<ModalElements>) : HTMLDivElement {
    // Builds the modal element
    const el = document.createElement('div');
    el.classList.add( ...ModalBuilder.classes.modal, ...(this.settings.classes?.modal ?? []) );
    
    // Adds the dismiss button
    if (this.settings.dismissible)
      el.appendChild( this.buildDismissBtn(elements) );
    
    // Adds the title element
    if (this.settings.title)
      el.appendChild( this.buildTitle(elements) );
    
    // Adds the body
    el.appendChild( this.buildBody(elements) );
    
    // Adds the actions
    if (this.settings.actions !== undefined && this.settings.actions.length > 0)
      el.appendChild( this.buildActions(elements) );
    
    elements.container = el;
    
    return el;
  }
  
  
  /**
   * Builds the dismiss button element
   * @private
   */
  private buildDismissBtn(elements: Partial<ModalElements>): HTMLDivElement {
    // Builds the button container
    const container = document.createElement('div');
    container.classList.add( ...ModalBuilder.classes.dismissBtn.container!, ...(this.settings.classes?.dismissBtn?.container ?? []) );
    
    // Builds the btn
    const btn = document.createElement('i');
    btn.classList.add( ...ModalBuilder.classes.dismissBtn.btn!, ...(this.settings.classes?.dismissBtn?.btn ?? []) );
    
    if (this.settings.dismissible === true)
      btn.onclick = (_) => { this.modal.dismiss(); }
    
    container.appendChild(btn);
    
    elements.dismissButton = {
      container: container,
      btn: btn,
    };
    
    return container;
  }
  
  
  /**
   * Builds the title element
   * @private
   */
  private buildTitle(elements: Partial<ModalElements>): HTMLDivElement {
    const el = document.createElement('div');
    el.classList.add( ...ModalBuilder.classes.title, ...(this.settings.classes?.title ?? []) );
    this.handleModalElement(el,this.settings.title);
    
    elements.title = el;
    
    return el;
  }
  
  
  /**
   * Builds the modal body element
   * @private
   */
  private buildBody(elements: Partial<ModalElements>): HTMLDivElement {
    const el = document.createElement('div');
    el.classList.add( ...ModalBuilder.classes.body, ...(this.settings.classes?.body ?? []) );
    this.handleModalElement(el, this.settings.body);
    
    elements.body = el;
    
    return el;
  }
  
  
  /**
   * Builds the modal actions element
   * @private
   */
  private buildActions(elements: Partial<ModalElements>): HTMLDivElement {
    const el = document.createElement('div');
    el.classList.add( ...ModalBuilder.classes.actions, ...(this.settings.classes?.actions ?? []) );
    this.handleModalElement(el, this.settings.actions);
    
    elements.actions = el;
    
    return el;
  }
  
  
  /**
   * Builds the modal element
   */
  public build() : ModalElements {
    const elements:Partial<ModalElements> = {};
    
    // Gets the modal container element
    const container = this.buildContainer(elements);
    
    // Adds the overlay
    if (this.settings.overlay)
      container.appendChild( this.buildOverlay(elements) );
    
    // Adds the modal
    container.appendChild( this.buildModal(elements) );
    
    return elements as ModalElements;
  }
  
}