import ModalKit from "../lib";
import {Modal} from "../lib/modal";
import SpyInstance = jest.SpyInstance;

describe('Tests default settings', () => {
  const modal = new ModalKit.modal({
    body: 'My modal body'
  });
  
  modal.show();
  const modalEl = document.querySelector('[data-modal-root]') as HTMLDivElement;
  
  it('Should exist', () => {
    expect(modalEl).toBeInstanceOf(Element);
  });
  
  it('Should have default ID', () => {
    expect(modalEl.id).not.toEqual(undefined);
    expect(modalEl.id).toHaveLength(4);
  });
  
  it('Should have an overlay', () => {
    const overlayEl = modalEl.querySelector('.modal-overlay');
    expect(overlayEl).not.toBeNull();
  });
  
  it('Should be dismissible by default', () => {
    expect(modalEl.classList).toContain('modal-dismissible');
    expect(modalEl.querySelector('.modal-dismiss-btn')).not.toBeNull();
  });
  
  it('Should not have title nor actions', () => {
    expect(modalEl.querySelector('.modal-title')).toBeNull();
    expect(modalEl.querySelector('.modal-actions')).toBeNull();
  });
  
  it('Should have a body', () => {
    const bodyEl = modalEl.querySelector('.modal-body')!;
    expect(bodyEl).not.toBeNull();
    expect(bodyEl.textContent).toEqual('My modal body');
  })
});

describe('Tests modal elements', () => {
  
  it('Should accept simple string', () => {
    const modal = new ModalKit.modal({
      title: 'title as single string',
      body: 'body as single string',
      actions: [
        'action 1 as single string',
        'action 2 as single string',
      ]
    });
    
    modal.show();
    
    // Title
    const titleEl = modal.getElement()!.querySelector('.modal-title') as HTMLElement;
    expect(titleEl).not.toBeNull();
    expect(titleEl.innerHTML).toEqual('<div>title as single string</div>');
    
    // Body
    const bodyEl = modal.getElement()!.querySelector('.modal-body') as HTMLElement;
    expect(bodyEl).not.toBeNull();
    expect(bodyEl.innerHTML).toEqual('<div>body as single string</div>');
    
    // Actions
    const actionsEl = modal.getElement()!.querySelector('.modal-actions') as HTMLElement;
    expect(actionsEl).not.toBeNull();
    expect(actionsEl.children.length).toEqual(2);
    expect(actionsEl.children[0].innerHTML).toEqual('action 1 as single string');
    expect(actionsEl.children[1].innerHTML).toEqual('action 2 as single string');
  });
  
  it('Should accept HTML Elements', () => {
    const title = document.createElement('h1');
    title.innerHTML = 'title as element';
    
    const body = document.createElement('div');
    body.classList.add('class-1', 'class-2');
    body.innerHTML = 'body as element';
    
    const action1 = document.createElement('button');
    action1.classList.add('action-1');
    action1.innerHTML = 'action 1 as element';
    const fn = jest.fn();
    action1.onclick = fn;
    
    const action2 = document.createElement('button');
    action2.classList.add('action-2');
    action2.innerHTML = 'action 2 as element'
    
    const modal = new ModalKit.modal({
      title,
      body,
      actions: [
        action1,
        action2,
      ]
    });
    
    modal.show();
    
    // Title
    const titleEl = modal.getElement()!.querySelector('.modal-title') as HTMLElement;
    expect(titleEl).not.toBeNull();
    expect(titleEl.innerHTML).toEqual('<h1>title as element</h1>');
    
    // Body
    const bodyEl = modal.getElement()!.querySelector('.modal-body') as HTMLElement;
    expect(bodyEl).not.toBeNull();
    expect((bodyEl.firstChild as HTMLElement).classList).toContain('class-1');
    expect((bodyEl.firstChild as HTMLElement).classList).toContain('class-2');
    expect(bodyEl.innerHTML).toEqual('<div class="class-1 class-2">body as element</div>');
    
    // Actions
    const actionsEl = modal.getElement()!.querySelector('.modal-actions') as HTMLElement;
    expect(actionsEl).not.toBeNull();
    expect(actionsEl.children.length).toEqual(2);
    expect(actionsEl.children[0].outerHTML).toEqual('<button class="action-1">action 1 as element</button>');
    expect(actionsEl.children[1].outerHTML).toEqual('<button class="action-2">action 2 as element</button>');
    
    // Test actions click listener
    expect(fn).toHaveBeenCalledTimes(0);
    (actionsEl.children[0] as HTMLElement).click();
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  it('Should accept HTML Strings', () => {
    const modal = new ModalKit.modal({
      title: '<h1>title as html string</h1>',
      body: '<div class="class-1 class-2">body as html string</div>',
      actions: [
        '<button class="action-1">action 1 as html string</button>',
        '<button class="action-2">action 2 as html string</button>',
      ]
    });
  
    modal.show();
  
    // Title
    const titleEl = modal.getElement()!.querySelector('.modal-title') as HTMLElement;
    expect(titleEl).not.toBeNull();
    expect(titleEl.innerHTML).toEqual('<h1>title as html string</h1>');
  
    // Body
    const bodyEl = modal.getElement()!.querySelector('.modal-body') as HTMLElement;
    expect(bodyEl).not.toBeNull();
    expect(bodyEl.innerHTML).toEqual('<div class="class-1 class-2">body as html string</div>');
    expect((bodyEl.firstChild as HTMLElement).classList).toContain('class-1');
    expect((bodyEl.firstChild as HTMLElement).classList).toContain('class-2');
  
    // Actions
    const actionsEl = modal.getElement()!.querySelector('.modal-actions') as HTMLElement;
    expect(actionsEl).not.toBeNull();
    expect(actionsEl.children.length).toEqual(2);
    expect(actionsEl.children[0].outerHTML).toEqual('<button class="action-1">action 1 as html string</button>');
    expect(actionsEl.children[1].outerHTML).toEqual('<button class="action-2">action 2 as html string</button>');
  });
  
  it('Should accept Element builders function', () => {
    let mock:SpyInstance;
    
    const modal = new ModalKit.modal({
      title: function (_) {
        const title = document.createElement('h1');
        title.innerHTML = 'built title';
        
        return title;
      },
      body: (_) => {
        const body = document.createElement('div');
        body.classList.add('class-1', 'class-2');
        body.innerHTML = 'built body';
        
        return body;
      },
      actions: [
        (modal) => {
          const action1 = document.createElement('button');
          action1.classList.add('action-1');
          action1.innerHTML = 'built action 1';
          
          mock = jest.spyOn<Modal, "dismiss">(modal, 'dismiss');
          action1.onclick = modal.dismiss;
          return action1;
        },
        (_) => {
          const action2 = document.createElement('button');
          action2.classList.add('action-2');
          action2.innerHTML = 'built action 2'
          return action2;
        },
      ]
    });
  
    modal.show();
  
    // Title
    const titleEl = modal.getElement()!.querySelector('.modal-title') as HTMLElement;
    expect(titleEl).not.toBeNull();
    expect(titleEl.innerHTML).toEqual('<h1>built title</h1>');
  
    // Body
    const bodyEl = modal.getElement()!.querySelector('.modal-body') as HTMLElement;
    expect(bodyEl).not.toBeNull();
    expect(bodyEl.innerHTML).toEqual('<div class="class-1 class-2">built body</div>');
    expect((bodyEl.firstChild as HTMLElement).classList).toContain('class-2');
    expect((bodyEl.firstChild as HTMLElement).classList).toContain('class-1');
  
    // Actions
    const actionsEl = modal.getElement()!.querySelector('.modal-actions') as HTMLElement;
    expect(actionsEl).not.toBeNull();
    expect(actionsEl.children.length).toEqual(2);
    expect(actionsEl.children[0].outerHTML).toEqual('<button class="action-1">built action 1</button>');
    expect(actionsEl.children[1].outerHTML).toEqual('<button class="action-2">built action 2</button>');
  
    // Test actions click listener
    expect(mock!).toHaveBeenCalledTimes(0);
    (actionsEl.children[0] as HTMLElement).click();
    expect(mock!).toHaveBeenCalledTimes(1);
    mock!.mockRestore();
  });
  
});

describe('Tests variations and settings', () => {
  
  // Dismissible
  it('Should be not dismissible', () => {
    const modal = new ModalKit.modal({
      dismissible: false,
      body: "Body"
    });
    
    modal.show();
    expect(modal.getElement()!.classList).not.toContain('modal-dismissible');
    expect(modal.getElement()!.querySelector('.modal-dismiss-btn')).toBeNull();
  });
  
  // Overlay
  describe('Overlay', () => {
    
    it('Should not include overlay', () => {
      const modal = new ModalKit.modal({
        overlay: false,
        body: '',
      });
      
      modal.show();
      
      expect(modal.getElement()!.querySelector('.modal-overlay')).toBeNull();
      expect(modal.getElement()!.children).toHaveLength(1);
    });
    
    it('Should include overlay when passing object', () => {
      const modal = new ModalKit.modal({
        overlay: { dismissible: true },
        body: '',
      });
  
      modal.show();
  
      expect(modal.getElement()!.querySelector('.modal-overlay')).not.toBeNull();
      expect(modal.getElement()!.children).toHaveLength(2);
    });
    
    describe('Dismissible', () => {
      function testDismissed(modal:Modal, shouldBeDismissed:boolean) {
        const mock = jest.spyOn(modal, 'dismiss');
        modal.show();
  
        const overlayEl = modal.getElement()!.querySelector('.modal-overlay') as HTMLElement;
        expect(overlayEl).not.toBeNull();
        expect(modal.getElement()!.children).toHaveLength(2);
  
        expect(mock).toHaveBeenCalledTimes(0);
        overlayEl.click();
        expect(mock).toHaveBeenCalledTimes(shouldBeDismissed ? 1 : 0);
      }
      
      it('Should be dismissible by default', () => {
        const modal = new ModalKit.modal({
          body: '',
        });
    
        testDismissed(modal, true);
      });
  
      it('Should be dismissible if set to true', () => {
        const modal = new ModalKit.modal({
          overlay: { dismissible: true },
          body: '',
        });
    
       testDismissed(modal, true);
      });
      
      it('Should not be dismissible if set to false', () => {
        const modal = new ModalKit.modal({
          overlay: { dismissible: false },
          body: '',
        });
  
        testDismissed(modal, false);
      });
    });
  });
  // /Overlay
  
  it('Should be able to set custom ID', () => {
    const modal = new ModalKit.modal({
      id: 'test-id',
      body: ''
    });
    
    modal.show();
    
    expect(modal.getElement()!.id).toEqual('test-id');
  });
  
  // Custom CSS classes
  describe('Custom CSS classes', () => {
    const modal = new ModalKit.modal({
      title: 'title',
      body: 'body',
      actions: [ 'action' ],
      classes: {
        container: ['test-container'],
        overlay: ['test-overlay'],
        modal: ['test-modal'],
        title: ['test-title'],
        body: ['test-body'],
        actions: ['test-actions'],
        dismissBtn: {
          container: ['test-dismiss-btn-container'],
          btn: ['test-dismiss-btn'],
        },
        variations: {
          dismissible: ['test-dismissible']
        }
      }
    });
    
    modal.show();
    console.log(modal.getElement()?.outerHTML);
    
    it('Should have custom container class', () => {
      expect(modal.getElement()!.classList).toContain("test-container");
    });
  
    it('Should have custom overlay class', () => {
      expect(modal.getElement()!.querySelector('.modal-overlay')!.classList).toContain("test-overlay");
    });
  
    it('Should have custom modal class', () => {
      expect(modal.getElement()!.querySelector('.modal')!.classList).toContain("test-modal");
    });
  
    it('Should have custom title class', () => {
      expect(modal.getElement()!.querySelector('.modal-title')!.classList).toContain("test-title");
    });
  
    it('Should have custom body class', () => {
      expect(modal.getElement()!.querySelector('.modal-body')!.classList).toContain("test-body");
    });
  
    it('Should have custom actions class', () => {
      expect(modal.getElement()!.querySelector('.modal-actions')!.classList).toContain("test-actions");
    });
  
    it('Should have custom dismiss btn class', () => {
      expect(modal.getElement()!.querySelector('.modal-dismiss-btn-container')!.classList).toContain("test-dismiss-btn-container");
      expect(modal.getElement()!.querySelector('.modal-dismiss-btn')!.classList).toContain("test-dismiss-btn");
    });
  
    it('Should have custom dismissible variations class', () => {
      expect(modal.getElement()!.classList).toContain("test-dismissible");
    });
    
  });
  // /Custom CSS Classes
});

describe('Tests events', () => {

  const modal = new ModalKit.modal({
    body: '',
  });
  
  it('Should trigger initialization event', () => {
    const cb = jest.fn();
    modal.addEventListener('modal-initialized', cb);
    
    modal.show();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('Should trigger shown event', () => {
    const cb = jest.fn();
    modal.addEventListener('modal-shown', cb);
    
    modal.show();
    expect(cb).toHaveBeenCalledTimes(1);
  });
  
  it('Should trigger dismissed event', () => {
    const cb = jest.fn();
    modal.addEventListener('modal-dismissed', cb);
  
    modal.show();
    expect(cb).toHaveBeenCalledTimes(0);
    
    modal.dismiss();
    expect(cb).toHaveBeenCalledTimes(1);
  });
  
  it('Should trigger dismissed event', () => {
    const cb = jest.fn();
    modal.addEventListener('modal-destroyed', cb);
    
    modal.show();
    expect(cb).toHaveBeenCalledTimes(0);
    
    modal.destroy();
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('Tests modal methods', () => {
  const modal = new ModalKit.modal({
    body: '',
  });

  describe('Show', () => {
    
    it('Should not be added in the DOM before first call', () => {
      // Resets the DOM
      document.querySelector('html')!.innerHTML = '';
      
      expect(document.querySelector('[data-modal-root]')).toBeNull();
      
      modal.show();
      
      expect(document.querySelector('[data-modal-root]')).not.toBeNull();
      expect(modal.getElement()!.classList).not.toContain('hidden');
    });
    
    it('Should be able to show again after a dismiss', () => {
      modal.show();
      modal.dismiss();
  
      expect(document.querySelector('[data-modal-root]')).not.toBeNull();
      expect(modal.getElement()!.classList).toContain('hidden');
      
      modal.show();
  
      expect(document.querySelector('[data-modal-root]')).not.toBeNull();
      expect(modal.getElement()!.classList).not.toContain('hidden');
    });
  });
  
  describe('Dismiss', () => {
    it('Should dismiss', () => {
      modal.show();
      
      expect(modal.getElement()!.classList).not.toContain('hidden');
      
      modal.dismiss();
      
      expect(modal.getElement()!.classList).toContain('hidden');
    });
    
    it('Should dismiss when click on overlay', () => {
      modal.show();
      
      expect(modal.getElement()!.classList).not.toContain('hidden');
      
      const overlayEl = modal.getElement()!.querySelector('.modal-overlay') as HTMLDivElement;
      overlayEl.click();
      
      expect(modal.getElement()!.classList).toContain('hidden');
    });
    
    it('Should dismiss when click on dismiss button', () => {
      modal.show();
    
      expect(modal.getElement()!.classList).not.toContain('hidden');
    
      const overlayEl = modal.getElement()!.querySelector('.modal-dismiss-btn') as HTMLDivElement;
      overlayEl.click();
    
      expect(modal.getElement()!.classList).toContain('hidden');
    });
  });
  
});

describe('Tests changing defaults', () => {
  const modal = new ModalKit.modal({
    body: '',
  });
  
  beforeAll(() => {
    ModalKit.defaults.setStateClasses({
      visible: ['visible-test'],
      hidden: ['hidden-test'],
    });
  });
  
  it('Should have changed visible default', () => {
    modal.show();
    expect(modal.getElement()!.classList).not.toContain('hidden-test');
    expect(modal.getElement()!.classList).toContain('visible-test');
  });
  
  it('Should have changed hidden default', () => {
    modal.dismiss();
    expect(modal.getElement()!.classList).toContain('hidden-test');
    expect(modal.getElement()!.classList).not.toContain('visible-test');
  });
});