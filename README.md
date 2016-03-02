## JsForm
An API to dynamically add forms to your website.

## Why?
Why not?

## API

### Start
 The JsForm constructor accepts an action and a method parameter. They are however optional.
```Javascript
var form = new JsForm('login.php', 'POST')
```

### Inputs
There are of course several types of input fields.
We'll start with ```text```. It accepts an object with all the different attributes you may want on the input field.
```Javascript
form.inputText({id: 'myTextField', class: 'inputClass', maxlength: 25, placeholder: 'First name', value: 'John'});
```
Feel free to chain several fields after each other.
```Javascript
form
  .inputText({id: 'myTextField1', class: 'inputClass', maxlength: 25, placeholder: 'First name', value: 'John'})
  .inputText({id: 'myTextField2', class: 'inputClass', maxlength: 25, placeholder: 'Last name', value: 'Doh'});
```
Oh, and you probably want a label with that input field. No problem.
```Javascript
form
  .label('First name')
  .inputText({id: 'myTextField1', class: 'inputClass', maxlength: 25, value: 'John'})
  .label('Last name')
  .inputText({id: 'myTextField2', class: 'inputClass', maxlength: 25, value: 'Doh'});
```
There is also number, password, email, phone and submit input fields. Like this:
```Javascript
form
  .inputText({id: 'myTextField', class: 'inputClass', maxlength: 25, value: 'John'})
  .inputNumber({id: 'myNumberField', class: 'inputClass', min: 0, max: 100})
  .inputPassword({id: 'myPasswordField', class: 'inputClass', placeholder: 'Password', value: 'hunter2'})
  .inputEmail({id: 'myEmailField', class: 'inputClass', value: 'john@doh.com'})
  .inputTel({id: 'myTelField', class: 'inputClass', placeholder: 'Phone number', disabled: 'disabled'})
  .inputSubmit({id: 'mySubmitButton', class: 'btn', value: 'Send'});
```
Don't feel like remembering long function names? Just use ```input()``` and specify a type as the first argument.
```Javascript
form
  .input('text', {id: 'myTextField1', class: 'inputClass', maxlength: 25, value: 'John'});
```

### Render
Wait, we've added a bunch of fields but nothing shows up on the screen. Well, we need to render it. The render function accepts two arguments. An ID of the element you want to attach your form to and optional classes you would like to add to your form tag. You can only call the render function once per chain. At the end.
```Javascript
form
  .render('theId', 'theClasses');
```

### Textarea
Textareas are not much different than input fields except, as you know, they accept rows and columns attributes.
```Javascript
form
  .textarea({id: 'myTextArea', class: 'textareaClass', rows: 5, cols: 100, placeholder: 'Write something here'})
  .render('theId', 'theClasses');
```

### Select
The select is slightly different. Since we want to add a bunch of options we need to populate the ```value``` attribute with an object.
```Javascript
form
  .select({id: 'mySelect', class: 'selectClass', value: {abc: 'abc', def: 'def', ghj: 'ghj'}})
  .render('theId', 'theClasses');
```

### Events
Do you want to attach some events to your fields and buttons? Lets do it. Since you may want to add several events, it's done in an array of objects. Each object contains the ```type``` and ```callback``` properties. Like this:
```Javascript
form
  .inputSubmit({id: 'mySubmitButton', class: 'btn', value: 'Send'},
    [{type: 'click', callback: function (e) {
      e.preventDefault();
      console.log('Button clicked');
    }}])
```
As you can see, ```callback``` is an anonymous function that gets attached to a click handler. But you can of course use any valid type you want. Keypress, mouseover, focus etcetera.

### No API?
Are you a no-frameworks kind of person? Well, here is how you do some of the above without this API.
```Javascript
var divToPutThisIn = document.getElementById('divId');

var form = document.createElement('form');

form.setAttribute('method', 'POST');
form.setAttribute('action', 'login.php');

var inputLabel = document.createElement('label');
inputLabel.innerHTML = 'First name';

var textInput = document.createElement('input');
textInput.setAttribute('type', 'text');
textInput.setAttribute('id', 'myInputId');
textInput.setAttribute('class', 'classOne classTwo classThree');
textInput.setAttribute('maxlength', 25);
textInput.setAttribute('placeholder', 'First name');
textInput.setAttribute('value', 'John');

textInput.addEventListener('mouseover', function (e) {
  console.log('The mouse pointer is above the text input field!');
});

form.appendChild(inputLabel);
form.appendChild(textInput);

divToPutThisIn.appendChild(form);
```

### More to come
Things to be added are, among others:
* Implement checkboxes
* Implement radiobuttons
* Implement ```<button>```
* Find out what attributes the different inputs have and add to the white list
* Add form attributes
* Research which is better, appendChild vs insertAdjacentHTML
* ~~Implement select~~
* ~~Implement textarea~~
* ~~Implement render function~~
* ~~Add possibility to add event to an element~~

### Want to help?
Feel free to help out if you like with:
* Gulp script to minify the source code and other fun stuff
* Refactor my ugly source code
* Add new features
* Turn it in to an NPM / Bower package?
* Bug fixing
* Typos