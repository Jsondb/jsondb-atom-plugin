'use babel';

export default class JsondbAtomPluginView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('jsondb-atom-plugin');

    // Create Title element
    this.titleElement = document.createElement('div');
    this.titleElement.textContent = 'Editing Line No: - -';
    this.titleElement.classList.add('jsondb-atom-plugin-title');
    this.element.appendChild(this.titleElement);

    //Create editor getElement
    this.editorElement = document.createElement('atom-text-editor');
    this.editorElement.classList.add('jsondb-atom-plugin-editor');
    this.element.appendChild(this.editorElement);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getTitleElement() {
    return this.titleElement;
  }

  getEditorElement() {
    return this.editorElement;
  }
}
