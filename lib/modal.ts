import {ModalSettings, ModalStateClasses} from "../types";
import {ModalBuilder} from "./modal-builder";
import {isClassListEmpty} from "./utils";


/**
 * The default modal class utility
 */
export class Modal {
  
  /**
   * Defines the default settings for the modals
   * @private
   */
  private static readonly defaultSettings:Partial<ModalSettings> = {
    dismissible: true,
    overlay: true,
  }
  
  /**
   * Defines the CSS classes that will be applied to the modal root depending
   * of the modal state.
   *
   * To modify them, use `window.modalKit.defaults.setStateClasses()`
   * @see window.modalKit.defaults.setStateClasses()
   */
  static stateClasses:ModalStateClasses = {
    hidden: ['hidden'],
    visible: [],
  }
  
  /**
   * Holds the modal settings object
   * @private
   */
  private readonly settings:ModalSettings;
  
  /**
   * Holds the modal element built by the builder at modal initialization
   * @private
   */
  private modalEl?:HTMLElement;
  
  /**
   * Indicates if the modal has been added to the DOM or not
   * @private
   */
  private addedToDOM:boolean = false;
  
  /**
   * Indicates if the modal has been destroyed or not
   * @private
   */
  private destroyed:boolean = false;
  
  
  /**
   * The modal constructor
   * @param settings
   */
  public constructor (settings:ModalSettings) {
    this.settings = {...Modal.defaultSettings, ...settings};
    this.modalEl = new ModalBuilder(settings).build();
  }
  
  
  // noinspection JSMethodCanBeStatic
  /**
   * Add classes to an element if possible
   *
   * @param el
   * @param classes
   * @private
   */
  private addClasses (el:HTMLElement, classes:string[]):void {
    if (isClassListEmpty(classes))
      return
    
    el.classList.add( ...classes );
  }
  
  
  // noinspection JSMethodCanBeStatic
  /**
   * Remove classes from an element if it is possible
   *
   * @param el
   * @param classes
   * @private
   */
  private removeClasses (el:HTMLElement, classes:string[]):void {
    if (isClassListEmpty(classes))
      return
    
    el.classList.remove( ...classes );
  }
  
  
  /**
   * Show the modal to the user
   */
  public show ():void {
    if (this.destroyed)
      return;
    
    if (!this.addedToDOM) {
      document.body.appendChild(this.modalEl!);
      this.addedToDOM = true;
    } else {
      this.removeClasses(this.modalEl!, Modal.stateClasses.hidden);
      this.addClasses(this.modalEl!, Modal.stateClasses.visible);
    }
  }
  
  
  /**
   * Hide the modal to the user. You can still show it by calling show method.
   * If you want to remove completely the Modal code from the DOM, simply use
   * `Modal.destroy()`
   *
   * @see Modal.destroy()
   */
  public dismiss ():void {
    if (this.destroyed)
      return;
    
    this.removeClasses(this.modalEl!, Modal.stateClasses.visible);
    this.addClasses(this.modalEl!, Modal.stateClasses.hidden);
  }
  
  
  /**
   * Remove the modal from the DOM. After a modal has been destroyed,
   * you can not show it again by calling show. If you want to do this,
   * prefer using `Modal.dismiss()`
   *
   * @see Modal.dismiss()
   */
  public destroy ():void {
    if (this.destroyed)
      return;
    
    this.modalEl!.remove();
    delete this.modalEl;
    this.destroyed = true;
  }
}