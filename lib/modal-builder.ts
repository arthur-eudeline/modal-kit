import {ModalClasses, ModalSettings} from "../types";
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
   * Builds the modal container, which is the very root element of the modal
   * @private
   */
  private buildContainer() : HTMLDivElement {
    const el = document.createElement('div');
    
    // Add the classes
    el.classList.add( ...ModalBuilder.classes.container!, ...(this.settings.classes?.container ?? []) );
    
    // Add variations classes to the root element
    if (this.settings.dismissible)
      el.classList.add( ...ModalBuilder.classes.variations.dismissible );
    
    // Add an html attribute to define the root element
    el.setAttribute( 'data-modal-root', '' );
    
    return el;
  }
  
  
  /**
   * Builds the modal overlay element
   * @private
   */
  private buildOverlay () : HTMLDivElement {
    const el = document.createElement('div');
    
    el.classList.add( ...ModalBuilder.classes.overlay, ...(this.settings.classes?.overlay ?? []) );
  
    // Add overlay's onclick event
    if (this.settings.dismissible && (this.settings.overlay === true || (typeof this.settings.overlay === "object" && this.settings.overlay.dismissible) ))
      el.onclick = (e) => { this.modal.dismiss(); }
    
    return el;
  }
  
  
  /**
   * Builds the modal main element which contains the title, body and actions
   * @private
   */
  private buildModal() : HTMLDivElement {
    // Builds the modal element
    const el = document.createElement('div');
    el.classList.add( ...ModalBuilder.classes.modal, ...(this.settings.classes?.modal ?? []) );
    
    // Adds the dismiss button
    if (this.settings.dismissible)
      el.appendChild( this.buildDismissBtn() );
    
    // Adds the title element
    if (this.settings.title)
      el.appendChild( this.buildTitle() );
    
    // Adds the body
    el.appendChild( this.buildBody() );
    
    // Adds the actions
    if (this.settings.actions !== undefined && this.settings.actions.length > 0)
      el.appendChild( this.buildActions() );
    
    return el;
  }
  
  
  /**
   * Builds the dismiss button element
   * @private
   */
  private buildDismissBtn(): HTMLDivElement {
    // Builds the button container
    const container = document.createElement('div');
    container.classList.add( ...ModalBuilder.classes.dismissBtn.container!, ...(this.settings.classes?.dismissBtn?.container ?? []) );
    
    // Builds the btn
    const btn = document.createElement('i');
    btn.classList.add( ...ModalBuilder.classes.dismissBtn.btn!, ...(this.settings.classes?.dismissBtn?.btn ?? []) );
    
    if (this.settings.dismissible === true)
      btn.onclick = (e) => { this.modal.dismiss(); }
    
    container.appendChild(btn);
    
    return container;
  }
  
  
  /**
   * Builds the title element
   * @private
   */
  private buildTitle(): HTMLDivElement {
    const el = document.createElement('div');
    el.classList.add( ...ModalBuilder.classes.title, ...(this.settings.classes?.title ?? []) );
    el.innerHTML = this.settings.title ?? '';
    
    return el;
  }
  
  
  /**
   * Builds the modal body element
   * @private
   */
  private buildBody(): HTMLDivElement {
    const el = document.createElement('div');
    el.classList.add( ...ModalBuilder.classes.body, ...(this.settings.classes?.body ?? []) );
    el.innerHTML = this.settings.body;
    
    return el;
  }
  
  
  /**
   * Builds the modal actions element
   * @private
   */
  private buildActions(): HTMLDivElement {
    const el = document.createElement('div');
    el.classList.add( ...ModalBuilder.classes.actions, ...(this.settings.classes?.actions ?? []) );
    
    el.innerHTML = (this.settings.actions?.map( (action) => typeof action === 'string'
      ? action
      : action.outerHTML
    ) ?? [ '' ]).join('');
    
    return el;
  }
  
  
  /**
   * Builds the modal element
   */
  public build() : HTMLElement {
    // Gets the modal container element
    const container = this.buildContainer();
    
    // Adds the overlay
    if (this.settings.overlay)
      container.appendChild( this.buildOverlay() );
    
    // Adds the modal
    container.appendChild( this.buildModal() );
    
    return container;
  }
  
}