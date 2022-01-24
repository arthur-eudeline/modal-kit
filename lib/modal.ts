import {ModalElements, ModalEvents, ModalSettings, ModalStateClasses} from "../types";
import {ModalBuilder} from "./modal-builder";
import {isClassListEmpty} from "./utils";
import {ModalEvent} from "./modal-event";
import cloneDeep from "lodash.clonedeep";
import {uid} from 'uid';


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
   * The HTML ID of the modal
   * @private
   */
  private id:string;
  
  private elements:ModalElements;
  
  /**
   * The modal constructor
   * @param settings
   */
  public constructor (settings:ModalSettings) {
    this.settings = {...Modal.defaultSettings, ...settings};
    
    if (this.settings.id === undefined)
      this.settings.id = uid(4);
    
    this.id = this.settings.id;
    
    this.elements = new ModalBuilder(this).build();
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
  public show = ():void => {
    if (this.destroyed)
      return;
    
    if (!this.addedToDOM) {
      document.body.appendChild(this.elements.root!);
      this.addedToDOM = true;
      this.elements.root!.dispatchEvent( new ModalEvent('modal-initialized', this) );
    }
    
    this.removeClasses(this.elements.root!, Modal.stateClasses.hidden);
    this.addClasses(this.elements.root!, Modal.stateClasses.visible);
    
    const event = new ModalEvent('modal-shown', this);
    this.elements.root!.dispatchEvent(event);
  };
  
  /**
   * Hide the modal to the user. You can still show it by calling show method.
   * If you want to remove completely the Modal code from the DOM, simply use
   * `Modal.destroy()`
   *
   * @see Modal.destroy()
   */
  public dismiss = ():void => {
    if (this.destroyed)
      return;
    
    this.removeClasses(this.elements.root!, Modal.stateClasses.visible);
    this.addClasses(this.elements.root!, Modal.stateClasses.hidden);
    
    const event = new ModalEvent( 'modal-dismissed', this);
    this.elements.root!.dispatchEvent(event);
  };
  
  
  /**
   * Remove the modal from the DOM. After a modal has been destroyed,
   * you can not show it again by calling show. If you want to do this,
   * prefer using `Modal.dismiss()`
   *
   * @see Modal.dismiss()
   */
  public destroy = ():void => {
    if (this.destroyed)
      return;
    
    const event = new ModalEvent('modal-destroyed', this);
    this.elements.root!.dispatchEvent(event);
    
    this.elements.root!.remove();
    // @ts-ignore
    delete this.elements;
    this.destroyed = true;
  };
  
  
  /**
   * Gets the modal settings
   */
  public getSettings = ():ModalSettings => cloneDeep<ModalSettings>(this.settings);
  
  
  /**
   * Adds a listener to the modal event
   *
   * @param type
   * @param callback
   * @param passive
   */
  public addEventListener = ( type: ModalEvents | string, callback:(event:Event) => void, passive:boolean = true ):void => {
    this.elements.root?.addEventListener(type, callback, {passive});
  };
  
  
  /**
   * Gets the modal HTML Elements
   */
  public getElements() : ModalElements{
    return this.elements;
  }
}