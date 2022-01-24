# Modal Kit

Modal kit is a lightweight modal library that helps you create highly customizable modals using pure JavaScript.



- [Installation](#installation)
- [Roadmap](#roadmap)
- [Documentation](#documentation)
  - [Create a modal](#create-modal)
  - [Close a modal](#close-modal)
  - [Destroy a modal](#destroy-modal)
  - [Overlay](#overlay)
  - [Change modal classes](#change-modal-classes)
  - [Change modal default classes](#change-modal-default-classes)
  - [Events](#events)
  - [Set modal content](#set-modal-content)
  - [Access modal HTML elements](#access-modal-html-elements)
- [License](#license)



<a name="installation"></a>

## Installation

You can install modal-kit using npm

```shell
npm i -s @arthur.eudeline/modal-kit
```



Then you can include as a module :

```js
import ModalKit from "@arthur.eudeline/modal-kit";

const modal = new window.modalKit.modal({
  body: "My awesome <b>modal body</b>"
});

modal.show();
```



Or directly in your HTML with a script tag

```html
<html>
  <head> ... </head>
  <body>
    ...
    
    <script type="text/javascript" src="__PATH__/@arthur.eudeline/modal-kit/dist/index.min.js"></script>
    <script type="text/javascript">
      const modal = new window.modalKit.modal({
			  body: "My awesome <b>modal body</b>"
			});

			modal.show();
    </script>
  </body>
</html>
```





<a name="roadmap"></a>

## Roadmap

- [x] JavaScript creation base
- [ ] Alternative Modal templates on the `window.modalKit` object
- [ ] Include as Typescript files
- [ ] Base SCSS themes
- [ ] Default classes (not only states)



<a name="documentation"></a>

## Documentation



<a name="create-modal"></a>

### Create a modal

You must always start by creating a new `Modal` through `window.modalKit.modal` constructor and provide an objects that contains the settings of your modal. The only mandatory property here is `body` which will define your modal main content.

Once you did this, your modal is already pre-built and ready to be added to the DOM the first time you'll call `show()` method. After that, your modal will simply toggle CSS classes to hide it or show it back. 

```js
// Instanciate the modal
const modal = new window.modalKit.modal({
	body: "My awesome <b>modal body</b>"
});

// Add it to the DOM and show it to the user
modal.show();
```





<a name="close-modal"></a>

### Close a modal

The `dismiss()` method will hide your modal and let you show it back by calling again the `show()` method.

```js
// Hide the modal
modal.dismiss();

// Show it back
modal.show();
```





<a name="destroy-modal"></a>

### Destroy a modal

If you are sure to not show back your modal, you can destroy it in order to remove it from the DOM and from memory.

```js
// Destroy the modal, can't show it back
modal.destroy();

// Will produce an error
modal.show();
```





<a name="overlay"></a>

### Overlay

By default, modal will include overlay and users will be able to dismiss your modal by clicking on it. You can either remove it or make it non-dismissible :

```js
// Modal with a dismissible overlay
const modalWithDismissibleOverlay = new window.modalKit.modal({
  body: "My body",
  overlay: true,
  
  // or
  overlay: {
    dismissible: true
  },
  
  // or just don't specify it, it is the default behavior after all
});

// Modal without a dismissible overlay
const modalWithNonDismissibleOverlay = new window.modalKit.modal({
  body: "My body",
  overlay: {
    dismissible: false,
  },
});

// Modal without overlay
const modalWithoutOverlay = new window.modalKit.modal({
  body: "My body",
  overlay: false
});
```





<a name="change-modal-classes"></a>

### Change modal classes

You can add custom classes to each modal element by providing a `ModalClasses` object :

```js
const modal = new window.modalKit.modal({
  body: "My modal body",
  classes: {
    container: ['custom-class'],
		overlay: ['custom-class'],
		modal: ['custom-class'],
		title: ['custom-class'],
		body: ['custom-class'],
		actions: ['custom-class'],
		dismissBtn: {
			container: ['custom-class'],
			btn: ['custom-class'],
		},
    
    // Classes applied to the container element according to the modal variations
		variations: {
			dismissible: ['custom-class'],
		},
  },
});
```





<a name="change-modal-default-classes"></a>

### Change modal default classes

You can change the default CSS modal classes applied by default :

```js
// Will use default classes
const defaultModal = new window.modalKit.modal({ body: "My Default modal" });

window.modalKit.defaults.setStateClasses({
  hidden: [ 'my-custom-hidden-class' ],
  visible: [ 'my-custom-visible-class' ],
});

// Will use new classes set in the defaults
const customizedModal = new window.modalKit.modal({ body: "My Customized modal" });
```





<a name="events"></a>

### Modal events

You can react to some modal events just as you will do with regular HTML Elements :

| Event name          | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `modal-initialized` | Called after that the modal is first shown on the first call of `show()` method. |
| `modal-shown`       | Called each time the `show()` method is called               |
| `modal-dismissed`   | Triggered when modal is dismissed                            |
| `modal-destroyed`   | Triggered before modal is destroyed                          |

Just use `addEventListener()` method on your modal :

```js
modal.addEventListener('modal-shown', (event) => {
  console.log('My modal has been shown');
  console.log(event.modal);
});
```

All events added through `addEventListener()` are passive by default to increase performance. You can specify your own event settings by your own just as you would do on a regular HTML Element :

```js
modal.addEventListener('modal-shown', (event) => {
  console.log('My modal has been shown');
  console.log(event.modal);
}, { passive: false} );
```





<a name="set-modal-content"></a>

### Set modal content

You can set the content of 3 different parts in your modal. Each field either accept a `string` (with HTML or not), `HTMLElement`, or a callback `(modal:Modal) => string | HTMLElement` :

```js 
// Using simple strings
const modalSimpleString = new window.modalKit.modal({
  title: "My title",
  body: "My body",
  actions: [
    "Action 1",
    "Action 2"
  ],
});


// Using HTML strings
const modalHTMLStrings = new window.modalKit.modal({
  title: "<h2>My modal title</h2>",
  body: "<p>My modal body</p>",
  actions: [
    "<button>Action 1</button>",
    "<button>Action 2</button>",
  ]
});


// Using HTML Elements
const myEl = document.createElement('div');
myEl.innerHTML = "My content";

const modalHTMLElements = new window.modalKit.modal({
  body: myEl,
});


// Using Elements callbacks
const modalElementsCallbacks = new window.modalKit.modal({
  body: "My body",
  actions : [
    // Creates a button that closes the modal
    (modal) => {
      const btnEl = document.createElement('button');
      btnEl.innerHTML = "Close";
      btnEl.onclick = modal.dismiss;
      
      return btnEl;
    },
  ]
});


// Using String callbacks
const modalElementsCallbacks = new window.modalKit.modal({
  body: (modal) => "<p>My body</p>",
});
```



<a name="access-modal-html-elements"></a>

#### Acess Modal Elements

You can easily access modal HTML Elements by calling `getElements()` methods which will return a `ModalElements` object.

```js
const modal = new window.modalKit.modal({
  body: "My body",
});

// Manipulate the modla body
modal.getElements().body.innerHTML = "Changing the modal body content";
```

Here is what `ModalElements` looks like :

```typescript
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
```





<a name="license"></a>

## License

MIT License

Copyright (c) 2022 Arthur Eudeline

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
