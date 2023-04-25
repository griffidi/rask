import { redispatchEvent } from '@material/web/controller/events.js';
import { FormController, getFormValue } from '@material/web/controller/form-controller.js';
import { stringConverter } from '@material/web/controller/string-converter.js';
import { type ARIAAutoComplete, type ARIAExpanded, type ARIARole } from '@material/web/types/aria.js';
import { LitElement, html, nothing, type PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { styleMap } from 'lit/directives/style-map.js';
import { type StaticValue } from 'lit/static-html.js';
import css from './text-field.css' assert { type: 'css' };

/**
 * Input types that are compatible with the text field.
 */
export type TextFieldType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

/**
 * Input types that are not fully supported for the text field.
 */
export type UnsupportedTextFieldType = 'color' | 'date' | 'datetime-local' | 'file' | 'month' | 'time' | 'week';

/**
 * Input types that are incompatible with the text field.
 */
export type InvalidTextFieldType = 'button' | 'checkbox' | 'hidden' | 'image' | 'radio' | 'range' | 'reset' | 'submit';

/**
 * A text field component.
 */
export abstract class TextField extends LitElement {
  static override styles = css;

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property() errorText = '';
  @property() label?: string;
  @property({ type: Boolean, reflect: true }) required = false;
  @property() value = '';
  @property() defaultValue = '';
  @property() textDirection = '';
  @property() override ariaAutoComplete: ARIAAutoComplete | null = null;
  @property() ariaControls: string | null = null;
  @property() ariaActiveDescendant: string | null = null;
  @property() override ariaExpanded: ARIAExpanded | null = null;
  @property() override ariaLabel!: string;
  @property() typeRole: ARIARole | null = null;
  @property({ reflect: true, converter: stringConverter }) name = '';
  @property() max = '';
  @property({ type: Number }) maxLength = -1;
  @property() min = '';
  @property({ type: Number }) minLength = -1;
  @property() pattern = '';
  @property({ reflect: true, converter: stringConverter }) placeholder = '';

  // FormElement
  get form() {
    return this.closest('form');
  }

  [getFormValue]() {
    return this.value;
  }

  /**
   * Indicates whether or not a user should be able to edit the text field's
   * value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
   */
  @property({ type: Boolean, reflect: true }) readOnly = false;

  /**
   * Gets or sets the direction in which selection occurred.
   */
  get selectionDirection() {
    return this.#getInput().selectionDirection;
  }
  set selectionDirection(value: 'backward' | 'forward' | 'none' | null) {
    this.#getInput().selectionDirection = value;
  }

  /**
   * Gets or sets the end position or offset of a text selection.
   */
  get selectionEnd() {
    return this.#getInput().selectionEnd;
  }
  set selectionEnd(value: number | null) {
    this.#getInput().selectionEnd = value;
  }

  /**
   * Gets or sets the starting position or offset of a text selection.
   */
  get selectionStart() {
    return this.#getInput().selectionStart;
  }
  set selectionStart(value: number | null) {
    this.#getInput().selectionStart = value;
  }

  /**
   * Returns or sets the element's step attribute, which works with min and max
   * to limit the increments at which a numeric or date-time value can be set.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
   */
  @property() step = '';
  @property({ reflect: true }) type: TextFieldType | UnsupportedTextFieldType = 'text';

  /**
   * Returns the native validation error message that would be displayed upon
   * calling `reportValidity()`.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
   */
  get validationMessage() {
    return this.#getInput().validationMessage;
  }

  /**
   * Returns a ValidityState object that represents the validity states of the
   * text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
   */
  get validity() {
    return this.#getInput().validity;
  }

  /**
   * The text field's value as a number.
   */
  get valueAsNumber() {
    return this.#getInput().valueAsNumber;
  }
  set valueAsNumber(value: number) {
    this.#getInput().valueAsNumber = value;
    this.value = this.#getInput().value;
  }

  /**
   * The text field's value as a Date.
   */
  get valueAsDate() {
    return this.#getInput().valueAsDate;
  }
  set valueAsDate(value: Date | null) {
    this.#getInput().valueAsDate = value;
    this.value = this.#getInput().value;
  }

  /**
   * Returns whether an element will successfully validate based on forms
   * validation rules and constraints.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/willValidate
   */
  get willValidate() {
    return this.#getInput().willValidate;
  }

  protected abstract readonly fieldTag: StaticValue;

  /**
   * Returns true when the text field has been interacted with. Native
   * validation errors only display in response to user interactions.
   */
  @state() private dirty = false;
  // @ts-ignore
  @state() private focused = false;
  /**
   * When set to true, the error text's `role="alert"` will be removed, then
   * re-added after an animation frame. This will re-announce an error message
   * to screen readers.
   */
  @state() private refreshErrorAlert = false;
  /**
   * Returns true when the text field's `value` property has been changed from
   * it's initial value.
   *
   * Setting `value` should always overwrite `defaultValue`, even when `value`
   * is an empty string. This flag ensures that behavior.
   */
  @state() private valueHasChanged = false;
  /**
   * Whether or not to ignore the next `value` change when computing
   * `valueHasChanged`.
   */
  private ignoreNextValueChange = false;
  /**
   * Whether or not a native error has been reported via `reportValidity()`.
   */
  @state() private nativeError = false;
  /**
   * The validation message displayed from a native error via
   * `reportValidity()`.
   */
  @state() private nativeErrorText = '';

  get #hasError() {
    return this.error || this.nativeError;
  }

  @query('input') private readonly input?: HTMLInputElement | null;

  constructor() {
    super();
    this.addController(new FormController(this));
    this.addEventListener('click', this.focus);
    this.addEventListener('focusin', this.#handleFocusin);
    this.addEventListener('focusout', this.#handleFocusout);
  }

  /**
   * Checks the text field's native validation and returns whether or not the
   * element is valid.
   *
   * If invalid, this method will dispatch the `invalid` event.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
   *
   * @return true if the text field is valid, or false if not.
   */
  checkValidity() {
    const { valid } = this.#checkValidityAndDispatch();
    return valid;
  }

  /**
   * Focuses the text field's input text.
   */
  override focus() {
    if (this.disabled || this.matches(':focus-within')) {
      // Don't shift focus from an element within the text field, like an icon
      // button, to the input when focus is requested.
      return;
    }

    this.#getInput().focus();
  }

  /**
   * Checks the text field's native validation and returns whether or not the
   * element is valid.
   *
   * If invalid, this method will dispatch the `invalid` event.
   *
   * This method will display or clear an error text message equal to the text
   * field's `validationMessage`, unless the invalid event is canceled.
   *
   * Use `setCustomValidity()` to customize the `validationMessage`.
   *
   * This method can also be used to re-announce error messages to screen
   * readers.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity
   *
   * @return true if the text field is valid, or false if not.
   */
  reportValidity() {
    const { valid, canceled } = this.#checkValidityAndDispatch();
    if (!canceled) {
      const prevMessage = this.#getErrorText();
      this.nativeError = !valid;
      this.nativeErrorText = this.validationMessage;

      const needsRefresh = this.#shouldErrorAnnounce() && prevMessage === this.#getErrorText();
      if (needsRefresh) {
        this.refreshErrorAlert = true;
      }
    }

    return valid;
  }

  /**
   * Selects all the text in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
   */
  select() {
    this.#getInput().select();
  }

  /**
   * Sets the text field's native validation error message. This is used to
   * customize `validationMessage`.
   *
   * When the error is not an empty string, the text field is considered invalid
   * and `validity.customError` will be true.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
   *
   * @param error The error message to display.
   */
  setCustomValidity(error: string) {
    this.#getInput().setCustomValidity(error);
  }

  /**
   * Replaces a range of text with a new string.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setRangeText
   */
  setRangeText(replacement: string): void;
  setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
  setRangeText(...args: unknown[]) {
    // Calling setRangeText with 1 vs 3-4 arguments has different behavior.
    // Use spread syntax and type casting to ensure correct usage.
    this.#getInput().setRangeText(...(args as Parameters<HTMLInputElement['setRangeText']>));
    this.value = this.#getInput().value;
  }

  /**
   * Sets the start and end positions of a selection in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
   *
   * @param start The offset into the text field for the start of the selection.
   * @param end The offset into the text field for the end of the selection.
   * @param direction The direction in which the selection is performed.
   */
  setSelectionRange(start: number | null, end: number | null, direction?: 'backward' | 'forward' | 'none') {
    this.#getInput().setSelectionRange(start, end, direction);
  }

  /**
   * Decrements the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
   *
   * @param stepDecrement The number of steps to decrement, defaults to 1.
   */
  stepDown(stepDecrement?: number) {
    const input = this.#getInput();
    input.stepDown(stepDecrement);
    this.value = input.value;
  }

  /**
   * Increments the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
   *
   * @param stepIncrement The number of steps to increment, defaults to 1.
   */
  stepUp(stepIncrement?: number) {
    const input = this.#getInput();
    input.stepUp(stepIncrement);
    this.value = input.value;
  }

  /**
   * Reset the text field to its default value.
   */
  reset() {
    this.dirty = false;
    this.valueHasChanged = false;
    this.ignoreNextValueChange = true;
    this.value = this.defaultValue;
    this.nativeError = false;
    this.nativeErrorText = '';
  }

  protected override update(changedProperties: PropertyValues) {
    // Consider a value change anything that is not the initial empty string
    // value.
    const valueHasChanged = changedProperties.has('value') && changedProperties.get('value') !== undefined;
    if (valueHasChanged && !this.ignoreNextValueChange) {
      this.valueHasChanged = true;
    }

    if (this.ignoreNextValueChange) {
      this.ignoreNextValueChange = false;
    }

    super.update(changedProperties);
  }

  protected override updated() {
    // Keep changedProperties arg so that subclasses may call it

    // If a property such as `type` changes and causes the internal <input>
    // value to change without dispatching an event, re-sync it.
    const value = this.#getInput().value;
    if (this.value !== value) {
      // Don't consider these updates (such as setting `defaultValue`) as
      // the developer directly changing the `value`.
      this.ignoreNextValueChange = true;
      // Note this is typically inefficient in updated() since it schedules
      // another update. However, it is needed for the <input> to fully render
      // before checking its value.
      this.value = value;
    }

    if (this.refreshErrorAlert) {
      // The past render cycle removed the role="alert" from the error message.
      // Re-add it after an animation frame to re-announce the error.
      requestAnimationFrame(() => {
        this.refreshErrorAlert = false;
      });
    }
  }

  override render() {
    const classes = {
      disabled: this.disabled,
      error: !this.disabled && this.#hasError,
      populated: !!this.#getInputValue(),
      required: this.required,
    };

    return html`
      <div class="text-field ${classMap(classes)}">
        ${this.#renderInput()}
        <label>${this.label}</label>
      </div>
    `;
  }

  #renderInput() {
    const style = { direction: this.textDirection };

    // TODO(b/243805848): remove `as unknown as number` once lit analyzer is
    // fixed
    return html`
      <input
        style=${styleMap(style)}
        aria-activedescendant=${this.ariaActiveDescendant || nothing}
        aria-autocomplete=${this.ariaAutoComplete || nothing}
        aria-controls=${this.ariaControls || nothing}
        aria-expanded=${this.ariaExpanded || nothing}
        aria-invalid=${this.#hasError}
        aria-label=${this.ariaLabel || this.label || nothing}
        ?disabled=${this.disabled}
        max=${(this.max || nothing) as unknown as number}
        maxlength=${this.maxLength > -1 ? this.maxLength : nothing}
        min=${(this.min || nothing) as unknown as number}
        minlength=${this.minLength > -1 ? this.minLength : nothing}
        pattern=${this.pattern || nothing}
        role=${this.typeRole || nothing}
        ?readonly=${this.readOnly}
        ?required=${this.required}
        step=${(this.step || nothing) as unknown as number}
        type=${this.type}
        .value=${live(this.#getInputValue())}
        @change=${this.#redispatchEvent}
        @input=${this.#handleInput}
        @select=${this.#redispatchEvent} />
    `;
  }

  #getInputValue() {
    const alwaysShowValue = this.dirty || this.valueHasChanged;
    if (alwaysShowValue) {
      return this.value;
    }

    return this.defaultValue || this.value;
  }

  #getErrorText() {
    return this.error ? this.errorText : this.nativeErrorText;
  }

  #shouldErrorAnnounce() {
    // Announce if there is an error and error text visible.
    // If refreshErrorAlert is true, do not announce. This will remove the
    // role="alert" attribute. Another render cycle will happen after an
    // animation frame to re-add the role.
    return this.#hasError && !!this.#getErrorText() && !this.refreshErrorAlert;
  }

  #handleFocusin() {
    this.focused = true;
  }

  #handleFocusout() {
    if (this.matches(':focus-within')) {
      // Changing focus to another child within the text field, like a button
      return;
    }

    this.focused = false;
  }

  #handleInput(event: InputEvent) {
    this.dirty = true;
    this.value = (event.target as HTMLInputElement).value;
    this.#redispatchEvent(event);
  }

  #redispatchEvent(event: Event) {
    redispatchEvent(this, event);
  }

  #getInput() {
    if (!this.input) {
      // If the input is not yet defined, synchronously render.
      // e.g.
      // const textField = document.createElement('md-outlined-text-field');
      // document.body.appendChild(textField);
      // textField.focus(); // synchronously render
      this.connectedCallback();
      this.scheduleUpdate();
    }

    if (this.isUpdatePending) {
      // If there are pending updates, synchronously perform them. This ensures
      // that constraint validation properties (like `required`) are synced
      // before interacting with input APIs that depend on them.
      this.scheduleUpdate();
    }

    return this.input!;
  }

  #checkValidityAndDispatch() {
    const valid = this.#getInput().checkValidity();
    let canceled = false;
    if (!valid) {
      canceled = !this.dispatchEvent(new Event('invalid', { cancelable: true }));
    }

    return { valid, canceled };
  }
}
